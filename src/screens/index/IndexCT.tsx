import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignOut } from 'modules/firebaseHooks';
import { AuthState } from 'middlewares/reduxToolkits/authSlice';
import { ttsInit } from 'modules/ttsUtils';
import IndexPT from './IndexPT';

function IndexCT({ uid }: IndexCTProps): React.JSX.Element {
  const navigate = useNavigate();
  const useSignOutHoot = useSignOut();

  useEffect(() => {
    ttsInit();
  }, []);

  const handleMovePage = (path: string) => navigate(path);

  return (
    <IndexPT uid={uid} onSignOut={useSignOutHoot} onMovePage={handleMovePage} />
  );
}

interface IndexCTProps extends AuthState {}

export default IndexCT;
