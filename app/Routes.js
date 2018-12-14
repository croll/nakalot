import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';
import HomePage from './containers/HomePage';
import CounterPage from './containers/CounterPage';
import ParametersPage from './containers/ParametersPage';
import Menu from './components/Menu';

import { AnimatedSwitch } from 'react-router-transition';

export default class Routes extends Component<Props> {

  render = () => {
    const { onHome } = this.state;
    return (
      <App>
        <Menu onHome={onHome} />
        <AnimatedSwitch
          atEnter={{ left: -2000 }}
          atLeave={{ left: 2000 }}
          atActive={{ left: 0 }}
          className="switch-wrapper"
        >
          <Route path={routes.COUNTER} component={CounterPage}/>
          <Route path={routes.PARAMETERS} component={ParametersPage}/>
          <Route path={routes.HOME} component={HomePage}/>
        </AnimatedSwitch>
      </App>
    )
  }
}
