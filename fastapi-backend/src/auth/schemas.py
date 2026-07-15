from pydantic import BaseModel
from datetime import datetime
from sqlmodel import Field, Column
import sqlalchemy.dialects.postgresql as pg
import uuid
from src.jobs.schemas import JobModel
from typing import List


class UserResponseModel(BaseModel):
    uid : uuid.UUID
    username: str
    email: str
    first_name: str
    last_name: str
    is_verified: bool
    password_hash: str = Field(exclude=True)
    created_at: datetime
    updated_at: datetime
    jobs: List[JobModel]

    
class UserCreateModel(BaseModel):
    username: str = Field(max_length=80)
    email: str = Field(max_length=200)
    password: str = Field(min_length=8, max_length=100)
    first_name: str
    last_name: str

class UserCredentials(BaseModel):
    email: str = Field(max_length=200)
    password: str = Field(min_length=8, max_length=100)