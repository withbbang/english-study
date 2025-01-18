import React, { useEffect, useState } from 'react';
import { PropState } from 'middlewares/configureReducer';
import { AuthState } from 'middlewares/reduxToolkits/authSlice';
import { connect } from 'react-redux';
import { Action } from 'redux';
import {
  useAddData,
  useAddPopup,
  useDeleteData,
  useGetData,
  useGetDatas,
  useSignOut,
  useUpdateData
} from 'modules/firebaseHooks';
import { useNavigate, useParams } from 'react-router-dom';
import { handleGetTitle } from 'modules/utils';
import { useChangeHook, useNormalConfirmPopupHook } from 'modules/customHooks';
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
  const { form, setForm, useChange } = useChangeHook({
    title: '',
    contents: '',
    popupMessage: 'Are you sure you wanna delete?',
    selectedId: '',
    popupType: '',
    isActivePopup: false,
    xPos: -1,
    yPos: -1
  });
  const [confirmBtnCb, setConfirmBtnCb] = useState<Function>(() => {});
  const useNormalConfirmPopup = useNormalConfirmPopupHook({
    message: `${form.popupMessage}` || '',
    confirmBtnCb: () => confirmBtnCb()
  });
  const useAddPopupHook = useAddPopup(() => handleSuccessCb());

  useEffect(() => {
    useGetDatasHook();
  }, []);

  const handleSuccessCb = () => {
    useGetDatasHook();
    setForm((prevState) => ({
      ...prevState,
      title: '',
      contents: '',
      popupType: '',
      isActivePopup: false,
      xPos: form.x,
      yPos: form.y
    }));
  };

  // 카드 클릭 콜백
  const handleClickCard = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    id: string
  ) => {
    e.stopPropagation();
    if (id !== '0') useGetDataHook(type, id);
    setForm((prevState) => ({
      ...prevState,
      popupMessage:
        id === '0'
          ? 'Are you sure you wanna add?'
          : 'Are you sure you wanna delete?',
      selectedId: id,
      popupType: id === '0' ? 'add' : 'view',
      isActivePopup: true,
      xPos: e.clientX,
      yPos: e.clientY
    }));
  };

  // 카드 닫기
  const handleCloseCard = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setForm((prevState) => ({
      ...prevState,
      popupMessage: 'Are you sure you wanna delete?',
      selectedId: '',
      popupType: '',
      isActivePopup: false,
      xPos: e.clientX,
      yPos: e.clientY,
      type
    }));
  };

  // 수정 svg 콜백
  const handleClickUpdate = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    id: string
  ) => {
    e.stopPropagation();
    useGetDataHook(type, id);
    setForm((prevState) => ({
      ...prevState,
      popupMessage: 'Are you sure you wanna update?',
      selectedId: id,
      popupType: 'update',
      isActivePopup: false,
      xPos: e.clientX,
      yPos: e.clientY
    }));
  };

  // 삭제 svg 콜백
  const handleClickDelete = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    id: string
  ) => {
    e.stopPropagation();
    setConfirmBtnCb(() => useDeleteDataHook(type, id));
    setForm((prevState) => ({
      ...prevState,
      selectedId: id
    }));
    useNormalConfirmPopup();
  };

  // 추가, 수정 버튼 콜백
  const handleAddUpdateOkBtn = (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    e.stopPropagation();

    useAddPopupHook(type, {
      title: form.title,
      contents: form.contents,
      createDt: new Date()
    });
  };

  return (
    <>
      <AddUpdateViewPopup
        title={`${form.title}`}
        contents={`${form.contents}`}
        popupType={`${form.popupType}`}
        isActive={!!form.isActivePopup}
        xPos={+form.xPos}
        yPos={+form.yPos}
        useChange={useChange}
        onCloseCard={handleCloseCard}
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
                onClickUpdate={handleClickUpdate}
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
