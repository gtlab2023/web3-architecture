import { Draft, freeze, produce } from 'immer';
import { useCallback, useState } from 'react';

export type DraftFunction<S> = (draft: Draft<S>) => void;
export type ImmerHook<S> = [S, (updater: S | DraftFunction<S>) => void];
// 函数签名 函数实现要紧跟着函数签名
export function useImmer<S = unknown>(intialValue: S | (() => S)): ImmerHook<S>;
export function useImmer<T>(intialValue: T) {
  // freeze原来初始化的对象 不能动了
  const [val, updateValue] = useState(() =>
    freeze(typeof intialValue === 'function' ? intialValue() : intialValue),
  );
  return [
    val,
    useCallback((updater: T | DraftFunction<T>) => {
      if (typeof updater === 'function') {
        // 这里是produce的函数柯里化用法
        updateValue(produce(updater as DraftFunction<T>));
      } else {
        updateValue(freeze(updater));
      }
    }, []),
  ];
}
