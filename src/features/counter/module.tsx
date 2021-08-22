import * as React from 'react';
import * as Rx from 'typeless/rx';
import { CounterActions, CounterState, useModule } from "./interface";
import { Counter } from './components/Counter';

useModule
  .epic()
  .on(CounterActions.startCount, () =>
    Rx.of(CounterActions.countDone(1)).pipe(Rx.delay(500))
  );

const initialState: CounterState = {
  isLoading: false,
  count: 0
};

useModule
  .reducer(initialState)
  .on(CounterActions.startCount, state => {
    state.isLoading = true;
  })
  .on(CounterActions.countDone, (state, { count }) => {
    state.isLoading = false;
    state.count += count;
  });

const CounterModule = () => {
  useModule();
  return (
    <Counter />
  );
};
export default CounterModule;