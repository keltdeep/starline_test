import {observable, makeObservable, action} from 'mobx';
import axios from 'axios';

class YandexStore {
  @observable restaurants;
  @observable selectedRestaurants;
  @observable coordinates;

  constructor({RoutingStore}) {
    makeObservable(this);

    this.RoutingStore = RoutingStore;
  }

  @action setRestaurants = (restaurants) => {
    this.restaurants = restaurants;
  };

  @action setSelectedRestaurants = (restaurant) => {
    this.selectedRestaurants = restaurant;
  };

  @action setCoordinates = (coordinates) => {
    this.coordinates = coordinates;
  }

  getRestourants = async(skip) => {
    try {
      const restourants = await this.getRestaurantsByApi(skip);

      this.setRestaurants(restourants?.data.features);
    } catch(err) {
      //тут бы нотификацию
      console.log(err);
    }
  }

  //ключ в енв выносить надо, т.к. тестовое не стал делать
  getRestaurantsByApi = (skip) =>
    axios.get(`https://search-maps.yandex.ru/v1/?text=москва рестораны&results=15&skip=${skip}&type=biz&lang=ru_RU&apikey=9e8e710b-8281-4f3a-a272-5dadd59ef0fd`,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      })
}

export default YandexStore;
