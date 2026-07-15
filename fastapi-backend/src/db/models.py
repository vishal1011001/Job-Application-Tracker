from sqlmodel import SQLModel, Field, Column, Relationship
import sqlalchemy.dialects.postgresql as pg
import uuid
from datetime import datetime, date
from typing import List, Optional

class User(SQLModel, table=True):
    __tablename__='users'
    
    uid: uuid.UUID = Field(
        sa_column=Column(
            pg.UUID,
            nullable=False,
            primary_key=True,
            default=uuid.uuid4
        )
    )
    username: str
    email: str
    password_hash: str = Field(exclude=True)
    first_name: str
    last_name: str
    role: str = Field(
        sa_column=Column(
            pg.VARCHAR,
            nullable=False,
            server_default="user"
        )
    )
    is_verified: bool = Field(sa_column=Column(pg.BOOLEAN, default=False))
    created_at: datetime = Field(sa_column=Column(pg.TIMESTAMP, default = datetime.now))
    updated_at: datetime = Field(sa_column=Column(pg.TIMESTAMP, default = datetime.now))
    jobs: List["Job"] = Relationship(back_populates="user", sa_relationship_kwargs={'lazy': 'selectin'})
    
    def __repr__(self):
        return f"<User email: {self.email}>"



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
    user: Optional["User"] = Relationship(back_populates="jobs")
    
    def __repr__(self):
        return f"<job {self.job_title}>"