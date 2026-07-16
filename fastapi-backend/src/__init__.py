from fastapi import FastAPI, status
from fastapi.responses import JSONResponse
from fastapi.requests import Request
from contextlib import asynccontextmanager
from src.db.main import init_db
from src.jobs.routes import job_router
from src.auth.routes import auth_router
from .exceptions import register_exception

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

register_exception(app)


app.include_router(job_router, prefix=f"/api/{version}/jobs", tags=['jobs'])
app.include_router(auth_router, prefix=f"/api/{version}/users", tags=['users'])