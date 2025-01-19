import React, { useEffect } from 'react';
import { PropState } from 'middlewares/configureReducer';
import { AuthState } from 'middlewares/reduxToolkits/authSlice';
import { connect } from 'react-redux';
import { Action } from 'redux';
import {
  useAddPopup,
  useDeletePopup,
  useGetData,
  useGetDatas,
  useSignOut,
  useUpdatePopup
} from 'modules/firebaseHooks';
import { useNavigate, useParams } from 'react-router-dom';
import { handleGetTitle } from 'modules/utils';
import { useChangeHook } from 'modules/customHooks';
import {
  stopSpeech,
  startSpeech,
  splitContents,
  ttsInit
} from 'modules/ttsUtils';
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
  const useAddPopupHook = useAddPopup(() => handleSuccessCb());
  const useUpdatePopupHook = useUpdatePopup(() => handleSuccessCb());
  const useDeletePopupHook = useDeletePopup(() => handleSuccessCb());
  const { datas, useGetDatasHook } = useGetDatas(type);
  const { useGetDataHook } = useGetData((response) => {
    console.log(response);
    setForm((prevState) => ({
      ...prevState,
      title: response.title,
      contents: response.contents
    }));
  });
  const { form, setForm, useChange } = useChangeHook({
    title: '',
    contents: '',
    selectedId: '',
    popupType: '',
    isActivePopup: false,
    xPos: -1,
    yPos: -1,
    doesTtsWork: false
  });

  useEffect(() => {
    useGetDatasHook();
    ttsInit();
  }, []);

  // api 호출 후 콜백
  const handleSuccessCb = () => {
    useGetDatasHook();
    setForm((prevState) => ({
      ...prevState,
      title: '',
      contents: '',
      selectedId: '',
      popupType: '',
      isActivePopup: false,
      xPos: form.x,
      yPos: form.y
    }));
  };

  // 카드 클릭 콜백
  const handleClickCard = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    id: string,
    popupType: string
  ) => {
    e.stopPropagation();

    if (id !== '0') useGetDataHook(type, id);
    setForm((prevState) => ({
      ...prevState,
      selectedId: id,
      popupType,
      isActivePopup: true,
      xPos: e.clientX,
      yPos: e.clientY
    }));
  };

  // 카드 닫기
  const handleCloseCard = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    stopSpeech();
    setForm((prevState) => ({
      ...prevState,
      title: '',
      contents: '',
      selectedId: '',
      popupType: '',
      isActivePopup: false,
      xPos: e.clientX,
      yPos: e.clientY,
      doesTtsWork: false
    }));
  };

  // 추가, 수정 버튼 콜백
  const handleAddUpdateOkBtn = (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    e.stopPropagation();

    if (form.popupType === 'add')
      useAddPopupHook(type, {
        title: form.title,
        contents: form.contents,
        createDt: new Date()
      });
    else if (form.popupType === 'update')
      useUpdatePopupHook(type, `${form.selectedId}`, {
        title: form.title,
        contents: form.contents,
        updateDt: new Date()
      });
    else handleCloseCard(e);
  };

  // 삭제 버튼 콜백
  const handleClickDelete = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    id: string
  ) => {
    e.stopPropagation();

    useDeletePopupHook(type, id);
  };

  // tts 시작
  const handleStartSpeech = () => {
    if (!form.doesTtsWork)
      splitContents(`${form.contents}`).forEach((text) =>
        startSpeech(
          text,
          () => setForm((prevState) => ({ ...prevState, doesTtsWork: true })),
          () => setForm((prevState) => ({ ...prevState, doesTtsWork: false }))
        )
      );
  };

  // tts 정지
  const handleStopSpeech = () => {
    setForm((prevState) => ({ ...prevState, doesTtsWork: false }));
    stopSpeech();
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
        onStartSpeech={handleStartSpeech}
        onStopSpeech={handleStopSpeech}
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
                onClickUpdate={handleClickCard}
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
