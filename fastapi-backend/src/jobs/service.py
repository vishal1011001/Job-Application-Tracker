from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select, desc
from .models import Job
from .schemas import CreateJobModel, UpdateJobModel
from fastapi.exceptions import HTTPException
from fastapi import status


class JobService:
    async def get_all_jobs(self, session: AsyncSession):
        """Retrieving all jobs from database"""
        statement = select(Job).order_by(desc(Job.created_at))
        result = await session.exec(statement)
        return result.all() if result is not None else None
    
    async def get_job(self, job_uid: str, session: AsyncSession):
        statement = select(Job).where(Job.uid == job_uid)
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
    
    async def update_job(self, job_uid: str, job_update_data: UpdateJobModel, session: AsyncSession):
        job_to_update = await self.get_job(job_uid, session)
    
        if job_to_update:    
            job_update_dict = job_update_data.model_dump()
            for k, v in job_update_dict.items():
                setattr(job_to_update, k, v)
                
            await session.commit()
            return job_to_update
        else: 
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                                detail="Job to be updated not found."
                                )
            
    async def delete_job(self, job_uid: str, session: AsyncSession):
        job_to_delete = self.get_job(job_uid, session)
        if job_to_delete is not None:
            await session.delete(job_to_delete)
            await session.commit()
            return {}
        else:
            None
        