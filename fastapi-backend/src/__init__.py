from fastapi import FastAPI
from contextlib import asynccontextmanager
from src.db.main import init_db

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

app.include_router(job_router, prefix=f"/api/{version}/jobs", tags=['jobs'])
