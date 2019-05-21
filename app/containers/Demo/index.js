/**
 *
 * Demo
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
import makeSelectDemo from './selectors';
import reducer from './reducer';
import { getInfoAction } from './actions';

export class Demo extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { dispatch } = this.props;
    return (
      <div className="row">
        <div className="col-sm pl-5">
          <button type="button" onClick={() => dispatch(getInfoAction())}>
            click here
          </button>
        </div>
      </div>
    );
  }
}

Demo.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  demo: makeSelectDemo(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'demo', reducer });

export default compose(
  withReducer,
  withConnect,
)(Demo);
