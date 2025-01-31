import React, { useEffect } from 'react';
import SVG from 'modules/SVG';
import styles from './AddUpdateViewPopup.module.scss';

function AddUpdateViewPopup({
  type,
  title,
  contents,
  enEn,
  enKo,
  isActive,
  popupType,
  xPos,
  yPos,
  useChange,
  onCloseCard,
  onClick,
  onStartSpeech,
  onStopSpeech,
  onStartRecognition
}: TypeAddUpdateViewPopup): React.JSX.Element {
  const divRef = React.useRef(
    null
  ) as React.MutableRefObject<HTMLDivElement | null>;

  useEffect(() => {
    if (isActive) handleActivePopup();
    else handleInActivePopup();
  }, [isActive]);

  // 팝업 활성
  const handleActivePopup = () => {
    document.body.style.overflow = 'hidden';

    if (divRef.current) {
      divRef.current.style.transition = 'none';
      divRef.current.style.left = `${xPos}px`;
      divRef.current.style.top = `${yPos}px`;
    }

    setTimeout(() => {
      if (divRef.current) {
        divRef.current.style.transition = 'all 0.5s';
        divRef.current.style.top = '50%';
        divRef.current.style.left = '50%';
        divRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
      }
    }, 0);
  };

  // 팝업 비활성
  const handleInActivePopup = () => {
    document.body.style.overflow = 'unset';

    if (divRef.current) {
      divRef.current.style.top = `${yPos}px`;
      divRef.current.style.left = `${xPos}px`;
      divRef.current.style.transform = 'translate(-50%, -50%) scale(0)';
    }
  };

  return (
    <>
      <div
        className={
          isActive
            ? [styles.background, styles.isActive].join(' ')
            : styles.background
        }
        onClick={onCloseCard}
      />
      <div
        className={
          popupType === 'view'
            ? [styles.modalBody, styles.viewMode].join(' ')
            : styles.modalBody
        }
        ref={divRef}
      >
        <div className={styles.content}>
          <label htmlFor="title" className={styles.title}>
            Title&nbsp;&nbsp;&nbsp;
            <input
              id="title"
              name="title"
              value={title}
              onChange={useChange}
              disabled={popupType === 'view'}
            />
          </label>
        </div>
        {type === 'diary' || type === 'hard-to-speak-phrase' ? (
          <div className={styles.content}>
            <label htmlFor="contents">
              Contents
              <br />
              <textarea
                name="contents"
                value={contents}
                onChange={useChange}
                disabled={popupType === 'view'}
              />
            </label>
          </div>
        ) : (
          <>
            <div className={styles.content}>
              <label htmlFor="enEn">
                English-English
                <br />
                <input
                  name="enEn"
                  value={enEn}
                  onChange={useChange}
                  disabled={popupType === 'view'}
                />
              </label>
            </div>
            <div className={styles.content}>
              <label htmlFor="enKo">
                English-Korean
                <br />
                <input
                  name="enKo"
                  value={enKo}
                  onChange={useChange}
                  disabled={popupType === 'view'}
                />
              </label>
            </div>
            <div className={styles.content}>
              <label htmlFor="contents">
                Example
                <br />
                <textarea
                  name="contents"
                  value={contents}
                  onChange={useChange}
                  disabled={popupType === 'view'}
                />
              </label>
            </div>
          </>
        )}
        <div className={styles.btns}>
          <div className={styles.speechBtns}>
            <span onClick={onStartSpeech}>
              <SVG type="play" width="30px" height="30px" />
            </span>
            <span onClick={onStopSpeech}>
              <SVG type="stop" width="30px" height="30px" />
            </span>
            {popupType !== 'view' && (
              <span onClick={onStartRecognition}>
                <SVG type="mike" width="25px" height="25px" />
              </span>
            )}
          </div>
          <button onClick={onClick}>OK</button>
        </div>
      </div>
    </>
  );
}

interface TypeAddUpdateViewPopup {
  type: string;
  title: string;
  contents: string;
  enEn: string;
  enKo: string;
  isActive: boolean;
  popupType?: string;
  xPos?: number;
  yPos?: number;
  useChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => void;
  onCloseCard: (e?: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  onStartSpeech: () => void;
  onStopSpeech: () => void;
  onStartRecognition: () => void;
}

export default AddUpdateViewPopup;
