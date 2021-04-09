from fastapi import APIRouter, Request
import httpx
from fastapi.responses import JSONResponse
import logging
from ..speech2order import speech2order

router = APIRouter()


async def send_request_to_kitchen(request, cafe_id):
    async with httpx.AsyncClient() as client:
        response = await client.post('address/' + cafe_id + '/order', data=request)
    json = response.json()
    if not json['success']:
        logging.warning(f'Error with sending request to the kitchen \n Kitchen\'s response : {json}')


@router.post('/send-speech-order')
async def send_speech_order(request: Request):
    if not request['speech_url']:
        logging.warning('Missing speech_url')
        return JSONResponse(status_code=400, content={'success': False, 'error_message': 'Expected speech url'})

    json = await speech2order(speech_url=request['speech_url'])
    await send_request_to_kitchen(json, cafe_id=request['cafe_id'])
    return JSONResponse(status_code=200, content={'success': True})


@router.post('/send-order')
async def send_text(request: Request):
    if not request['data']:
        logging.warning('Missing json file')
        return JSONResponse(status_code=400, content={'success': False, 'error_message': 'Expected json file'})

    await send_request_to_kitchen(request['data'], cafe_id=request['cafe_id'])
    return JSONResponse(status_code=200, content={'success': True})
