import * as React from 'react';

interface IProps {
  name: string;  
}

interface IState {
  count: number;
}

export const SubComponent = (props: IProps, state: IState) => {
  const [count, setCount] = React.useState(0);
  const handleClick = () => {
    console.log('クリックされました');
    setCount(count + 1)
  };
  return (
    <div>
      <h2>{props.name}</h2>
      <div>{state.count}</div>
      <button onClick={handleClick}>Add + 1</button>
    </div>
  );
};