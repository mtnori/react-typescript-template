import React from "react";

interface IProps {
  name: string;
}

export const SubComponent = (props: IProps): JSX.Element => {
  const [count, setCount] = React.useState(0);
  const handleClick = () => {
    console.log("クリックされました");
    setCount(count + 1);
  };
  return (
    <div>
      <h2>{props.name}</h2>
      <div>{count}</div>
      <button onClick={handleClick}>Add + 1</button>
    </div>
  );
};
