import { useEffect } from "react";

export const useInterval = (callback: Function, interval: number) => {
  useEffect(() => {
    const id = window.setInterval(callback, interval);
    return () => window.clearInterval(id);
  }, []);
};
