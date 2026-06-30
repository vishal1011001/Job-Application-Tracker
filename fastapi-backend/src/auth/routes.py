from fastapi import APIRouter, status, Depends
from .schemas import UserCreateModel, UserResponseModel, UserCredentials
from src.db.main import get_session
from sqlmodel.ext.asyncio.session import AsyncSession
from .service import UserService
from fastapi.exceptions import HTTPException
from .utils import verify_password, create_access_token
from datetime import timedelta
from fastapi.responses import JSONResponse

auth_router = APIRouter()
user_service = UserService()

#IN DAYS
REFRESH_TOKEN_EXPIRY = 2

@auth_router.post('/signup')
async def signup(user_data: UserCreateModel, session: AsyncSession = Depends(get_session)):
    email = user_data.email
    user_exists = await user_service.user_exists(email, session)
    if user_exists:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="User with given email already exists.")
    else: 
        new_user = await user_service.create_user(user_data, session)
        return new_user
    

@auth_router.post('/signin')
async def signin(user_credentials: UserCredentials, session: AsyncSession = Depends(get_session)):
    email = user_credentials.email
    user_exists = await user_service.user_exists(email, session)
    
    if user_exists:
        user = await user_service.get_user_by_email(email, session)
        password_valid = verify_password(user_credentials.password, user.password_hash)
        if password_valid:
            access_token = create_access_token(
                user_data={
                    'email': user.email,
                    'uid': str(user.uid)
                }
            )
            
            refresh_token = create_access_token(
                user_data={
                    'email': user.email,
                    'uid': str(user.uid)
                },
                expiry=timedelta(days=REFRESH_TOKEN_EXPIRY),
                refresh=True
            )
            
            return JSONResponse(
                content={
                    'message': 'Login Success.',
                    'access_token': access_token,
                    'refresh_token': refresh_token,
                    'user': {
                        'email': user.email
                    }
                }
            )
    else:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, 
                            detail="Invalid email or password")
