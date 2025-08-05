
import React, { useState } from 'react';
import './DemoVideos.css';

const videos = [
  {
    title: 'AI for Salg',
    description: 'Hvordan AI-agenter øker konverteringer.',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
  {
    title: 'AI for Markedsføring',
    description: 'Generativ AI for effektivt innhold.',
    url: 'https://www.youtube.com/embed/Zi_XLOBDo_Y',
  },
];

export default function DemoVideos() {
  const [index, setIndex] = useState(0);
  const video = videos[index];

  return (
    <section className="demo-videos">
      <div className="left">
        <h2>{video.title}</h2>
        <p>{video.description}</p>
        <div className="video-nav">
          <button onClick={() => setIndex(i => Math.max(0, i - 1))} disabled={index === 0}>‹</button>
          <span>{index + 1}/{videos.length}</span>
          <button onClick={() => setIndex(i => Math.min(videos.length - 1, i + 1))} disabled={index === videos.length - 1}>›</button>
        </div>
      </div>
      <div className="right">
        <div className="video-wrapper">
        
        <iframe
  src={`https://www.youtube.com/embed/${demoVideos[current].id}?rel=0&modestbranding=1&controls=1&showinfo=0`}
  title={demoVideos[current].title}
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
/>
        </div>
      </div>
    </section>
  );
}
