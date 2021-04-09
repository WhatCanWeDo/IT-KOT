from fastapi import APIRouter, Request
import httpx
from fastapi.responses import JSONResponse
import logging
from super_dan import convert_speech_to_text

router = APIRouter()


async def send_request_to_kitchen(request):
    async with httpx.AsyncClient() as client:
        response = await client.post('address', data=request)
    json = response.json()
    if not json['success']:
        logging.warning(f'Error with sending request to the kitchen \n Kitchen\'s response : {json}')


@router.post('/send-speech-order')
async def send_speech_order(request: Request):
    if not request['speech_url']:
        logging.warning('Missing speech_url')
        return JSONResponse(status_code=400, content={'success': False, 'error_message': 'Expected speech url'})

    json = convert_speech_to_text(request['speech_url'])
    await send_request_to_kitchen(json)


@router.post('/send-order')
async def send_text(request: Request):
    if not request['data']:
        logging.warning('Missing json file')
        return JSONResponse(status_code=400, content={'success': False, 'error_message': 'Expected json file'})

    await send_request_to_kitchen(request['data'])

