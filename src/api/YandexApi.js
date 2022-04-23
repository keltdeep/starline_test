import axios from 'axios';

export const YandexApi = (skip) =>
  axios.get(`https://search-maps.yandex.ru/v1/?text=москва рестораны&results=15&skip=${skip}&type=biz&lang=ru_RU&apikey=9e8e710b-8281-4f3a-a272-5dadd59ef0fd`,
    {
      headers: {
        'Content-Type': 'application/json'
      }
    })