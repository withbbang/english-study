import React, { useEffect, useState } from 'react';
import { PropState } from 'middlewares/configureReducer';
import { AuthState } from 'middlewares/reduxToolkits/authSlice';
import { connect } from 'react-redux';
import { Action } from 'redux';
import {
  useAddData,
  useDeleteData,
  useGetData,
  useGetDatas,
  useSignOut,
  useUpdateData
} from 'modules/firebaseHooks';
import { useNavigate, useParams } from 'react-router-dom';
import { handleGetTitle } from 'modules/utils';
import {
  useChangeHook,
  useNormalConfirmPopupHook,
  useSetIsActivePopupHook
} from 'modules/customHooks';
import Back from 'components/back';
import Card from 'components/card';
import AddUpdateViewPopup from 'components/addUpdateViewPopup/AddUpdateViewPopup';
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
  const navigate = useNavigate();
  const useSignOutHook = useSignOut();
  const useAddDataHook = useAddData();
  const useUpdateDataHook = useUpdateData();
  const useDeleteDataHook = useDeleteData();
  const { datas, useGetDatasHook } = useGetDatas(type);
  const { data, useGetDataHook } = useGetData();
  const { form, setForm } = useChangeHook({
    popupMessage: '',
    selectedId: '',
    popupType: '',
    isActivePopup: false
  });
  const [confirmBtn, setConfirmBtn] = useState<Function>(() => {});
  const useNormalConfirmPopup = useNormalConfirmPopupHook({
    message: `${form.popupMessage}` || '',
    confirmCb: () => confirmBtn()
  });
  const { xPos, yPos, useClickComponent } = useSetIsActivePopupHook();

  useEffect(() => {
    useGetDatasHook();
  }, []);

  // 카드 클릭 콜백
  const handleClickCard = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    id: string
  ) => {
    e.stopPropagation();
    useClickComponent(e);
    useGetDataHook(type, id);
    setForm((prevState) => ({
      ...prevState,
      selectedId: id,
      isActivePopup: true,
      popupType: id === '0' ? 'view' : 'add'
    }));
  };

  // 수정 svg 콜백
  const handleClickUpdate = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    id: string
  ) => {
    e.stopPropagation();
    useClickComponent(e);
    useGetDataHook(type, id);
    setForm((prevState) => ({
      ...prevState,
      popupType: 'update',
      selectedId: id
    }));
  };

  // 삭제 svg 콜백
  const handleClickDelete = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    id: string
  ) => {
    e.stopPropagation();
    setConfirmBtn(() => useDeleteDataHook(type, id));
    setForm((prevState) => ({
      ...prevState,
      popupMessage: 'Are you sure you wanna delete?',
      selectedId: id
    }));
    useNormalConfirmPopup();
  };

  // 추가, 수정 버튼 콜백
  const handleAddUpdateOkBtn = (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    e.stopPropagation();

    let popupMessage = '';

    if (form.popupType === 'add') {
      popupMessage = 'Are you sure you wanna add?';
      setConfirmBtn(() => useAddDataHook(form));
    } else if (form.popupType === 'update') {
      popupMessage = 'Are you sure you wanna update?';
      setConfirmBtn(() => useUpdateDataHook(form));
    } else {
      setForm((prevState) => ({
        ...prevState,
        popupMessage,
        isActivePopup: false
      }));
      return;
    }

    setForm((prevState) => ({
      ...prevState,
      popupMessage,
      isActivePopup: false
    }));
    useNormalConfirmPopup();
  };

  return (
    <>
      <AddUpdateViewPopup
        isActive={!!form.isActivePopup}
        xPos={xPos}
        yPos={yPos}
        popupType={`${form.popupType}`}
        onClick={handleAddUpdateOkBtn}
      />
      <div className={styles.wrap}>
        <Back />
        <div className={styles.signBtns}>
          {/* <span>
          <SVG type="search" width="30px" height="30px" />
        </span> */}
          {uid !== undefined && uid !== null && uid !== '' ? (
            <button onClick={useSignOutHook}>Sign Out</button>
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
            <Card id={'0'} title={''} onClick={handleClickCard} />
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
                onClick={handleClickCard}
                onClickDelete={handleClickDelete}
              />
            ))}
        </div>
      </div>
    </>
  );
}

interface typeCardList extends AuthState {}

export default connect(mapStateToProps, mapDispatchToProps)(CardList);
