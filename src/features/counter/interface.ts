import { createModule } from "typeless";
import { CounterSymbol } from "@features/counter/symbol";

export const [useModule, CounterActions, getCounterState] = createModule(
  CounterSymbol
)
  .withActions({
    startCount: null,
    countDone: (count: number) => ({ payload: { count } }),
  })
  .withState<CounterState>();

export interface CounterState {
  isLoading: boolean;
  count: number;
}
