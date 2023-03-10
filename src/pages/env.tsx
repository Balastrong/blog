import { getVideos } from "libs";
import React from "react";

const Env = ({ serverData }: any) => {
  console.log("serverData", serverData);

  return (
    <div>
      <h1>Env</h1>
      <p>AAA{JSON.stringify(serverData)}AAA</p>
      {serverData.videos.map((video: any) => (
        <div key={video.id.videoId}>
          <p>{video.snippet.title}</p>
        </div>
      ))}
    </div>
  );
};

export default Env;

export const getServerData = async () => {
  const videos = await getVideos();
  return {
    props: {
      foo: "bar",
      env: process.env.GATSBY_HELLO_ENV,
      videos,
    },
  };
};
