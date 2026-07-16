from fastapi.security import HTTPBearer
from fastapi.security.http import HTTPAuthorizationCredentials
from fastapi import Request, status, Depends
from .utils import decode_token
from fastapi.exceptions import HTTPException
from src.db.redis import token_in_blocklist
from .service import UserService
from sqlmodel.ext.asyncio.session import AsyncSession
from src.db.main import get_session
from typing import List
from src.exceptions import InvalidTokenException, ExpiredTokenException

user_service = UserService()

class TokenBearer(HTTPBearer):
    def __init__(self, auto_error=True):
        super().__init__(auto_error=auto_error)
        
    async def __call__(self, request: Request) -> HTTPAuthorizationCredentials | None:
        creds = await super().__call__(request)
        
        token = creds.credentials
        token_data = decode_token(token)
    
        if not token_data:
            raise InvalidTokenException()
            
        if await token_in_blocklist(token_data['jti']):
            raise ExpiredTokenException()
        
        self.verify_token_data(token_data)
        
        return token_data
        
    def verify_token_data(self, token_data):
        raise NotImplementedError("Override this function in sub-classes.")
    
    
class AccessTokenBearer(TokenBearer):
    def verify_token_data(self, token_data: dict):
        if token_data and token_data['refresh']:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail={
                    'message': 'Provide an access token.'
                }
            )


class RefreshTokenBearer(TokenBearer):
    def verify_token_data(self, token_data: dict):
        if token_data and not token_data['refresh']:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail={
                    'message': 'Provide a refresh token.'
                }
            )
            
async def get_current_user(
    token_details: dict = Depends(AccessTokenBearer()), 
    session: AsyncSession = Depends(get_session)
):  
    email = token_details.get('user')['email']
    user = await user_service.get_user_by_email(email, session)
    return user

class RoleChecker:
    def __init__(self, allowed_roles: List[str]):
        self.allowed_roles = allowed_roles
        
    def __call__(self, current_user: dict = Depends(get_current_user)):
        if current_user.role in self.allowed_roles:
            return True
        
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                            detail="You are not allowed to access this endpoint")
        
        