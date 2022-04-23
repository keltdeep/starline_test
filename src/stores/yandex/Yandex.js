import {observable, makeObservable, action} from 'mobx';
import {YandexApi} from "../../api/YandexApi";

class YandexStore {
  initialScroll = 0
  skip = 0

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
      const restourants = await YandexApi(skip);

      this.setRestaurants(restourants?.data.features);
    } catch(err) {
      //тут бы нотификацию
      console.log(err);
    }
  }

  handleScroll = async(event) => {
    const {scrollTop, scrollHeight, clientHeight} = event.target;

    if (scrollTop + clientHeight >= scrollHeight) {
      this.initialScroll = scrollTop;
      this.skip += 15;

      const newRest = await YandexApi(this.skip);

      this.setRestaurants([...this.restaurants, ...newRest.data.features])
    }
  }
}

export default YandexStore;
