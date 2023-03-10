import React from "react";

const Env = ({ serverData }: any) => {
  console.log("serverData", serverData);

  return (
    <div>
      <h1>Env</h1>
      <p>AAA{JSON.stringify(serverData)}AAA</p>
    </div>
  );
};

export default Env;

export const getServerData = async () => {
  return {
    props: {
      foo: "bar",
      env: process.env.GATSBY_HELLO_ENV,
    },
  };
};
