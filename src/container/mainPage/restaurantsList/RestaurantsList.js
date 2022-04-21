import {Component} from 'react';
import s from './RestaurantsList.module.css';
import {inject} from "mobx-react";


@inject(({YandexStore}) => {
  return {
    restaurants: YandexStore.restaurants,
    setRestaurants: YandexStore.setRestaurants,
    history: YandexStore.RoutingStore,
    selectedRestaurants: YandexStore.selectedRestaurants,
    setSelectedRestaurants: YandexStore.setSelectedRestaurants,
    getRestourants: YandexStore.getRestourants,
    getRestaurantsByApi: YandexStore.getRestaurantsByApi,
  };
})

export class RestaurantsList extends Component {
  componentDidMount() {
    this.props.getRestourants(this.skip);
  }

  initialScroll = 0
  skip = 0

  handleScroll = async(event) => {
    const {scrollTop, scrollHeight, clientHeight} = event.target;

    const {restaurants, setRestaurants, getRestaurantsByApi} = this.props

    if (scrollTop + clientHeight >= scrollHeight) {
      this.initialScroll = scrollTop;
      this.skip += 15;

      const newRest = await getRestaurantsByApi(this.skip);

      setRestaurants([...restaurants, ...newRest.data.features])
    }
  }

  render() {
    const {
      restaurants,
      setSelectedRestaurants,
      history,
    } = this.props

    return (
      <div className={s.list} onScroll={this.handleScroll}>
        {restaurants?.map(({properties}, key) => {
          const {id, name, address} = properties.CompanyMetaData

          return (
            <div
                key={key}
                className={s.restaurantBlock}
                onClick={() => {
                  setSelectedRestaurants(properties)
                  history.push(`/restauran/${id}`)
                }}
            >
              <div>Название: {name}</div>
              <div>Адрес: {address}</div>
            </div>
        )})}
      </div>
    );
  }
}