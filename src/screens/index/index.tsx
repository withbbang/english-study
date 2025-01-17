import { connect } from 'react-redux';
import { PropState } from 'middlewares/configureReducer';
import { Action } from '@reduxjs/toolkit';
import { AuthState } from 'middlewares/reduxToolkits/authSlice';
import IndexCT from './IndexCT';

function mapStateToProps(state: PropState): AuthState {
  return { ...state.auth };
}

function mapDispatchToProps(dispatch: (actionFunction: Action<any>) => any) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexCT);
