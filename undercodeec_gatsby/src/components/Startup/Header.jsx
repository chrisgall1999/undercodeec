import React from 'react';
import Navbar from 'components/Navbars/StartupNav';
import OnePageNavbar from 'components/Navbars/StartupNav/OnePageNav';
import NavbarRTL from 'components/Navbars/StartupNav/RTLNav';

const Header = ({ isOnePage, rtl }) => {
  return (
    <header className="style-6">
      <div className="content" data-scroll-index="0">
        {
          isOnePage ? 
           <OnePageNavbar rtl={rtl} />
           : 
            rtl ? (<NavbarRTL />) : (<Navbar />)
        }
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="info">
                <h1>
                  {
                    rtl ?
                    <>
                      التسويق الالكترونى هو <span> <small> المستقبل </small> </span>
                    </>
                    :
                    <>
                      Análisis SEO y marketing para tu <span><small>Negocio</small></span>
                    </>
                  }
                </h1>
                <div className="text">
                  {
                    rtl ?
                    <>
                       ضمان أفضل عائد على الاستثمار لمتطلبات حملة تحسين محركات البحث (SEO) الخاصة بك. <br />
                      احصل على تحليل SEO المجاني الخاص بك
                    </>
                    :
                    <>
                    </>
                  }
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
      <img src="/assets/img/header/hand_megaphone.png" alt="" className="hand-mega slide_up_down" />
      <img src="/assets/img/header/target_3d.png" alt="" className="target-3d rotate-center" />
      <img src="/assets/img/header/head6_rating.png" alt="" className="head6-rating scale_up_down" />
      <img src="/assets/img/header/header5_linechart.png" alt="" className="head6-charts scale_up_down" />
      <img src="/assets/img/header/rocket.png" alt="" className="head6-rocket" />
    </header>
  )
}

export default Header