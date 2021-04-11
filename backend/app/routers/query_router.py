from fastapi import APIRouter, Request
import httpx
from fastapi.responses import JSONResponse
import logging
from pprint import pprint
from ..speech2order import speech2order

router = APIRouter()
prices = [250, 170, 195, 205, 120, 450, 370, 240, 200, 450, 200]
names = ['Салат Цезарь', 'Греческий салат', 'Салат из морепродуктов', 'Хинкал (индейка', 'Хинкал (баранина)', 'Хинкал (говядина)', 'Красное вино (Испания)', 'Белове вино (Франция)', 'Гранатовый сок']

@router.post('/make-order')
async def make_order(r: Request):
    request = await r.json()
    item_ids = request['items']
    p = 0
    ind = 0
    for i in item_ids:
        ind += 1
        print(f'{ind}) Блюдо: {names[i]}     Цена: {prices[i]} р.')
        p += prices[i]
    print('Цена заказа', p, 'рублей')
    return JSONResponse(status_code=200, content={})


@router.post('/get-description')
async def make_order(r: Request):
    pprint(await r.json())
    request = await r.json()
    item_id = request['itemId']
    descrs = {
        i: 'Наше лучшее блюдо!' for i in range(10)
    }
    return JSONResponse(status_code=200, content={'description': descrs[item_id]})
