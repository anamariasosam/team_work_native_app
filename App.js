import React from 'react';
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import reducers from './reducers'
import ReduxThunk from 'redux-thunk'
import firebase from 'firebase'

import LoginForm from './components/LoginForm'

export default class App extends React.Component {

  authentication() {
    var config = {
      apiKey: 'AIzaSyCNj4qK9OFRgxpYgvsR-Ee0kxD4WI6aUiI',
      authDomain: 'team-work-9079d.firebaseapp.com',
      databaseURL: 'https://team-work-9079d.firebaseio.com',
      projectId: 'team-work-9079d',
      storageBucket: 'team-work-9079d.appspot.com',
      messagingSenderId: '799878237976'
    };
    firebase.initializeApp(config);
  }

  componentWillMount() {
    this.authentication()
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk))
    return (
      <Provider store={store} >
        <LoginForm />
      </Provider>

    );
  }
}
