import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PropState } from 'middlewares/configureReducer';
import { AuthState } from 'middlewares/reduxToolkits/authSlice';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { useDeleteData } from 'modules/firebaseHooks';
import SVG from 'modules/SVG';
import styles from './Card.module.scss';

function mapStateToProps(state: PropState): AuthState {
  return {
    ...state.auth
  };
}

function mapDispatchToProps(dispatch: (actionFunction: Action<any>) => any) {
  return {};
}

function Card({
  uid,
  id,
  title,
  createDt,
  type = '',
  path
}: typeCard): React.JSX.Element {
  const navigate = useNavigate();
  const useDeleteDataHook = useDeleteData(type, id);

  const handleDeleteBtn = (e: React.MouseEvent) => {
    e.stopPropagation();
    useDeleteDataHook();
  };

  const handleUpdateBtn = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/diagram/${type}/update/${id}`);
  };

  return (
    <div className={styles.wrap} onClick={() => navigate(path)}>
      {type && (
        <div className={styles.floatCategory}>
          <span>
            <SVG type="category" width="20px" height="20px" />
            &nbsp;
            {type}
          </span>
        </div>
      )}
      {uid !== undefined && uid !== null && uid !== '' ? (
        <div className={styles.floatBtns}>
          <span onClick={(e) => handleUpdateBtn(e)}>
            <SVG type="modify" width="20px" height="20px" />
          </span>
          <span onClick={(e) => handleDeleteBtn(e)}>
            <SVG type="trash" width="20px" height="20px" />
          </span>
        </div>
      ) : (
        ''
      )}
      <h3>{title}</h3>
      <div className={styles.cardInfo}>
        <span>
          {createDt && (
            <>
              <SVG type="time" width="20px" height="20px" />
              &nbsp;{createDt}
            </>
          )}
        </span>
      </div>
      {id === '0' && (
        <span className={styles.add}>
          <SVG type="add" width="100px" height="100px" />
        </span>
      )}
    </div>
  );
}

interface typeCard extends AuthState {
  id: string;
  title: string;
  createDt?: string;
  type?: string;
  path: string;
}

export default connect(mapStateToProps, mapDispatchToProps)(Card);
