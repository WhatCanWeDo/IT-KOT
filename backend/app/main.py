from fastapi import FastAPI
from .routers import query_router
app = FastAPI()
#app = FastAPI(root_path='/api/v1')

origins = [

]

app.include_router(query_router.router, prefix='/query')
