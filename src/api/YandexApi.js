import axios from 'axios';

export const YandexApi = (skip) =>
  axios.get(`https://search-maps.yandex.ru/v1/?text=москва рестораны&results=15&skip=${skip}&type=biz&lang=ru_RU&apikey=ВставьтеВашКлюч`,
    {
      headers: {
        'Content-Type': 'application/json'
      }
    })