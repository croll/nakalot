// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import { connect } from 'react-redux'

type Props = {
};

class Footer extends Component<Props, {
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
        <div className={'Footer' + (pathname == '/' ? ' onHome' : '')}>
          <div className='Footer-title'>
            <a href="http://labexmed.org/">@labexmed</a>
            , made by <a href="http://croll.fr/">CROLL</a>
          </div>
          <Link className='Footer-next' to={pathname == '/parameters' ? routes.FILECHOOSE : routes.UPLOADING }>
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
})

export default connect(mapStateToProps)(Footer)
