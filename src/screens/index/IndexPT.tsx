/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import styles from './Index.module.scss';

function IndexPT({
  uid,
  onSignOut,
  onMovePage
}: IndexPTProps): React.JSX.Element {
  return (
    <div className={styles.wrap}>
      <div className={styles.signBtns}>
        {uid !== undefined && uid !== null && uid !== '' ? (
          <button onClick={onSignOut}>Sign Out</button>
        ) : (
          <>
            <button onClick={() => onMovePage('/sign-in')}>Sign In</button>
            {/* <button onClick={() => onMovePage('/sign-up')}>Sign Up</button> */}
          </>
        )}
      </div>
      <h1>English Study</h1>
      <div className={styles.buttons}>
        <div>
          <button onClick={() => onMovePage('/diary/list')}>Diary</button>
        </div>
        <div>
          <button onClick={() => onMovePage('/making-use-of/list')}>
            Making Use Of
          </button>
        </div>
        <div>
          <button onClick={() => onMovePage('/spoken-language/list')}>
            Spoken Language
          </button>
        </div>
        <div>
          <button onClick={() => onMovePage('/vocabulary/list')}>
            Vocabulary
          </button>
        </div>
        <div>
          <button onClick={() => onMovePage('/hard-to-speak-phrase/list')}>
            Hard To Speak Phrase
          </button>
        </div>
        <div>
          <button onClick={() => onMovePage('/spontaneous-writing/list')}>
            Spontaneous Writing
          </button>
        </div>
      </div>
    </div>
  );
}

interface IndexPTProps {
  uid?: string;
  onSignOut: () => Promise<void>;
  onMovePage: (path: string) => void;
}

export default IndexPT;
