import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from './redux/useRedux';

export default function useCheckUser(redirectPath: string) {
  const { id } = useAppSelector((state) => state.loginSlice);
  const navi = useNavigate();

  useEffect(() => {
    if (!id) {
      alert('잘못된 접근입니다.');
      navi(redirectPath);
    }
  }, [id]);

  return { id };
}
