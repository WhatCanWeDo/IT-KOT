from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse
from pprint import pprint
import pandas as pd
from tabulate import tabulate


router = APIRouter()
names = ['Салат Цезарь', 'Греческий салат', 'Салат из морепродуктов', 'Хинкал (индейка', 'Хинкал (баранина)', 'Хинкал (говядина)', 'Красное вино (Испания)', 'Белове вино (Франция)', 'Гранатовый сок']


@router.post('/make-order')
async def make_order(r: Request):
    request = await r.json()
    item_ids = request['items']
    p = 0
    ind = 0
    items = {}
    for i in item_ids:
        if names[i] in items.keys():
            items[names[i]] += 1
        else:
            items[names[i]] = 1

    df = pd.DataFrame(items.items(), columns=['Блюдо', 'Количество'], index=None)
    print(tabulate(df, headers='keys', tablefmt='fancy_grid'))
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
