from fastapi import APIRouter, Depends, status
from sqlmodel.ext.asyncio.session import AsyncSession
from src.db.main import get_session
from src.jobs.service import JobService

job_router = APIRouter()
job_service = JobService()

@job_router.get('/')
async def get_all_jobs(session: AsyncSession = Depends(get_session)):
    jobs = await job_service.get_all_jobs(session)
    return jobs if jobs is not None else {}
