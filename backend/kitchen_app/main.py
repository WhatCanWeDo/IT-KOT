from fastapi import FastAPI
from .routers import display_on_kitchen
app = FastAPI()
#app = FastAPI(root_path='/api/v1')

origins = [

]

app.include_router(display_on_kitchen.router, prefix='/query')
