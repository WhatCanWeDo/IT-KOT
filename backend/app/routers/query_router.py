from fastapi import APIRouter, Request
import httpx
from fastapi.responses import JSONResponse
import logging
from ..speech2order import speech2order

router = APIRouter()
prices = [250, 170, 195, 205, 120, 450, 370, 240, 200, 450, 200]


@router.post('make-order')
async def make_order(r: Request):
    item_ids = r['items']
    p = 0
    for i in item_ids:
        print('Цена товара с id', i, '=', prices[i], 'рублей')
        p += prices[i]
    print('Цена заказа', p, 'рублей')
    return JSONResponse(status_code=200)
