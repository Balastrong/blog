import React from "react";

const Env = ({
  serverData,
}: {
  serverData: {
    hello: string;
  };
}) => {
  console.log("serverData", serverData);

  return (
    <div>
      <h1>Env</h1>
      <p>--{serverData?.hello}--</p>
    </div>
  );
};

export default Env;

export const getServerData = async () => {
  const hello = process.env.GATSBY_HELLO_ENV;

  return {
    props: {
      foo: "bar",
      hello,
    },
  };
};
