import * as React from "react";
import { useActions } from "typeless";
import { CounterActions, getCounterState } from "@features/counter/interface";

export const Counter = (): JSX.Element => {
  const { startCount } = useActions(CounterActions);
  const { isLoading, count } = getCounterState.useState();

  return (
    <div>
      <button disabled={isLoading} onClick={startCount}>
        {isLoading ? "loading..." : "increase"}
      </button>
      <div>count: {count}</div>
    </div>
  );
};
