from sqlmodel import SQLModel, Field, Column, Relationship
import sqlalchemy.dialects.postgresql as pg
import uuid
from datetime import date, datetime
from typing import Optional
from src.auth import models

class Job(SQLModel, table=True):
    __tablename__ = 'jobs'
    
    uid: uuid.UUID = Field(
        sa_column=Column(
            pg.UUID,
            nullable=False,
            primary_key=True,
            default=uuid.uuid4
        )
    )
    job_title: str 
    company_name: str 
    job_type: str 
    location: str 
    loc_type: str
    applied_on: date
    status: bool = Field(sa_column=Column(pg.BOOLEAN, default=True))
    level_reached: str
    salary: int
    user_uid: Optional[uuid.UUID] = Field(default=None, foreign_key="users.uid")
    created_at: datetime = Field(sa_column=Column(pg.TIMESTAMP, default = datetime.now))
    updated_at: datetime = Field(sa_column=Column(pg.TIMESTAMP, default = datetime.now))
    user: Optional["models.User"] = Relationship(back_populates="jobs")
    
    def __repr__(self):
        return f"<job {self.job_title}>"