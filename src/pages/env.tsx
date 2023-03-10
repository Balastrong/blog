import React from "react";

const Env = () => {
  const hello = process.env.GATSBY_HELLO_ENV;
  return (
    <div>
      <h1>Env</h1>
      <p>{hello}</p>
    </div>
  );
};

export default Env;
