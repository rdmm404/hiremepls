from fastapi import FastAPI
from src.users.api import router as users_router
from src.auth.api import router as auth_router
from src.jobs.api import router as jobs_router

app = FastAPI()
app.include_router(users_router)
app.include_router(auth_router)
app.include_router(jobs_router)
