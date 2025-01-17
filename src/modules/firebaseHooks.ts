import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import {
  collection,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  query,
  doc,
  deleteDoc,
  orderBy
} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { auth, db, handleConvertTimestamp } from 'modules/utils';
import { useSetUid } from 'middlewares/reduxToolkits/authSlice';
import { useSetIsLoading } from 'middlewares/reduxToolkits/commonSlice';
import { useSetCatchClauseForErrorPopupHook } from './customHooks';

/**
 * 회원가입
 */
export function useSignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const useSetCatchClauseForErrorPopup = useSetCatchClauseForErrorPopupHook();
  let isSuccess = false;

  const useSignUpHook = useCallback(async (email: string, password: string) => {
    try {
      dispatch(useSetIsLoading({ isLoading: true }));
      await createUserWithEmailAndPassword(auth, email, password);
      isSuccess = true;
    } catch (error: any) {
      useSetCatchClauseForErrorPopup(error);
    } finally {
      dispatch(useSetIsLoading({ isLoading: false }));
      if (isSuccess) navigate('/sign-in');
    }
  }, []);

  return useSignUpHook;
}

/**
 * 로그인
 */
export function useSignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const useSetCatchClauseForErrorPopup = useSetCatchClauseForErrorPopupHook();
  let isSuccess = false;
  let result: any;

  const useSignInHook = useCallback(async (email: string, password: string) => {
    try {
      dispatch(useSetIsLoading({ isLoading: true }));
      result = await signInWithEmailAndPassword(auth, email, password);
      isSuccess = true;
    } catch (error: any) {
      useSetCatchClauseForErrorPopup(error);
    } finally {
      dispatch(useSetIsLoading({ isLoading: false }));
      if (isSuccess) {
        dispatch(useSetUid({ uid: result.user.uid }));
        navigate('/', { replace: true });
      }
    }
  }, []);

  return useSignInHook;
}

/**
 * 로그아웃
 */
export function useSignOut() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const useSetCatchClauseForErrorPopup = useSetCatchClauseForErrorPopupHook();
  let isSuccess = false;

  const useSignOutHook = useCallback(async () => {
    try {
      dispatch(useSetIsLoading({ isLoading: true }));
      await signOut(auth);
      isSuccess = true;
    } catch (error: any) {
      useSetCatchClauseForErrorPopup(error);
    } finally {
      dispatch(useSetIsLoading({ isLoading: false }));
      if (isSuccess) {
        dispatch(useSetUid({ uid: '' }));
        navigate('/', { replace: true });
      }
    }
  }, []);

  return useSignOutHook;
}

/**
 * 인가 확인
 * @param {Function} successCb 성공 콜백
 */
export function useCheckAuthStateChanged(successCb?: () => any) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const useSetCatchClauseForErrorPopup = useSetCatchClauseForErrorPopupHook();
  let isSuccess = false;

  useEffect(() => {
    dispatch(useSetIsLoading({ isLoading: true }));
    onAuthStateChanged(auth, (user) => {
      try {
        if (user) {
          isSuccess = true;
          dispatch(useSetUid({ uid: user.uid }));
        } else throw Error('인가 확인 실패');
      } catch (error: any) {
        dispatch(useSetUid({ uid: '' }));
        useSetCatchClauseForErrorPopup(error, () =>
          navigate('/', { replace: true })
        );
      } finally {
        dispatch(useSetIsLoading({ isLoading: false }));
        if (isSuccess) successCb?.();
      }
    });
  }, []);
}

/**
 * 데이터들 조회
 * @param {string} type 타입
 */
