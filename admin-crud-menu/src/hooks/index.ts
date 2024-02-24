import { EffectCallback, DependencyList, useCallback, useEffect, useRef } from "react";

export const useIsFirstRender = (): boolean => {
  const isFirst = useRef(true)

  if (isFirst.current) {
      isFirst.current = false

      return true
  }

  return isFirst.current
}

export const useDebounceEffect = (effect: EffectCallback, deps: DependencyList, delay = 300) => {
  const callback = useCallback(effect, deps);

  useEffect(() => {
    const timeout = setTimeout(callback, delay);
    return () => clearTimeout(timeout);
  }, [callback, delay]);
}

export const useUpdateEffect = (effect: EffectCallback, deps?: DependencyList) => {
  const isFirst = useIsFirstRender()

  useEffect(() => {
      if (!isFirst) {
          return effect()
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}