import {Component} from 'react';
import s from './RestauranUnit.module.css';
import {inject} from "mobx-react";

@inject(({YandexStore}) => {
  return {
    selectedRestaurants: YandexStore.selectedRestaurants,
  };
})

export class RestauranUnit extends Component {
  render() {
    const {name,
      address,
      Phones,
      url
    } = this.props.selectedRestaurants?.CompanyMetaData || {}

    return (
      <div className={s.list}>
        <div className={s.restaurantBlock}>
          <div>Название: {name}</div>
          <div>Адрес: {address}</div>
          <div>Телефоны: {
              Phones?.length && Phones.map((phone) => (
                <div key={phone.formatted}>
                  {phone.formatted}
                </div>
              ))
            }
          </div>
          <div>Сайт: {url}</div>
        </div>
      </div>
    );
  }
}