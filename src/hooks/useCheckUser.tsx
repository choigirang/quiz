import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from './redux/useRedux';

export default function useCheckUser(redirectPath: string) {
  const { id } = useAppSelector((state) => state.loginSlice);
  const { stack } = useAppSelector((state) => state.selectStackSlice);
  const navi = useNavigate();

  useEffect(() => {
    if (!id || !stack) {
      alert('잘못된 접근입니다.');
      navi(redirectPath);
    }
  }, [id, stack]);

  return { id, stack };
}
