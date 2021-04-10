from fastapi import FastAPI
from .routers import query_router
app = FastAPI()

origins = [

]

app.include_router(query_router.router, prefix='/query')
