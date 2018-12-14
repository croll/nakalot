// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';

type Props = {
};

export default class Parameters extends Component<Props, {
  email: '',
  password: '',
  handle: '',
}> {
  props: Props;

  constructor(props: Props) {
    super(props);
    this.props = props;
    this.state = {
      email: '',
      password: '',
      handle: '',
    };
  }

  render() {
    const {
      email,
      password,
      handle,
    } = this.state;
    return (
      <div className="Parameters">
        <h2 className="stage">
          1. Parametres d'envoi
        </h2>
        <div className="form">
          <div className="email">
            <label htmlFor="email">Email :</label>
            <input id='email' type="text" value={email} onChange={(e) => { this.setState({ email: e.target.value })}}/>
          </div>
          <div className="password">
            <label htmlFor="password">Mot de passe :</label>
            <input id="password" name="password" type="password" value={password} onChange={(e) => { this.setState({ password: e.target.value })}}/>
          </div>
          <div className="handle">
            <label htmlFor="handle">Handle :</label>
            <input id="handle" name="handle" type="text" value={handle} onChange={(e) => { this.setState({ handle: e.target.value })}}/>
          </div>
        </div>

        <div className='next' data-tid="nextButton">
          <Link to={routes.HOME}>
            <i className="fa fa-arrow-right fa-3x" />
          </Link>
        </div>

      </div>
    );
  }
}
