import {useEffect, useState} from "react";

interface UsePlatformReturnValue {
  platform: 'mobile' | 'browser' | 'desktop';
}

const usePlatform = (): UsePlatformReturnValue => {
  const [isMobile, setIsMobile] = useState<boolean>(undefined);

  useEffect(() => {
    setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
  }, []);

  return { platform: isMobile === undefined ? undefined : isMobile ? 'mobile' : 'browser' }
};

export default usePlatform;
