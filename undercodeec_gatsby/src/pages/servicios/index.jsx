import React, { useEffect, useRef } from 'react';
//= Scripts
import navbarScrollEffect from "common/navbarScrollEffect";
//= Layout
import MainLayout from 'layouts/Main';
//= Components
import TopNav from 'components/Navbars/TopNav';
import Navbar from 'components/Navbars/SaasNav';
import Features from 'components/Saas/Features';
import Services from 'components/Saas/Services';
import About from 'components/Saas/About';
import Testimonials from 'components/Saas/Testimonials';
import Pricing from 'components/Saas/Pricing';
import Footer from 'components/Saas/Footer';

const Servicios = () => {
  const navbarRef = useRef(null);

  useEffect(() => {
    navbarScrollEffect(navbarRef.current);
  }, [navbarRef]);

  return (
    <MainLayout>
      <TopNav style="5" />
      <Navbar navbarRef={navbarRef} />
      <main className="services-page style-5">
        <Features isServices />
        <Services />
        <About noPaddingTop />
        <Testimonials />
        <Pricing />
      </main>
      <Footer noWave />
    </MainLayout>
  )
}

export const Head = () => {
  return (
    <>
      <title>Undercodeec - Servicios</title>
      <link rel="stylesheet" href="/assets/css/lib/bootstrap.min.css" />
      <link rel="stylesheet" href="/assets/css/style.css" />
    </>
  )
}

export default Servicios;