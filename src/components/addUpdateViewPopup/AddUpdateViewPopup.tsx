import React, { useEffect } from 'react';
import { TypeKeyValueForm } from 'modules/types';
import { useChangeHook } from 'modules/customHooks';
import styles from './AddUpdateViewPopup.module.scss';

function AddUpdateViewPopup({
  isActive,
  popupType,
  xPos,
  yPos,
  onClick
}: TypeAddUpdateViewPopup): React.JSX.Element {
  const divRef = React.useRef(
    null
  ) as React.MutableRefObject<HTMLDivElement | null>;
  const textAreaRef = React.useRef(
    null
  ) as React.MutableRefObject<HTMLTextAreaElement | null>;

  const { form, setForm, useChange } = useChangeHook({
    title: '',
    url: '',
    description: ``,
    category: 0,
    degreeOfUnderstanding: 20,
    bookmark: 'N'
  });

  React.useEffect(() => {
    if (isActive) {
      handleActivePopup();
    } else {
      handleInActivePopup();
    }
  }, [isActive]);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [form.description]);

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
        onClick={(e) => onClick(e)}
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
              value={`${form.title}`}
              onChange={useChange}
              disabled={popupType === 'view'}
            />
          </label>
        </div>
        <div className={styles.content}>
          <label htmlFor="description">
            Description
            <br />
            <textarea
              name="description"
              ref={textAreaRef}
              value={`${form.description}`}
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
  isActive: boolean;
  popupType?: string;
  xPos?: number;
  yPos?: number;
  onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

export default AddUpdateViewPopup;
