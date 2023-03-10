import React from "react";

const SSR = ({ serverData }: any) => {
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
