from fastapi import APIRouter, Depends, status
from sqlmodel.ext.asyncio.session import AsyncSession
from src.db.main import get_session
from src.jobs.service import JobService
from .schemas import CreateJobModel, JobModel, UpdateJobModel
from fastapi.exceptions import HTTPException
from src.auth.dependencies import AccessTokenBearer, RoleChecker

job_router = APIRouter()
job_service = JobService()
access_token_bearer = AccessTokenBearer()
role_checker = Depends(RoleChecker(['user', 'admin']))

@job_router.get('/', dependencies=[role_checker])
async def get_all_jobs(
    session: AsyncSession = Depends(get_session),
    token_details: dict = Depends(access_token_bearer)                       
):
    jobs = await job_service.get_all_jobs(session)
    return jobs if jobs is not None else {}

@job_router.get('/{job_uid}', dependencies=[role_checker])
async def get_job(
    job_uid: str, 
    session: AsyncSession = Depends(get_session),
    token_details: dict = Depends(access_token_bearer)
):
    job = await job_service.get_job(job_uid, session)
    if job: 
        return job
    else:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="Job searched for, not found.")

@job_router.post('/', status_code=status.HTTP_201_CREATED, response_model=JobModel, dependencies=[role_checker])
async def create_job(
    job_data: CreateJobModel,
    session: AsyncSession = Depends(get_session),
    token_details: dict = Depends(access_token_bearer)
):
    new_job = await job_service.create_job(job_data, session)
    return new_job

@job_router.patch('/{job_uid}', dependencies=[role_checker])
async def update_job(
    job_uid:str, 
    job_update_data: UpdateJobModel,
    session: AsyncSession = Depends(get_session),
    token_details: dict = Depends(access_token_bearer)
):
    updated_job = await job_service.update_job(job_uid, job_update_data, session)
    if updated_job:
        return updated_job
    else: 
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job to be updated not found.")

@job_router.delete('/{job_uid}', dependencies=[role_checker])
async def delete_job(
    job_uid: str,
    session: AsyncSession = Depends(get_session),
    token_details: dict = Depends(access_token_bearer)
):
    deleted_msg = await job_service.delete_job(job_uid, session)
    return deleted_msg