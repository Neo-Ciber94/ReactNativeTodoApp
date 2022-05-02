import { useRef } from "react";

export type NextCount = () => number;

export function useCounter(): NextCount {
  const countRef = useRef(0);

  return () => {
    countRef.current += 1;
    return countRef.current;
  };
}
