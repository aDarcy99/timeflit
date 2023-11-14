import React, { useEffect, useState } from 'react';

type Props = {};

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState<{ width: number; height: number } | null>(null);

  useEffect(() => {
    const getWindowDimensions = () => {
      let width = window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth;
      let height = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;

      setWindowDimensions({ width, height });
    };

    window.addEventListener('resize', getWindowDimensions);

    return () => {
      window.removeEventListener('resize', getWindowDimensions);
    };
  }, []);

  return windowDimensions;
}

export default useWindowDimensions;
