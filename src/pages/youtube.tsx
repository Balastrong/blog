import { Layout, Seo } from "components";

import React from "react";

const YouTube = () => {
  return (
    <Layout section="youtube">
      <h2>My YouTube Journey</h2>
      <p>
        Appearing on camera and talking about Open Source and technical stuff in
        general wasn't really my first thought!
      </p>

      <h4>Early days</h4>
      <p>
        When I was around 16 years old I started uploading "gamplay" videos of
        the browser games I was playing at that time. Free screen recorder and
        background music.
      </p>

      <h4>Game Development</h4>
      <p>
        The channel remained silent for roughly 6 years, then Covid hit and like
        many others I had to find something to do during the forced time at
        home.
      </p>
      <p>
        It's December 2020, Italy is once again in full lockdown and I'm
        learning by myself some bits of Game Development. You know what would be
        interesting? Recording videos of what I was learning step by step and
        sharing them on YouTube.
      </p>
      <p>
        I noticed that in order to prepare a video on a specific topic
        explaining it, I had to study it even deeper! It was a win-win situation
        since GameDev was also trending!
      </p>
      <p>
        I uploaded a dozen videos in two months, then lockdown ended and I
        suddenly lost the motivation to keep going. What a shame :(
      </p>
      <h4>A new, new beginning</h4>
      <p>
        In the meantime I changed job and I found a workplace with an amazing
        open minded culture, where all individuals have time and space to
        express themselves. This gave me the opportunity to look closer at the
        Open Source world.
      </p>
      <h4>Open Source</h4>
      <p>
        What I was doing for Game Development, learning and sharing, I could do
        with Open Source!
      </p>
      <p>
        I started to contribute to Open Source projects, share the knowledge I
        was acquiring on blog posts and those posts automatically became the
        scripts for YouTube videos. How convenient!
      </p>
      <p>
        Today in my channel I talk about Open Source, and I mix it with Web
        Development as I'm currently working as a Frontend developer.
      </p>
      <p>
        If you're interested, come have a look. You can find me with the name{" "}
        <a href="https://www.youtube.com/c/DevLeonardo" target="_blank">
          Dev Leonardo
        </a>
        .
      </p>
      <p>
        Thank you for reading these few lines, I hope you enjoyed them and I
        hope to see you on my channel!
      </p>
    </Layout>
  );
};

export default YouTube;

export const Head = () => <Seo title="YouTube" />;
