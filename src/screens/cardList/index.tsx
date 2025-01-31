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
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  history,
  handleGetTitle,
  handleSetUpperCaseFirstCharacter
} from 'modules/utils';
import { useChangeHook, useInitPopupHook } from 'modules/customHooks';
import {
  stopSpeech,
  startSpeech,
  splitContents,
  ttsInit,
  sttStart,
  sttInit
} from 'modules/speechUtils';
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
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const useSignOutHook = useSignOut();
  const useInitPopup = useInitPopupHook();
  const useAddPopupHook = useAddPopup(() => handleSuccessCb());
  const useUpdatePopupHook = useUpdatePopup(() => handleSuccessCb());
  const useDeletePopupHook = useDeletePopup(() => handleSuccessCb());
  const { datas, useGetDatasHook } = useGetDatas(type);
  const { useGetDataHook } = useGetData((response) => {
    setForm((prevState) => ({
      ...prevState,
      ...response
    }));
  });
  const { form, setForm, useChange } = useChangeHook({
    title: '',
    contents: '',
    enEn: '',
    enKo: '',
    selectedId: '',
    popupType: '',
    isActivePopup: false,
    xPos: -1,
    yPos: -1,
    isDisabledTts: false,
    isDisabledStt: false
  });

  useEffect(() => {
    if (
      !(
        type === 'diary' ||
        type === 'making-use-of' ||
        type === 'spoken-language' ||
        type === 'vocabulary' ||
        type === 'hard-to-speak-phrase'
      )
    )
      navigate('/not-found', { replace: true });
    else {
      useGetDatasHook();
      ttsInit();
      sttInit();
    }

    return () => {
      stopSpeech();
      useInitPopup();
    };
  }, []);

  useEffect(() => {
    const backEvent = history.listen(({ action }) => {
      if (action === 'POP') {
        handleCloseCard();
        useInitPopup();
      }
    });

    return backEvent;
  }, []);

  // api 호출 후 콜백
  const handleSuccessCb = () => {
    useGetDatasHook();
    handleCloseCard();
  };

  // 카드 클릭 콜백
  const handleClickCard = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    id: string,
    popupType: string
  ) => {
    e.stopPropagation();

    history.push(pathname);

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
  const handleCloseCard = (e?: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (form.isActivePopup) navigate(-1);
    stopSpeech();
    setForm((prevState) => ({
      ...prevState,
      title: '',
      contents: '',
      enEn: '',
      enKo: '',
      selectedId: '',
      popupType: '',
      isActivePopup: false,
      xPos: e ? e.clientX : form.x,
      yPos: e ? e.clientY : form.y,
      isDisabledTts: false,
      isDisabledStt: false
    }));
  };

  // 추가, 수정 버튼 콜백
  const handleAddUpdateOkBtn = (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    let params: any;

    if (uid === undefined || uid === null || uid === '') {
      handleCloseCard(e);
      return;
    }

    if (type === 'diary' || type === 'hard-to-speak-phrase')
      params = {
        title: form.title,
        contents: form.contents
      };
    else
      params = {
        title: form.title,
        enEn: form.enEn,
        enKo: form.enKo,
        contents: form.contents
      };

    if (form.popupType === 'add') {
      params.createDt = new Date();
      useAddPopupHook(type, params);
    } else if (form.popupType === 'update') {
      params.updateDt = new Date();
      useUpdatePopupHook(type, `${form.selectedId}`, params);
    } else handleCloseCard(e);
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
    if (!form.isDisabledTts)
      splitContents(`${form.contents}`).forEach((text) =>
        startSpeech(
          text,
          () => setForm((prevState) => ({ ...prevState, isDisabledTts: true })),
          () => setForm((prevState) => ({ ...prevState, isDisabledTts: false }))
        )
      );
  };

  // tts 정지
  const handleStopSpeech = () => {
    setForm((prevState) => ({ ...prevState, isDisabledTts: false }));
    stopSpeech();
  };

  // stt 시작
  const handleStartRecognition = () => {
    if (!form.isDisabledStt) {
      sttStart(
        () => setForm((prevState) => ({ ...prevState, isDisabledStt: true })),
        () => setForm((prevState) => ({ ...prevState, isDisabledStt: false })),
        (text) => {
          const txt = handleSetUpperCaseFirstCharacter(text);

          setForm((prevState) => ({
            ...prevState,
            contents: !`${form.contents}` ? txt : `${form.contents}\n${txt}`
          }));
        }
      );
    }
  };

  return (
    <>
      <AddUpdateViewPopup
        type={type}
        title={`${form.title}`}
        contents={`${form.contents}`}
        enEn={`${form.enEn}`}
        enKo={`${form.enKo}`}
        popupType={`${form.popupType}`}
        isActive={!!form.isActivePopup}
        xPos={+form.xPos}
        yPos={+form.yPos}
        useChange={useChange}
        onCloseCard={handleCloseCard}
        onClick={handleAddUpdateOkBtn}
        onStartSpeech={handleStartSpeech}
        onStopSpeech={handleStopSpeech}
        onStartRecognition={handleStartRecognition}
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
              {/* <button onClick={() => navigate('/sign-up')}>Sign Up</button> */}
            </>
          )}
        </div>
        <h2>{handleGetTitle(type)}</h2>
        <div className={styles.innerWrap}>
          <Card id={'0'} title={''} onClickCard={handleClickCard} />
          {Array.isArray(datas) &&
            datas.length > 0 &&
            datas.map(({ id, title, createDt }: any) => (
              <Card
                key={id}
                id={id}
                title={title}
                createDt={createDt}
                type={type}
                onClickCard={handleClickCard}
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
