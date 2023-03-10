import { Card } from "components";
import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";

import "./VideoThumb.scss";
import { YouTubeVideo } from "types/youtube";

export function VideoThumb({ video }: { video: YouTubeVideo }) {
  const title = video.snippet.title;
  const image = video.snippet.thumbnails.medium.url;
  const url = `https://www.youtube.com/watch?v=${video.id.videoId}`;
  const date = new Date(video.snippet.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <a href={url} className="VideoThumb" target="_blank">
      <Card>
        <article className="VideoThumb_content">
          {image && (
            <div className="VideoThumb_image">
              <img src={image} alt={title} className="VideoThumb_img" />
            </div>
          )}
          <h4 className="VideoThumb_title">{title}</h4>
          <small>{date}</small>
        </article>
      </Card>
    </a>
  );
}
