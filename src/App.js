import React, {Component} from 'react';
import './App.css';
import YandexStore from './stores/yandex/Yandex';
import {Provider} from 'mobx-react';
import {Router, Route} from 'react-router-dom';
import {RouterStore, syncHistoryWithStore} from 'mobx-react-router';
import {YandexMap} from './container/mainPage/restaurantsOnMap/RestaurantsOnMap';
import {RestaurantsList} from "./container/mainPage/restaurantsList/RestaurantsList";
import {RestauranUnit} from "./container/restauranUnit/RestauranUnit";

const createHistory = require('history').createBrowserHistory;
const browserHistory = createHistory();
const RoutingStore = new RouterStore();
const history = syncHistoryWithStore(browserHistory, RoutingStore);

class App extends Component {
  constructor(props) {
    super(props);
    this.YandexStore;

    if (!this.YandexStore) {
      this.YandexStore = new YandexStore({RoutingStore});
    }
  }

  render() {
    return (
      <Router history={history}>
        <Route exact={true} path='/'>
          <Provider YandexStore={this.YandexStore}>
            <YandexMap />
            <RestaurantsList />
          </Provider>
        </Route>
        <Route path='/restauran'>
          <Provider YandexStore={this.YandexStore}>
            <RestauranUnit />
          </Provider>
        </Route>
      </Router>
    );
  }
}

export default App;
