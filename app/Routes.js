import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';
import HomePage from './containers/HomePage';
import CounterPage from './containers/CounterPage';
import ParametersPage from './containers/ParametersPage';

import { AnimatedSwitch } from 'react-router-transition';

export default () => (
  <App>
    <AnimatedSwitch
      atEnter={{ left: -2000 }}
      atLeave={{ left: 2000 }}
      atActive={{ left: 0 }}
      className="switch-wrapper"
    >
      <Route path={routes.COUNTER} component={CounterPage} />
      <Route path={routes.PARAMETERS} component={ParametersPage} />
      <Route path={routes.HOME} component={HomePage} />
    </AnimatedSwitch>
  </App>
);
