from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select, desc
from .models import Job


class JobService:
    async def get_all_jobs(self, session: AsyncSession):
        """Retrieving all jobs from database"""
        statement = select(Job).order_by(desc(Job.created_at))
        result = await session.exec(statement)
        return result.all() if result is not None else None
    
    async def get_job(self, job_id: str, session: AsyncSession):
        statement = select(Job).where(Job.id == job_id)
        result = await session.exec(statement)
        return result.first() if result is not None else None
    
    