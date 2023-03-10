import React from "react";

const SSR = ({ serverData }) => {
  return (
    <div>
      <h1>SSR</h1>
      <p>{serverData.foo}</p>
    </div>
  );
};

export default SSR;

export const getServerData = async () => {
  return {
    props: {
      foo: "bar",
    },
  };
};
