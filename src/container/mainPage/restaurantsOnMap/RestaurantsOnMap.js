import {YMaps, Map, Placemark} from 'react-yandex-maps';
import {Component} from 'react';
import {inject} from "mobx-react";

@inject(({YandexStore}) => {
  return {
    restaurants: YandexStore.restaurants,
  };
})
export class YandexMap extends Component {
  render() {
    const mapData = {
      center: [55.751574, 37.573856],
      zoom: 5
    };

    const coordinates = []

    this.props.restaurants?.forEach(({geometry}) => coordinates.push([geometry.coordinates[1], geometry.coordinates[0]]))

    return (
      <YMaps>
        <Map defaultState={mapData}>
          {coordinates.map((coordinate, key) => <Placemark key={key} geometry={coordinate} />)}
        </Map>
      </YMaps>
    );
  }
};