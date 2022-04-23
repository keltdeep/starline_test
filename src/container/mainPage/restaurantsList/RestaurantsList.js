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
    handleScroll: YandexStore.handleScroll,
    skip: YandexStore.skip
  };
})

export class RestaurantsList extends Component {
  componentDidMount() {
    this.props.getRestourants(this.props.skip);
  }

  render() {
    const {
      restaurants,
      setSelectedRestaurants,
      history,
      handleScroll
    } = this.props

    return (
      <div className={s.list} onScroll={handleScroll}>
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
              <div>Название2: {name}</div>
              <div>Адрес: {address}</div>
            </div>
        )})}
      </div>
    );
  }
}