import { useRef } from "react";

export type NextId = () => number;

export function useNextId(): NextId {
  const idRef = useRef(0);

  return () => {
    idRef.current += 1;
    return idRef.current;
  };
}
