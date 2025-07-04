import React, { useState } from 'react';
import ModalVideo from "react-modal-video";
import testimonialsData from 'data/App/testimonials.json';
import testimonialsDataRTL from 'data/App/testimonials-rtl.json';
import "react-modal-video/css/modal-video.css";
import ReactGA from 'react-ga4';

const handleIframeClick = (nombreDemo) => {
  ReactGA.event({
    category: 'Demo Figma',
    action: 'Interacción con iframe',
    label: nombreDemo
  });
};


const Testimonials = ({ rtl }) => {
  const [isOpen, setOpen] = useState(false);
  const data = rtl ? testimonialsDataRTL : testimonialsData;

  const openVideo = (e) => {
    e.preventDefault();
    setOpen(true);
  }

  return (
    <section id="portafolio" className="testimonials style-4 pt-70" data-scroll-index="5">
      <div className="section-head text-center style-4">
        <h2 className="mb-70"> <span> {rtl ? 'رائعة' : 'Portafolio de Proyectos'} </span> </h2>
      </div>

      {/* Sección para el iframe de Figma */}
      <div className="d-flex flex-wrap justify-content-center gap-4 mt-5">
        {/* Techni Help Demo */}
        <div className="iframe-container">
          <iframe
            style={{ border: '1px solid rgba(0, 0, 0, 0.1)' }}
            width="100%"
            height="450"
            src="https://embed.figma.com/proto/4qQ45FdE4pRC7jhbWQmPsO/Aplicacion-Techni-Help-Demo--Community-?node-id=76-74&p=f&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A2&show-proto-sidebar=1&embed-host=share"
            allowFullScreen
          ></iframe>
        </div>

        {/* Restaurante App Demo */}
        <div className="iframe-container">
          <iframe
            style={{ border: '1px solid rgba(0, 0, 0, 0.1)' }}
            width="100%"
            height="450"
            src="https://embed.figma.com/proto/EZkEOnTlJBVg6gykhUtf2V/Restaurante-App-Demo?node-id=3-2&p=f&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=3%3A2&show-proto-sidebar=1&embed-host=share"
            allowFullScreen
          ></iframe>
        </div>
      </div>





      <div className="container">
        <div className="content">
          <div className="row">
            <div className="col-lg-5">
              <div className="section-head style-4">
                <small className="title_small">{rtl ? 'اراء العملاء' : 'Testimonios'}</small>
                <h2 className="mb-30">{rtl ? 'محبوب من' : 'Historias'} <span>{rtl ? 'العملاء' : 'Reales'}</span></h2>
              </div>
              <p className="text mb-40">
              </p>
              <div className="numbs">
                {
                  data.numCards.map((card, index) => (
                    <div className="num-card" key={index}>
                      <div className="icon img-contain">
                        <img src={card.image} alt="" />
                      </div>
                      <h2>{card.value}</h2>
                      {
                        card.stars &&
                        <div className="stars">
                          {Array(card.stars).fill().map((_, i) => <i className="fas fa-star" key={i}></i>)}
                        </div>
                      }
                      <p>{typeof card.type === 'string' ? card.type : (<>{card.type.text1} <br /> {card.type.text2}</>)}</p>
                    </div>
                  ))
                }
              </div>

            </div>
            <div className="col-lg-7">
              <div className="testi-cards">
                {
                  data.testiCards.map((card, index) => (
                    <div className="client_card" key={index}>
                      <div className="user_img">
                        <img src={card.userImg} alt="" />
                      </div>
                      <div className="inf_content">
                        <div className="stars mb-2">
                          {Array(card.stars).fill().map((_, i) => <i className="fas fa-star" key={i}></i>)}
                        </div>
                        <h6>
                          {typeof card.title === 'string' ? card.title : (<>{card.title.text1} <br /> {card.title.text2}</>)}
                        </h6>
                        <p>{card.author.name} <span className="text-muted"> /  {card.author.position} {rtl ? 'في' : ''} <span>{card.author.company}</span> </span></p>
                      </div>
                    </div>
                  ))
                }
                <img src="/assets/img/contact_globe.svg" alt="" className="testi-globe" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {
        typeof window !== "undefined" &&
        (
          <ModalVideo
            channel="youtube"
            autoplay
            isOpen={isOpen}
            videoId="pGbIOC83-So"
            onClose={() => setOpen(false)}
          />
        )
      }
    </section>
  )
}

export default Testimonials