// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import { connect } from 'react-redux'


class Footer extends Component {

  static propTypes = {
    pathname: PropTypes.string,
    search: PropTypes.string,
    hash: PropTypes.string,
    back: PropTypes.string,
    next: PropTypes.string,
  };

  render() {
    const { pathname, back, next } = this.props;
    return (
        <div className={'Footer' + (pathname == '/' ? ' onHome' : '')}>
          <div className='Footer-title'>
            <a href="http://labexmed.org/">@labexmed</a>
            , made by <a href="http://croll.fr/">CROLL</a>
          </div>
          { next !== '' && (
            <Link className='Footer-next' to={next}>
              Suivant&nbsp;&nbsp;<i className="fa fa-arrow-right fa-2x" />
            </Link>
          )}
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
