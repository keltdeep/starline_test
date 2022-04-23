import axios from 'axios';

const API_YANDEX_KEY = 'ВставьтеВашКлюч'

export const YandexApi = (skip) =>
  axios.get(`https://search-maps.yandex.ru/v1/?text=москва рестораны&results=15&skip=${skip}&type=biz&lang=ru_RU&apikey=${API_YANDEX_KEY}`,
    {
      headers: {
        'Content-Type': 'application/json'
      }
    })