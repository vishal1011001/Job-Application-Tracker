from fastapi import APIRouter, Depends, status
from sqlmodel.ext.asyncio.session import AsyncSession
from src.db.main import get_session
from src.jobs.service import JobService
from .schemas import CreateJobModel, JobModel, UpdateJobModel
from fastapi.exceptions import HTTPException
from src.auth.dependencies import AccessTokenBearer, RoleChecker
from src.exceptions import JobNotFoundException

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

@job_router.get('/user', dependencies=[role_checker])
async def get_jobs_of_user(
    session: AsyncSession = Depends(get_session),
    token_details: dict = Depends(access_token_bearer)
):
    user_uid = token_details.get('user')['uid']
    jobs = await job_service.get_jobs_by_user_uid(user_uid, session)
    return jobs

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
        raise JobNotFoundException()
        

@job_router.post('/', status_code=status.HTTP_201_CREATED, dependencies=[role_checker])
async def create_job(
    job_data: CreateJobModel,
    session: AsyncSession = Depends(get_session),
    token_details: dict = Depends(access_token_bearer)
):
    user_uid = token_details.get('user')['uid']
    jobs = await job_service.create_job(job_data, user_uid, session)
    return jobs

@job_router.patch('/{job_uid}', dependencies=[role_checker])
async def update_job(
    job_uid:str, 
    job_update_data: UpdateJobModel,
    session: AsyncSession = Depends(get_session),
    token_details: dict = Depends(access_token_bearer)
):
    updated_jobs = await job_service.update_job(job_uid, job_update_data, session)
    if updated_jobs:
        return updated_jobs
    else: 
        raise JobNotFoundException()

@job_router.delete('/{job_uid}', dependencies=[role_checker])
async def delete_job(
    job_uid: str,
    session: AsyncSession = Depends(get_session),
    token_details: dict = Depends(access_token_bearer)
):
    jobs = await job_service.delete_job(job_uid, session)
    return jobs