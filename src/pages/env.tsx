import React from "react";

const Env = ({
  serverData: { hello },
}: {
  serverData: {
    hello: string;
  };
}) => {
  return (
    <div>
      <h1>Env</h1>
      <p>--{hello}--</p>
    </div>
  );
};

export default Env;

export const getServerData = async () => {
  const hello = process.env.GATSBY_HELLO_ENV;

  return {
    props: {
      hello,
    },
  };
};
