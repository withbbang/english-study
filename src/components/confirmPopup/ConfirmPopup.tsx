import React from 'react';
import { PropState } from 'middlewares/configureReducer';
import { CommonState } from 'middlewares/reduxToolkits/commonSlice';
import { connect } from 'react-redux';
import { Action } from 'redux';
import styles from './ConfirmPopup.module.scss';

function mapStateToProps(state: PropState): CommonState {
  return {
    ...state.common
  };
}

function mapDispatchToProps(dispatch: (actionFunction: Action<any>) => any) {
  return {};
}

function ConfirmPopup({
  message,
  isConfirmPopupActive,
  confirmBtnText,
  cancelBtnText,
  useConfirmBtnCb,
  useCancelBtnCb
}: CommonState): React.JSX.Element {
  return (
    <div
      className={styles.background}
      style={
        isConfirmPopupActive !== undefined && isConfirmPopupActive
          ? { display: '' }
          : { display: 'none' }
      }
    >
      <div className={styles.modalBody}>
        <span dangerouslySetInnerHTML={{ __html: message || '' }} />
        <div>
          <button onClick={useCancelBtnCb}>{cancelBtnText || 'Cancel'}</button>
          <button onClick={useConfirmBtnCb}>{confirmBtnText || 'OK'}</button>
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmPopup);
