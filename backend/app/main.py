from fastapi import FastAPI

app = FastAPI()
#app = FastAPI(root_path='/api/v1')

origins = [

]

app.