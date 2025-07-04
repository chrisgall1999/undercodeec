import React from 'react';
import { Link } from 'gatsby';
import plans from 'data/App/plans.json';
import plansRTL from 'data/App/plans-rtl.json';
import ReactGA from 'react-ga4';
/* global fbq */ // <-- Esto le dice a ESLint que 'fbq' existe en el entorno global



const Pricing = ({ rtl }) => {
  const data = rtl ? plansRTL : plans;

  const handleWhatsappClick = (planName, price) => {
    // Evento para Google Analytics
    ReactGA.event({
      category: 'Botón Saber Más',
      action: 'Clic en WhatsApp',
      label: `${planName} - ${price}`
    });
  
    // Evento para Meta Pixel (Lead)
    if (typeof fbq !== 'undefined') {
      fbq('track', 'Lead', {
        content_name: planName,
        value: parseFloat(price.replace(/[^\d.]/g, '')),
        currency: 'USD'
      });
    }
  };
  


  return (
    <section className="pricing section-padding style-4 pb-50" data-scroll-index="6">
      <div className="container">
        <div className="section-head text-center style-4">
          <small className="title_small">{rtl ? 'خطة الاسعار' : 'Mejores Precios'}</small>
          <h2 className="mb-30">{rtl ? 'ابدأ بـ' : 'Empezar con'} <span> {rtl ? 'سعر مناسب' : 'Precio asequible'} </span> </h2>
        </div>
        <div className="content">

          <div className="row gx-0">
            {
              data.map((plan, index) => (
                <div className="col-lg-6" key={index}>
                  <div className="price-card">
                    <div className="price-header pb-4">
                      <h6> <img src={plan.image} alt="" className="icon" /> {plan.title} </h6>
                      <h2>{plan.price} </h2>
                      <p>{plan.description}</p>
                    </div>
                    <div className="price-body py-4">
                      <ul>
                        {
                          plan.features.map((feature, i) => (
                            <li className={`d-flex align-items-center mb-3 ${feature.active ? '' : ' op-3'}`} key={i}>
                              <small className="icon-30 bg-blue4 rounded-circle text-white d-inline-flex align-items-center justify-content-center me-3 flex-shrink-0">
                                <i className={feature.icon}></i>
                              </small>
                              <p className="fw-bold">{feature.title}</p>
                            </li>
                          ))
                        }
                      </ul>
                      <a
                        onClick={() => handleWhatsappClick(plan.title, plan.price)}
                        href={`https://wa.me/593979046329?text=${encodeURIComponent(
                          index === 0
                            ? '👋 ¡Hola! Estoy interesado en obtener más información sobre el 📱 *Plan Mensual de $150* para la aplicación móvil. ¿Podrías brindarme más detalles? 🙏'
                            : '👋 ¡Hola! Quisiera saber más sobre el 💼 *Plan Premium de $1200* para la aplicación móvil. ¿Podrías proporcionarme información adicional? 🙏'
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`btn rounded-pill ${index === 0 ? 'border-blue4' : 'bg-blue4'} hover-blue4 fw-bold mt-50 px-5 ${index === 0 ? 'border-blue4' : 'text-white'}`}
                      >
                        <small>{rtl ? 'سجل الان' : 'Saber Más'} 📲</small>
                      </a>




                    </div>
                    {
                      plan.off &&
                      <div className="off">
                        <span>
                          {plan.off} <br /> {rtl ? 'خصم' : 'DSC'}
                        </span>
                      </div>
                    }
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </section>
  )
}

export default Pricing