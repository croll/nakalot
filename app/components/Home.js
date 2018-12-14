// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import styles from './Home.css';

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  render() {
    return (
      <div className={styles.container} data-tid="container">
        <h2>&nbsp;</h2>
        <div className="HomeDesc">
          Bienvenue sur l'application Nakalot.
          Cette application vous permet d'envoyer plusieurs fichiers d'un coup sur Nakala.
          Pour plus d'information et documentation, consultez l'aide ici :
            <a target='_blank' href='http://www.google.fr/'>http://www.google.fr/</a>
        </div>
        <Link className="Start" to={routes.PARAMETERS}>Commencer...</Link>
      </div>
    );
  }
}
