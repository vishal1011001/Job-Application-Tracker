from typing import Any, Callable
from fastapi.requests import Request
from fastapi.responses import JSONResponse
from fastapi import FastAPI, status


class JobTrackerException(Exception):
    """Base class for all exceptions"""
    pass

class JobNotFoundException(JobTrackerException):
    """Job not found in the Database."""
    pass

class UserNotFoundException(JobTrackerException):
    """User does not exist"""
    pass

class InvalidTokenException(JobTrackerException):
    """Token is invalid"""
    pass

class ExpiredTokenException(JobTrackerException):
    """Token is revoked"""
    pass

def create_exception_handler(status_code: int, initial_detail: Any) -> Callable([Request, Exception], JSONResponse):

    async def exception_handler(request: Request, exc: BooklyException):
        return JSONResponse(
            content=initial_detail,
            status_code=status_code
        )

    return exception_handler


def register_exception(app: FastAPI):
    @app.exception_handler(500)
    async def internal_server_error(request: Request, exc: Exception):
        return JSONResponse(
            content = {
                "message": "Something went wrong.",
                "error_code": "server_error"
            },
            status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        )
    
    app.add_exception_handler(
        JobNotFoundException,
        create_exception_handler(
            status_code=status.HTTP_404_NOT_FOUND,
            initial_detail={
                "message": "Provide a valid job uid",
                "resolution": "Try looking for some other job, or provide valid uid.",
                "error_code": "job_not_found"
            }
        )
    )
    
    app.add_exception_handler(
        UserNotFoundException,
        create_exception_handler(
            status_code=status.HTTP_404_NOT_FOUND,
            initial_detail={
                "message": "User not found",
                "resolution": "Enter valid credentials, or create a new user id",
                "error_code": "user_not_found"
            }
        )
    )
    
    
    app.add_exception_handler(
        InvalidTokenException,
        create_exception_handler(
            status_code=status.HTTP_403_FORBIDDEN,
            initial_detail={
                "message": "Invalid token",
                "resolution": "Get a token by singing in",
                "error_code": "invalid_token"
            }
        )
    )
    
    app.add_exception_handler(
        ExpiredTokenException,
        create_exception_handler(
            status_code=status.HTTP_403_FORBIDDEN,
            initial_detail={
                "message": "Token is expired or revoked",
                "resolution": "Get a new token using refresh token or signin again",
                "error_code": "invalid_token"
            }
        )
    )
    