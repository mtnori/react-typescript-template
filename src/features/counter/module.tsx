import * as React from "react";
import * as Rx from "typeless/rx";
import {
  CounterActions,
  CounterState,
  useModule,
} from "@features/counter/interface";
import { Counter } from "@features/counter/components/Counter";

useModule
  .epic()
  .on(CounterActions.startCount, () =>
    Rx.of(CounterActions.countDone(1)).pipe(Rx.delay(500))
  );

const initialState: CounterState = {
  isLoading: false,
  count: 0,
};

useModule
  .reducer(initialState)
  .on(CounterActions.startCount, (state) => {
    state.isLoading = true;
  })
  .on(CounterActions.countDone, (state, { count }) => {
    state.isLoading = false;
    state.count += count;
  });

const CounterModule = (): JSX.Element => {
  useModule();
  return <Counter />;
};
export default CounterModule;
