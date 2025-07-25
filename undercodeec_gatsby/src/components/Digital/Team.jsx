import React from 'react';
import { Link } from 'gatsby';
import teamMembers from 'data/Digital/team.json'

const Team = () => {
  return (
    <section className="team section-padding pt-0 style-1">
      <div className="container">
        <div className="section-head mb-60 text-center">
          <h6 className="color-main text-uppercase wow fadeInUp">meet our expert</h6>
          <h2 className="wow fadeInUp">
            Clients Satisfaction, <span className="fw-normal">Our Reputation</span>
          </h2>
        </div>
        <div className="content">
          {
            teamMembers.map((member, index) => (
              <div className="team_box wow fadeInUp" data-wow-delay={index * 0.2 + "s"} key={index}>
                <div className="avatar">
                  <img src={member.picture} alt="" />
                </div>
                <div className="info">
                  <h6><a href="#">{ member.name }</a></h6>
                  <small>{ member.position }</small>
                  <div className="social_icons">
                    <a href="#">
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a href="#">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="#">
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                    <a href="#">
                      <i className="fab fa-github"></i>
                    </a>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
        <div className="bttns mt-4 text-center">
          <Link to="/nuestra-trayectoria" className="btn btn-dark wow zoomIn me-2">
            <span>See All Team</span>
          </Link>
          <Link to="/page-contact-5" className="btn butn-gard border-0 text-white wow zoomIn">
            <span>Join Our Team</span>
          </Link>
        </div>
      </div>
      <img src="/assets/img/team/team_shap.png" alt="" className="team_shap" />
    </section>
  )
}

export default Team