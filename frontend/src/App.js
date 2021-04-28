//Global Imports
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { ToastContainer, toast } from 'react-toastify';

import { persistor, store } from './reducers/store';

//Routes
import Dashboard from './components/user/dashboard';
//CSS
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {

  }

  render() {

    return (
      <div>
        <ToastContainer
          enableMultiContainer
          containerId={'toastMsg'}
          position={toast.POSITION.TOP_RIGHT}
          autoClose={2000}
        />
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <BrowserRouter>
              <Switch>
                <Route exact path='/' render={() => <Dashboard />} />
              </Switch>
            </BrowserRouter>
          </PersistGate>
        </Provider>
      </div>
    );
  }

}

export default App;
