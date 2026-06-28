from fastapi import APIRouter, Depends, status
from sqlmodel.ext.asyncio.session import AsyncSession
from src.db.main import get_session
from src.jobs.service import JobService
from .schemas import CreateJobModel, JobModel, UpdateJobModel

job_router = APIRouter()
job_service = JobService()

@job_router.get('/')
async def get_all_jobs(session: AsyncSession = Depends(get_session)):
    jobs = await job_service.get_all_jobs(session)
    return jobs if jobs is not None else {}

@job_router.get('/{book_id}')
async def get_job(book_id: str, session: AsyncSession = Depends(get_session)):
    job = await job_service.get_job(book_id, session)
    return job if job is not None else None

@job_router.post('/', status_code=status.HTTP_201_CREATED, response_model=JobModel)
async def create_job(job_data: CreateJobModel, session: AsyncSession = Depends(get_session)):
    new_job = await job_service.create_job(job_data, session)
    return new_job

@job_router.patch('/{book_id}')
async def update_job(book_id:str, job_update_data: UpdateJobModel,session: AsyncSession = Depends(get_session)):
    updated_job = await job_service.update_job(book_id, job_update_data, session)
    return update_job if update_job is not None else None
