import React, { useEffect } from 'react';
import { TypeKeyValueForm } from 'modules/types';
import { useChangeHook } from 'modules/customHooks';
import styles from './AddUpdateViewPopup.module.scss';

function AddUpdateViewPopup({
  title,
  contents,
  isActive,
  popupType,
  xPos,
  yPos,
  useChange,
  onCloseCard,
  onClick
}: TypeAddUpdateViewPopup): React.JSX.Element {
  const divRef = React.useRef(
    null
  ) as React.MutableRefObject<HTMLDivElement | null>;
  const textAreaRef = React.useRef(
    null
  ) as React.MutableRefObject<HTMLTextAreaElement | null>;

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
          <label htmlFor="title">
            Title
            <br />
            <input
              id="title"
              name="title"
              value={`${title}`}
              onChange={useChange}
              disabled={popupType === 'view'}
            />
          </label>
        </div>
        <div className={styles.content}>
          <label htmlFor="contents">
            Contents
            <br />
            <textarea
              name="contents"
              ref={textAreaRef}
              value={`${contents}`}
              onChange={useChange}
              disabled={popupType === 'view'}
            />
          </label>
        </div>
        <div className={styles.contents}>
          <button onClick={onClick}>OK</button>
        </div>
      </div>
    </>
  );
}

interface TypeAddUpdateViewPopup {
  title: string;
  contents: string;
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
  onCloseCard: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

export default AddUpdateViewPopup;
