from sqlalchemy.ext.asyncio import create_async_engine
from sqlmodel import SQLModel
from src.config import Config

async_engine = create_async_engine(
    url=Config.DATABASE_URL,
    echo=True
)

async def init_db():
    async with async_engine as conn:
        from src.jobs.models import Job
        
        await conn.run_sync(SQLModel.metadata.create_all)