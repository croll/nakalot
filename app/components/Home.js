// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  render() {
    return (
      <div className="Home">
        <div className="HomeDesc">
          Bienvenue sur l'application Nakalot.
          Cette application vous permet d'envoyer plusieurs fichiers d'un coup sur Nakala.
          Pour plus d'information et documentation, consultez l'aide ici&nbsp;:&nbsp;
          <a target="_blank" rel="noopener noreferrer" href='http://labexmed.dev.croll.fr/index.php/manuel-administrateur/nakalot/'>http://labexmed.dev.croll.fr/index.php/manuel-administrateur/nakalot/</a>
        </div>
        <Link className="Start" to={routes.PARAMETERS}>Commencer...</Link>
      </div>
    );
  }
}
