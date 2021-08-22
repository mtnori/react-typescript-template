import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { DefaultTypelessProvider } from 'typeless';
import { SubComponent } from '@components/sub-component';
import CounterModule from 'features/counter/module';

const App = () => (
  <div>
    <h1>Hello React!</h1>
    <SubComponent name="My Counter for TypeScript" />
    <CounterModule />
  </div>
);

ReactDOM.render(
  <DefaultTypelessProvider>
    <App />
  </DefaultTypelessProvider>,
  document.querySelector('#app'));