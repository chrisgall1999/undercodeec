import React from 'react';
import { Link } from 'gatsby';
import chooseUsData from 'data/Saas/choose-us.json';
import chooseUsDataRTL from 'data/Saas/choose-us-rtl.json';

const ChooseUs = ({ rtl }) => {
  const ChooseUsData = rtl ? chooseUsDataRTL : chooseUsData;

  return (
    <section className="choose-us style-6">
      <div className="container">
        <div className="row justify-content-between gx-0">
          <div className="col-lg-6">
            <div className="img">
              <img src="/assets/img/choose_us/bannerservicios.webp" alt="" />
            </div>
          </div>
          <div className="col-lg-4">
            <div className="info">
              <div className="section-head mb-30 style-5">
                <h2>{ rtl ? '' : 'Nuestros' } <span>{ rtl ? 'خدماتنا' : 'Servicios' }</span> </h2>
              </div>
              
              <ul>
                {
                  ChooseUsData.map((item, index) => (
                    <li className={`d-flex ${index !== ChooseUsData.length - 1 ?'mb-40':''}`} key={index}>
                      <small className="icon-50 me-4 flex-shrink-0">
                        <img src={item.icon} alt="" />
                      </small>
                      <div className="inf">
                        <h5>{ item.info }</h5>
                        <p className="fs-12px color-666 mt-2">
                          { item.details }
                        </p>
                      </div>
                    </li>
                  ))
                }
              </ul>
              <Link to={ rtl ? "/rtl-page-services" : "/servicios" } className="btn rounded-pill blue5-3Dbutn hover-blue2 sm-butn fw-bold mt-60 px-5">
                <span>{ rtl ? 'مشاهدة المزيد' : 'Saber Mas' }</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <img src="/assets/img/about/about_s6_bubbles.png" alt="" className="bubbles rotate-center" />
    </section>
  )
}

export default ChooseUs