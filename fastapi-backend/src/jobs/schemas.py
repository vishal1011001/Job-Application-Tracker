from pydantic import BaseModel
from datetime import datetime, date
import uuid

class JobModel(BaseModel):
    uid: uuid.UUID
    user_uid: uuid.UUID
    job_title: str
    company_name: str
    job_type: str
    location: str
    loc_type: str
    applied_on: date
    status: bool
    level_reached: str
    salary: int
    created_at: datetime
    updated_at: datetime
    
class CreateJobModel(BaseModel):
    job_title: str
    company_name: str
    job_type: str
    location: str
    loc_type: str
    applied_on: date
    status: bool
    level_reached: str
    salary: int

class UpdateJobModel(BaseModel):
    job_title: str
    company_name: str
    job_type: str
    location: str
    loc_type: str
    applied_on: date
    status: bool
    level_reached: str
    salary: int