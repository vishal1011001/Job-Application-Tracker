from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select, desc
from .models import Job
from .schemas import CreateJobModel, UpdateJobModel


class JobService:
    async def get_all_jobs(self, session: AsyncSession):
        """Retrieving all jobs from database"""
        statement = select(Job).order_by(desc(Job.created_at))
        result = await session.exec(statement)
        return result.all() if result is not None else None
    
    async def get_job(self, job_id: str, session: AsyncSession):
        statement = select(Job).where(Job.uid == job_id)
        result = await session.exec(statement)
        return result.first() if result is not None else None
    
    async def create_job(self, job_data: CreateJobModel, session: AsyncSession):
        job_data_dict = job_data.model_dump()
        new_job = Job(
            **job_data_dict
        )

        session.add(new_job)
        await session.commit()
        return new_job
    
    async def update_job(self, job_update_data: UpdateJobModel, session: AsyncSession):
        pass