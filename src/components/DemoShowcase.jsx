
import React from 'react';
import './DemoShowcase.css';

const DemoShowcase = () => {
  return (
    <section className="demo-show">
      <h2 className="demo-heading">Møt ditt nye markedsføringslag.</h2>

      <div className="device-row">
        <div className="phone-frame">
          <img src="/images/mobilephone-right.png" alt="App-skjerm" />
        </div>

        <div className="laptop-frame">
          <div className="image-wrapper">
            <img 
              src="/images/laptop-poster.png" 
              alt="Dashboard preview" 
              className="demo-image"
            />
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