export function useGetDatas(type: string) {
  const dispatch = useDispatch();
  const useSetCatchClauseForErrorPopup = useSetCatchClauseForErrorPopupHook();
  const [datas, setDatas] = useState<any[]>([]);

  const useGetDatasHook = useCallback(async () => {
    try {
      dispatch(useSetIsLoading({ isLoading: true }));

      const datas = await getDocs(
        query(collection(db, type), orderBy('createDt', 'desc'))
      );

      setDatas(
        datas.docs.map((doc) => {
          const { title, createDt, updateDt } = doc.data();

          return {
            id: doc.id,
            title,
            createDt: handleConvertTimestamp(createDt.toDate(), 'yyyy-MM-dd'),
            updateDt
          };
        })
      );
    } catch (error: any) {
      useSetCatchClauseForErrorPopup(error);
    } finally {
      dispatch(useSetIsLoading({ isLoading: false }));
    }
  }, [type, datas]);

  return { datas, useGetDatasHook };
}

/**
 * 단일 데이터 조회
 * @param {string} type 타입
 * @param {string} id id
 * @returns data
 */
export function useGetData(type: string, id: string) {
  const dispatch = useDispatch();
  const useSetCatchClauseForErrorPopup = useSetCatchClauseForErrorPopupHook();
  const [data, setData] = useState<any>(null);

  const useGetDataHook = useCallback(async () => {
    try {
      dispatch(useSetIsLoading({ isLoading: true }));

      const data = await getDoc(doc(db, type, id));

      if (data !== undefined && data.exists()) setData(data.data());
      else throw Error('데이터 조회 실패');
    } catch (error: any) {
      useSetCatchClauseForErrorPopup(error);
    } finally {
      dispatch(useSetIsLoading({ isLoading: false }));
    }
  }, [type, id, data]);

  return { data, useGetDataHook };
}

/**
 * 데이터 추가
 * @param {string} type 타입
 * @returns
 */
export function useAddData(type: string) {
  const dispatch = useDispatch();
  const useSetCatchClauseForErrorPopup = useSetCatchClauseForErrorPopupHook();
  const navigate = useNavigate();
  let isSuccess = false;
  let id = '';

  const useAddDataHook = useCallback(
    async (params: any) => {
      try {
        dispatch(useSetIsLoading({ isLoading: true }));
        id = (await addDoc(collection(db, type), params)).id;
        isSuccess = true;
      } catch (error: any) {
        useSetCatchClauseForErrorPopup(error);
      } finally {
        dispatch(useSetIsLoading({ isLoading: false }));
        if (isSuccess) navigate(`/${type}/${id}`, { replace: true });
      }
    },
    [type]
  );

  return useAddDataHook;
}

/**
 * 데이터 수정
 * @param type 타입
 * @param id 아이디
 * @returns
 */
export function useUpdateData(type: string, id: string) {
  const dispatch = useDispatch();
  const useSetCatchClauseForErrorPopup = useSetCatchClauseForErrorPopupHook();
  const navigate = useNavigate();
  let isSuccess = false;

  const useUpdateDataHook = useCallback(
    async (params: any) => {
      try {
        dispatch(useSetIsLoading({ isLoading: true }));
        await updateDoc(doc(db, type, id), params);
        isSuccess = true;
      } catch (error: any) {
        useSetCatchClauseForErrorPopup(error);
      } finally {
        dispatch(useSetIsLoading({ isLoading: false }));
        if (isSuccess) navigate(`/${type}/${id}`, { replace: true });
      }
    },
    [type, id]
  );

  return useUpdateDataHook;
}

/**
 * 데이터 삭제
 * @param type 타입
 * @param id 아이디
 * @returns
 */
export const useDeleteData = (type: string, id: string) => {
  const dispatch = useDispatch();
  const useSetCatchClauseForErrorPopup = useSetCatchClauseForErrorPopupHook();
  const navigate = useNavigate();
  let isSuccess = false;

  const useDeleteDataHook = useCallback(async () => {
    try {
      dispatch(useSetIsLoading({ isLoading: true }));
      await deleteDoc(doc(db, type, id));
      isSuccess = true;
    } catch (error: any) {
      useSetCatchClauseForErrorPopup(error);
    } finally {
      dispatch(useSetIsLoading({ isLoading: false }));
      if (isSuccess) navigate(`/${type}`, { replace: true });
    }
  }, [type, id]);

  return useDeleteDataHook;
};
