import { useCallback, useEffect, useState } from 'react';

const useResendTimer = (initialTime: number = 90, maxResends: number = 3) => {
  const [timer, setTimer] = useState(initialTime);
  const [resendCount, setResendCount] = useState(0);

  const handleResend = useCallback(() => {
    if (timer === 0 && resendCount < maxResends) {
      setTimer(initialTime);
      setResendCount((prev) => prev + 1);
      return true;
    }
    return false;
  }, [timer, resendCount, maxResends, initialTime]);

  useEffect(() => {
    let interval: number;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  return {
    timer,
    resendCount,
    handleResend,
    canResend: timer === 0 && resendCount < maxResends,
  };
};

export default useResendTimer;
