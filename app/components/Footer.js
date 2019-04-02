// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import { connect } from 'react-redux'

const pjson = require('../../package.json');


class Footer extends Component {

  static propTypes = {
    pathname: PropTypes.string,
    search: PropTypes.string,
    hash: PropTypes.string,
    back: PropTypes.string,
    next: PropTypes.string,
  };

  render() {
    const version = pjson.version;
    const { pathname, back, next } = this.props;
    return (
        <div className={'Footer' + (pathname == '/' ? ' onHome' : '')}>
          <div className='Footer-title'>
            <a target="_blank" rel="noopener noreferrer" href="https://gitlab.huma-num.fr/nakala-tools/nakalot/">Nakalot&nbsp;{version}</a>
            &nbsp;<a target="_blank" rel="noopener noreferrer" href="http://labexmed.dev.croll.fr/">©labexmed</a>
            ,&nbsp;made&nbsp;by&nbsp;<a target="_blank" rel="noopener noreferrer" href="http://croll.fr/">CROLL</a>
          </div>
          <Link className={ next !== '' ? 'Footer-next' : 'Footer-next hidden' } to={next}>
            Suivant&nbsp;&nbsp;<i className="fa fa-arrow-right fa-2x" />
          </Link>
        </div>
    );
  }
}


const mapStateToProps = state => ({
  pathname: state.router.location.pathname,
  search: state.router.location.search,
  hash: state.router.location.hash,
  back: state.transients.back,
  next: state.transients.next,
})

export default connect(mapStateToProps)(Footer)
