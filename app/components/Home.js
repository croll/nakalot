// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';

const pjson = require('../../package.json');

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  render() {
    const version = pjson.version;
    return (
      <div className="Home">
        <div className="HomeDesc">
          Bienvenue sur l'application Nakalot {version}.
          Cette application vous permet d'envoyer plusieurs fichiers d'un coup sur Nakala.
          Pour plus d'information et documentation, consultez l'aide ici&nbsp;:&nbsp;
          <a target="_blank" rel="noopener noreferrer" href='https://www.nakala.fr/data/11280/d6273202'>https://www.nakala.fr/data/11280/d6273202</a>
        </div>
        <Link className="Start" to={routes.PARAMETERS}>Commencer...</Link>
      </div>
    );
  }
}
