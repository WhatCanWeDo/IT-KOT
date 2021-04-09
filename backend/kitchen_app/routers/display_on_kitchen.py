from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse
from pprint import pprint
router = APIRouter()


@router.post('/order')
async def send_order(request: Request):
    pprint(request)
    return JSONResponse(status_code=200, content={'success': True})
