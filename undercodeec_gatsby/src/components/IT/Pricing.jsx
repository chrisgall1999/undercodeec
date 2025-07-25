import React from 'react';
import { Link } from 'gatsby';
import plans from 'data/IT/plans.json';

const Pricing = () => {

  const togglePlanDuration = (duration) => {
    let monthly = document.querySelectorAll('.monthly_price');
    let yearly = document.querySelectorAll('.yearly_price');

    if (duration === 'monthly') {
      monthly.forEach(price => price.classList.add('show'));
      yearly.forEach(price => price.classList.remove('show'));
    } else {
      yearly.forEach(price => price.classList.add('show'));
      monthly.forEach(price => price.classList.remove('show'));
    }
  }

  return (
    <section className="pricing style-2 border-top brd-light section-padding" data-scroll-index="6">
      <div className="container">
        <div className="section-head mb-30 text-center">
          <h2 className="text-white ltspc-20 text-uppercase fs-1 lh-1 mb-70">Pricing & plan</h2>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="content">
              
              <div className="row justify-content-center gx-0">
                {
                  plans.map((plan, index) => (
                    <div className="col-lg-4" key={index}>
                      <div className={`pricing_card ${plan.recommended ? 'recommended':''} style-2`}>
                        { plan.recommended && <span className="hint">Recommended</span> }
                        <div className="icon">
                          <img src={plan.image} alt="" />
                        </div>
                        <p>{ plan.title }</p>
                        <div className="price mb-30">
                          <div className="monthly_price">
                            <span className="h2">
                              <small>$</small> { plan.price }
                            </span>
                            <small className="op-7 ms-1"> / month </small>
                          </div>
                          <div className="yearly_price show">
                            <span className="h2">
                              <small>$</small> { plan.price }
                            </span>
                            <small className="op-7 ms-1"> / year </small>
                          </div>
                        </div>
                        <ul>
                          {
                            plan.features.map((feature, i) => (
                              <li className="border-top py-3 op-8 fw-light text-uppercase" key={i}>
                                { feature }
                              </li>
                            ))
                          }
                        </ul>
                        <Link to="/page-contact-5" className="sm-butn btn border text-white radius-9 mt-50 w-100 hover-lightBlue border-lightBlue">
                          <span>Get Started Now</span>
                        </Link>
                      </div>
                    </div>
                  ))
                }
              </div>
              <p className="text-white text-center mt-50">You have a large team? <Link to="/page-contact-5" className="text-decoration-underline">Contact us</Link> for information about more enterprise options </p>
            </div>
          </div>
        </div>
      </div>
      <img src="/assets/img/pricing/shap_l.png" alt="" className="shap_l" />
      <img src="/assets/img/pricing/shap_r.png" alt="" className="shap_r" />
    </section>
  )
}

export default Pricing