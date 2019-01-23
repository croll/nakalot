// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import { connect } from 'react-redux'

class Menu extends Component {

  render() {
    const { pathname, back, next } = this.props;
    return (
        <div className={'Menu' + (pathname == '/' ? ' onHome' : '')}>
          <Link className='Menu-back' to={back}>
            <i className="fa fa-arrow-left fa-2x" />
          </Link>
          <div className='Menu-title'>Nakalot</div>
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

export default connect(mapStateToProps)(Menu)
