
import React, { useEffect } from 'react';
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';
import './DemoVideoPlayer.css';

const DemoVideoPlayer = () => {
  useEffect(() => {
    const player = new Plyr('#player', {
      autoplay: true,
      muted: true,
      loop: { active: true },
      controls: ['play', 'progress', 'mute', 'fullscreen'],
    });
  }, []);

  return (
    <div className="demo-video-wrapper">
      <video id="player" playsInline controls>
        <source src="/videos/ai-demo-1.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default DemoVideoPlayer;
