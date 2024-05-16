# SpartaGameSimulator

## API 명세서
|기능|Method|URL|요청(req)|응답(res)|
|------|---|---|---|---|
|캐릭터 생성|Post|/api/characters|{<br>"name": "양우성"<br>}  |{<br>"characters": {<br>"character_id": 1,<br>"name": "양우성",<br>"health": 500,<br>"power": 100,<br>"_id": "6643542fca66144ada68becc",<br>"__v": 0<br>}<br>}|
|Character_id로 캐릭터 조회|Get|/api/characters/:character_Id||{<br>"character": {<br>"_id": "6643542aca66144ada68bec6",<br>"character_id": 1,<br>"name": "양우성",<br>"health": 500,<br>"power": 200,<br>"__v": 0<br>}<br>}|
|캐릭터 삭제|Delete|/api/characters/:character_Id||{}|
|아이템 생성|Post|/api/items|{<br>"item_name": "목걸이",<br>"item_stat": {<br>"health": 30,<br>"power": 10<br>}<br>}|{<br>"Items": {<br>"item_code": 4,<br>"item_name": "목걸이",<br>"item_stat": {<br>"health": 30,<br>"power": 10<br>},<br>"_id": "66434d328692fcf0fc315a6c",<br>"__v": 0<br>}<br>}|
|Item Code로 아이템 조회|Get|/api/items/:item_code||{<br>"item": {<br>"item_stat": {<br>"power": 10<br>},<br>"_id": "66434d118692fcf0fc315a64",<br>"item_code": 2,<br>"item_name": "귀걸이",<br>"__v": 0<br>}<br>}|
|아이템 전체 조회|Get|/api/items||{<br>"items": [<br>{<br>"item_stat": {<br>"power": 100<br>},<br>"_id": "66434d0c8692fcf0fc315a60",<br>"item_code": 1,<br>"item_name": "무기",<br>"__v": 0<br>},<br>{<br>"item_stat": {<br>"power": 15<br>},<br>"_id": "66434d118692fcf0fc315a64",<br>"item_code": 2,<br>"item_name": "귀걸이",<br>"__v": 0<br>},<br>{<br>"item_stat": {<br>"health": 10<br>},<br>"_id": "66434d248692fcf0fc315a68",<br>"item_code": 3,<br>"item_name": "반지",<br>"__v": 0<br>},<br>{<br>"item_stat": {<br>"health": 30,<br>"power": 10<br>},<br>"_id": "66434d328692fcf0fc315a6c",<br>"item_code": 4,<br>"item_name": "목걸이",<br>"__v": 0<br>}<br>]<br>}|
|아이템 수정|Patch|/api/items/:item_code|{<br>"item_name": "귀걸이",<br>"power":15<br>}|{}|
|캐릭터가 착용 중인 장비 조회|Get|/api/characters/equipments/:character_Id||{<br>"equipments": [<br>{<br>"item_stat": {<br>"power": 50<br>},<br>"_id": "66434d0c8692fcf0fc315a60",<br>"item_code": 1,<br>"item_name": "무기",<br>"__v": 0<br>}<br>]<br>}|
|캐릭터에 아이템 장착/탈착|Patch|/api/characters/equipments/:character_Id|{<br>"item_code": 1,<br>"equipment": true<br>}|{}|
