import axios from 'axios';

// ключ в енв вынести
const API_YANDEX_KEY = 'ВставьтеВашКлюч'

export const YandexApi = (skip) =>
  // к апишкам лучше с бека обращаться
  axios.get(`https://search-maps.yandex.ru/v1/?text=москва рестораны&results=15&skip=${skip}&type=biz&lang=ru_RU&apikey=${API_YANDEX_KEY}`,
    {
      headers: {
        'Content-Type': 'application/json'
      }
    })