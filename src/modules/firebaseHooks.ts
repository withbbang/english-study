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
import {
  useSetCancelBtnCb,
  useSetConfirmBtnCb,
  useSetIsConfirmPopupActive,
  useSetIsLoading,
  useSetMessage
} from 'middlewares/reduxToolkits/commonSlice';
import { useSetCatchClauseForErrorPopupHook } from './customHooks';

/**
 * [회원가입]
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
 * [로그인]
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
 * [로그아웃]
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
 * [인가 확인]
 *
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
        } else throw Error('Failed to check auth');
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
 * [데이터들 조회]
 *
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
 * [단일 데이터 조회]
 *
 * @returns data
 */
export function useGetData() {
  const dispatch = useDispatch();
  const useSetCatchClauseForErrorPopup = useSetCatchClauseForErrorPopupHook();
  const [data, setData] = useState<any>(null);

  const useGetDataHook = useCallback(
    async (type: string, id: string) => {
      try {
        dispatch(useSetIsLoading({ isLoading: true }));

        const data = await getDoc(doc(db, type, id));

        if (data !== undefined && data.exists()) setData(data.data());
        else throw Error('Failed to get data');
      } catch (error: any) {
        useSetCatchClauseForErrorPopup(error);
      } finally {
        dispatch(useSetIsLoading({ isLoading: false }));
      }
    },
    [data]
  );

  return { data, useGetDataHook };
}

/**
 * [데이터 추가]
 *
 * @param {Function | undefined} successCb 성공 콜백
 * @returns
 */
export function useAddData(successCb?: Function) {
  const dispatch = useDispatch();
  const useSetCatchClauseForErrorPopup = useSetCatchClauseForErrorPopupHook();
  let isSuccess = false;

  const useAddDataHook = useCallback(async (params: any) => {
    try {
      dispatch(useSetIsLoading({ isLoading: true }));
      await addDoc(collection(db, params.type), params);
      isSuccess = true;
    } catch (error: any) {
      useSetCatchClauseForErrorPopup(error);
    } finally {
      dispatch(useSetIsLoading({ isLoading: false }));
      if (isSuccess) successCb?.();
    }
  }, []);

  return useAddDataHook;
}

/**
 * [데이터 수정]
 *
 * @param {Function | undefined} successCb 성공 콜백
 * @returns
 */
export function useUpdateData(successCb?: Function) {
  const dispatch = useDispatch();
  const useSetCatchClauseForErrorPopup = useSetCatchClauseForErrorPopupHook();
  let isSuccess = false;

  const useUpdateDataHook = useCallback(async (params: any) => {
    try {
      dispatch(useSetIsLoading({ isLoading: true }));
      await updateDoc(doc(db, params.type, params.id), params);
      isSuccess = true;
    } catch (error: any) {
      useSetCatchClauseForErrorPopup(error);
    } finally {
      dispatch(useSetIsLoading({ isLoading: false }));
      if (isSuccess) successCb?.();
    }
  }, []);

  return useUpdateDataHook;
}

/**
 * [데이터 삭제]
 *
 * @param {Function | undefined} successCb 성공 콜백
 * @returns
 */
export const useDeleteData = (successCb?: Function) => {
  const dispatch = useDispatch();
  const useSetCatchClauseForErrorPopup = useSetCatchClauseForErrorPopupHook();
  let isSuccess = false;

  const useDeleteDataHook = useCallback(async (type: string, id: string) => {
    try {
      dispatch(useSetIsLoading({ isLoading: true }));
      await deleteDoc(doc(db, type, id));
      isSuccess = true;
    } catch (error: any) {
      useSetCatchClauseForErrorPopup(error);
    } finally {
      dispatch(useSetIsLoading({ isLoading: false }));
      if (isSuccess) successCb?.();
    }
  }, []);

  return useDeleteDataHook;
};

/**
 * [데이터 추가 팝업 훅]
 *
 * @param confirmBtnCb 성공 콜백
 * @returns
 */
export const useAddPopup = (confirmBtnCb: (params?: any) => any) => {
  const dispatch = useDispatch();
  const useSetCatchClauseForErrorPopup = useSetCatchClauseForErrorPopupHook();
  let isSuccess = false;

  const useAddPopupHook = useCallback(async (type: string, params?: any) => {
    dispatch(useSetMessage({ message: 'Are you sure you wanna add?' }));
    dispatch(useSetIsConfirmPopupActive({ isConfirmPopupActive: true }));

    dispatch(
      useSetConfirmBtnCb({
        useConfirmBtnCb: async () => {
          try {
            dispatch(useSetIsLoading({ isLoading: true }));
            await addDoc(collection(db, type), params);
            isSuccess = true;
            dispatch(
              useSetIsConfirmPopupActive({ isConfirmPopupActive: false })
            );
            dispatch(useSetConfirmBtnCb({}));
            dispatch(useSetCancelBtnCb({}));
          } catch (error: any) {
            useSetCatchClauseForErrorPopup(error);
          } finally {
            dispatch(useSetIsLoading({ isLoading: false }));
            if (isSuccess) confirmBtnCb?.();
          }
        }
      })
    );

    dispatch(
      useSetCancelBtnCb({
        useCancelBtnCb: () => {
          dispatch(useSetIsConfirmPopupActive({ isConfirmPopupActive: false }));
          dispatch(useSetMessage({ message: '' }));
          dispatch(useSetConfirmBtnCb({}));
          dispatch(useSetCancelBtnCb({}));
        }
      })
    );
  }, []);

  return useAddPopupHook;
};

// export const useDeletePopup = (confirmBtnCb: Function) => {
//   const dispatch = useDispatch();
//   const useSetCatchClauseForErrorPopup = useSetCatchClauseForErrorPopupHook();
//   let isSuccess = false;
// };
