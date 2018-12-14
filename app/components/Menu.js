// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import { connect } from 'react-redux'

type Props = {
};

class Menu extends Component<Props, {
}> {
  props: Props;

  constructor(props: Props) {
    super(props);
    this.props = props;
    this.state = {
    };
  }

  render() {
    const { pathname } = this.props;
    return (
        <div className={'Menu' + (pathname == '/' ? ' onHome' : '')}>
          <Link className='Menu-back' to={routes.HOME}>
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
})

export default connect(mapStateToProps)(Menu)
