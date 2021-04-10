from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import query_router
app = FastAPI()

origins = [
    "176.113.120.254",
    "83.149.45.87",
    "162.158.183.185",
    "http://localhost",
]

app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=['*'],
        allow_headers=['*'],
)

app.include_router(query_router.router, prefix='/query')
