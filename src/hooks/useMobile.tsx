import { useEffect, useState, useCallback } from 'react';

/** 2024/06/14 - 화면에 따른 mobile 훅 */
export default function useMobile() {
  const [isMobile, setMobile] = useState(window.innerWidth < 640);
  const [isTablet, setTablet] = useState(window.innerWidth >= 641 && window.innerWidth <= 1024);

  const handleResize = useCallback(() => {
    const width = window.innerWidth;
    setMobile(width < 640);
    setTablet(width >= 641 && width <= 1024);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  return { isMobile, isTablet };
}
