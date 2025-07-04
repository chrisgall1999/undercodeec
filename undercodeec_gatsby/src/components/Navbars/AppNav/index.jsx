import React from 'react';
import { Link } from 'gatsby';

const Navbar = ({ navbarRef }) => {
  const handleMouseMove = (event) => {
    const dropDownToggler = event.target.classList.contains('dropdown-toggle') ? event.target : event.target.querySelector('.dropdown-toggle');
    const dropDownMenu = dropDownToggler?.nextElementSibling;

    dropDownToggler?.classList?.add('show');
    dropDownMenu?.classList?.add('show');
  }

  const handleMouseLeave = (event) => {
    const dropdown = event.target.classList.contains('dropdown') ? event.target : event.target.closest('.dropdown');
    const dropDownToggler = dropdown.querySelector('.dropdown-toggle');
    const dropDownMenu = dropdown.querySelector('.dropdown-menu');

    dropDownToggler?.classList?.remove('show');
    dropDownMenu?.classList?.remove('show');
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light style-1 nav-preview py-0" ref={navbarRef}>
      <div className="container-xxl">
        <a className="navbar-brand" href="#">
          <img src="/assets/img/undercode-logo.png" alt="" />
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav m-auto mb-2 mb-lg-0">

            <li className="nav-item">
              <a className="nav-links dropLink" href='/'>
                Inicio
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-links dropLink" href='/nuestra-trayectoria'>
                Nuestra trayectoria
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-links dropLink" href='/servicios'>
                Servicios
              </a>
            </li>
            <li className="nav-item dropDown megaMenu col3">
              <a className="nav-links dropLink active" href="#">
                Todo en Uno
                <small className="icon ms-1"><i className="bi bi-chevron-down me-1"></i></small>
              </a>
              <ul className="dropDownMenu">
                <li className="dropdown-items">
                  <a href="#" className="menuLink">multi-Paginas</a>
                  <ul className="subDropDown">



                    <li>
                      <Link to="/aplicaciones-moviles" className="subLink">
                        Aplicaciones Móviles 
                      </Link>
                      <span className="new">Nuevo</span>
                    </li>

                    <li>
                      <Link to="/marketing-para-tu-negocio" className="subLink">
                        Marketing para tu negocio.
                      </Link>
                      <span className="new">Hot</span>

                    </li>
                    <li>
                      <Link to="/software-para-tu-negocio" className="subLink">
                        Software para tu negocio
                      </Link>
                    </li>

                    {/*  ----------- Enlase para la tienda-------------------
                        <li>
                          <Link to="/page-shop-5" className="subLink">
                            shop
                          </Link>
                        </li>
                        */}
                  </ul>
                </li>
                {/* 
                    <li className="dropdown-items">
                      <a href="#" className="menuLink">one-page</a>
                      <ul className="subDropDown">
                        <li>
                          <Link to="/aplicaciones-moviles-onePage" className="subLink">
                            App Landing
                          </Link>
                        </li>
                        <li>
                          <Link to="/home-digital-agency-onePage" className="subLink">
                            Digital Agency
                          </Link>
                        </li>
                        <li>
                          <Link to="/marketing-para-tu-negocio-onePage" className="subLink">
                            Marketing Startup
                          </Link>
                        </li>
                        <li>
                          <Link to="/home-saas-technology-onePage" className="subLink">
                            Software company
                          </Link>
                        </li>
                        <li>
                          <Link to="/home-saas-technology-onePage" className="subLink">
                            Saas Technology
                          </Link>
                        </li>
                        <li>
                          <Link to="/home-it-solutions-onePage" className="subLink">
                            IT Solution
                          </Link>
                        </li>
                        <li>
                          <Link to="/page-shop-app" className="subLink">
                            shop
                          </Link>
                        </li>
                      </ul>
                    </li>
                    
                    <li className="dropdown-items">
                      <a href="#" className="menuLink">RTL</a>
                      <ul className="subDropDown">
                        <li>
                          <Link to="/rtl-marketing-para-tu-negocio" className="subLink">
                            Marketing Startup
                          </Link>
                        </li>
                        <li>
                          <Link to="/rtl-marketing-para-tu-negocio-onePage" className="subLink">
                            Marketing Startup one page
                          </Link>
                        </li>
                        <li>
                          <Link to="/rtl-page-shop" className="subLink">
                            shop
                          </Link>
                        </li>
                      </ul>
                    </li>
                    */}
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-links dropLink" href='/contacto'>
              Contáctanos
              </a>
            </li>
            


          </ul>
          <div className="nav-side flex-shrink-0">
            <div className="qoute-nav">
              <Link to="/#reserva_agenda" className="btn sm-butn butn-gard border-0 text-white">
                <span>Agendar Reunión</span>
              </Link>

            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar