# TrueTechHack by Пажилой Пивальди

Видео-презентация https://youtu.be/p5IKOTBnHvk \
Ссылка на решение на VM (работает только фронт): http://91.185.86.201:4998 \
Ссылка на презентацию: 

## Состав команды
Иван Павлов - капитан, архитектор, бэкенд (внедрение алгоритмов, многопроцессность), девопс.\
Арсений Соколов - алгоритмы opencv, UI/UX дезайн.\
Артемий Крючков - frontend.\
Илья Лютоев - бэкенд (api).

## Стек технологий
backend: C++, Crow, unistd.h, ZMQ, nlohmann::json, opencv, mjpeg\
frontend: 

## Архитектура:
<img width="720" alt="image" src="./architect.png">

## Описание алгоритмов:

## Описание фронтенда

## Описание бэкенда:
Есть API, написанное на фреймворке Crow. У api есть роутеры:
- /create - принимает json {"login": str, "filmName": str}. По логину вычисляет id, все это лежит в std::map и std::vector, но вообще нужен Redis. создает новый обработчик системным вызовом fork(), системным вызовом exec() запускает обработчик, передавая ему порт (вычисляется по id) и название фильма. Затем  посредством zeromq получает из обработчика порт, на котором будут стримиться видео, и запускает видео.
- /pause, /resume - принимают json {"login": str}, передает его на соответствующий обработчик
- /filter - принимает json {"login": str, "filterType": str, "vct": str} - тип фильтра (яркость, контрастность, насыщенность, оттенок, фильтр для дальтоников, для эпилептиков, фильтр синего), "vct" - принимает занчения "left" или "right" в зависимости от того, уменьшаем мы или увеличиваем значение яркости и тд.
- /remove - принимает json {"login": str} - убивает процеесс, освобождает сокет.
На обработчике 2 потока: первый слушает команды из API, ложит их в очередь, второй поток берет команды из очереди, и в зависимости от них обрабатывает видео.

## Описание девопса:
Использовал сервис МТС Compute Cloud (Ubuntu). frontend на нем работает, API он не видит.

## Запуск
работает только на linux\
frontend:
```
cd frontend
yarn
yarn dev
```
backend:
```
cd server/build
cmake ..
make
./api
```
