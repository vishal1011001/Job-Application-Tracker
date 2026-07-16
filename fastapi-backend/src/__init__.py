from fastapi import FastAPI, status
from fastapi.responses import JSONResponse
from fastapi.requests import Request
from contextlib import asynccontextmanager
from src.db.main import init_db
from src.jobs.routes import job_router
from src.auth.routes import auth_router
from .exceptions import create_exception_handler, JobNotFoundException

@asynccontextmanager
async def life_span(app: FastAPI):
    print("Server has started...")
    await init_db()
    yield 
    print("Server has stopped.")

version = 'v2'

app = FastAPI(
    title='job_tracker',
    description='job application tracker application backend.',
    version=version,
    lifespan=life_span
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

@app.exception_handler(500)
async def internal_server_error(request: Request, exc: Exception):
    return JSONResponse(
        content = {
            "message": "Something went wrong.",
            "error_code": "server_error"
        },
        status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
    )

app.include_router(job_router, prefix=f"/api/{version}/jobs", tags=['jobs'])
app.include_router(auth_router, prefix=f"/api/{version}/users", tags=['users'])