/**
 * Classic counter example to help understand the flow of this npm package
 * Usage:
 * import {useCounter} from from "@neko/react-utility-hooks";
 * const ExampleComponent = () => {
 *   const { count, increment, reset, decrement } = useCounter();
 *   return (
 *   <>
 *     <button onClick={increment}>Increment counter</button>
 *     <button onClick={reset}>Reset counter</button>
 *     <button onClick={decrement}>Decrement counter</button>
 *      <p>{count}</p>
 *    </> )}
 *
 * @param initialValue {number} initial counter value
 *
 * @returns count {number} current counter value
 * @returns increment {fn} to increment count value
 * @returns decrement {fn} to decrement count value
 * @returns reset {fn} to reset count value
 */

import { useCallback, useState } from 'react';

type IUseCounter = {
  count: number;
  increment: () => void;
  reset: () => void;
  decrement: () => void;
};

export const useCounter = (initialValue: number = 0): IUseCounter => {
  const [count, setCount] = useState<number>(initialValue);
  const increment = useCallback(() => setCount((value: number) => value + 1), []);
  const decrement = useCallback(() => setCount((value: number) => value - 1), []);
  const reset = useCallback(() => setCount(initialValue), [initialValue]);
  return { count, increment, decrement, reset };
};
