import React, { useEffect } from 'react';
import { PropState } from 'middlewares/configureReducer';
import { AuthState } from 'middlewares/reduxToolkits/authSlice';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { useGetDatas, useSignOut } from 'modules/firebaseHooks';
import { useNavigate, useParams } from 'react-router-dom';
import Back from 'components/back';
import Card from 'components/card';
import { handleGetTitle } from 'modules/utils';
import styles from './CardList.module.scss';

function mapStateToProps(state: PropState): AuthState {
  return {
    ...state.auth
  };
}

function mapDispatchToProps(dispatch: (actionFunction: Action<any>) => any) {
  return {};
}

function CardList({ uid }: typeCardList): React.JSX.Element {
  const { type = '' } = useParams();
  const { datas, useGetDatasHook } = useGetDatas(type);
  const navigate = useNavigate();
  const useSignOutHoot = useSignOut();

  useEffect(() => {
    useGetDatasHook();
  }, []);

  return (
    <div className={styles.wrap}>
      <Back />
      <div className={styles.signBtns}>
        {/* <span>
          <SVG type="search" width="30px" height="30px" />
        </span> */}
        {uid !== undefined && uid !== null && uid !== '' ? (
          <button onClick={useSignOutHoot}>Sign Out</button>
        ) : (
          <>
            <button onClick={() => navigate('/sign-in')}>Sign In</button>
            <button onClick={() => navigate('/sign-up')}>Sign Up</button>
          </>
        )}
      </div>
      <h2>{handleGetTitle(type)}</h2>
      <div className={styles.innerWrap}>
        {uid !== undefined && uid !== null && uid !== '' && (
          <Card id={'0'} title={''} path={`/${type}/create`} />
        )}
        {Array.isArray(datas) &&
          datas.length > 0 &&
          datas.map(({ id, title, createDt }: any) => (
            <Card
              key={id}
              id={id}
              title={title}
              createDt={createDt}
              type={type}
              path={`/${type}/${id}`}
            />
          ))}
      </div>
    </div>
  );
}

interface typeCardList extends AuthState {}

export default connect(mapStateToProps, mapDispatchToProps)(CardList);
