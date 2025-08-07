
import React, { useRef, useState } from 'react';
import './DemoShowcase.css';

const DemoShowcase = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleVideoClick = () => {
    if (!videoRef.current) return;

    if (videoRef.current.paused || videoRef.current.ended) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section className="demo-show">
      <h2 className="demo-heading">Møt ditt nye markedsføringslag.</h2>

      <div className="device-row">
        <div className="phone-frame">
          <img src="/images/mobilephone-right.png" alt="App-skjerm" />
        </div>

        <div className="laptop-frame">
          <div className="video-wrapper">
            <video
              ref={videoRef}
              className="demo-video"
              src="/videos/demo_n60_final.mp4"
              poster="/images/laptop-poster.png"
              playsInline
              onClick={handleVideoClick}
            />
            {!isPlaying && (
              <button className="video-overlay-button" onClick={handleVideoClick}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="white">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
            
            )}
          </div>
          <div className="laptop-base" />
        </div>

        <div className="phone-frame">
          <img src="/images/mobilephone-left.png" alt="App-skjerm" />
        </div>
      </div>

      <p className="demo-caption">
       Fra skreddersydd skjema, AI-innholds­motor og
        lead-scoring, til dashboard og automatisert utsendelse.
      </p>
    </section>
  );
};

export default DemoShowcase;
