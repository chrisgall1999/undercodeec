import React from 'react';
//= Layout
import MainLayout from 'layouts/Main';
//= Components
import Header from 'components/Startup/Header';
import About from 'components/Startup/About';
import Services from 'components/Startup/Services';
import Project from 'components/Startup/Project';
import ChooseUs from 'components/Startup/ChooseUs';
import Testimonials from 'components/Startup/Testimonials';
import Clients from 'components/Startup/Clients';
import Numbers from 'components/Startup/Numbers';
import Team from 'components/Startup/Team';
import Blog from 'components/Startup/Blog';
import Contact from 'components/Startup/Contact';
import Footer from 'components/Startup/Footer';
import Seo from 'components/Seo';

const MarketingParaTuNegocio = () => {
  return (
    <MainLayout>
      <Header />
      <main>
        <About />
        <Services />
        <Project />
        <ChooseUs />
        <Testimonials />
        <Clients />
        <Numbers />
        <Team />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </MainLayout>
  )
}

export const Head = () => {
  return (
    <>
     <Seo
        title="Marketing Digital y E-commerce para Negocios en Quito | Undercodeec"
        description="Impulsa tu negocio con servicios de marketing digital, SEO y desarrollo de tiendas online en Quito y Ecuador. Soluciones efectivas para emprendedores y empresas."
        keywords={[
          'marketing digital Quito',
          'ecommerce Quito',
          'seo para ecommerce Ecuador',
          'tiendas online Quito',
          'posicionamiento web para negocios',
          'marketing para emprendedores Quito',
        ]}
        url="https://undercodeec.com/marketing-para-tu-negocio/"
      />
      <title>Undercodeec - Marketing para tu negocio</title>
      <link rel="stylesheet" href="/assets/css/lib/bootstrap.min.css" />
      <link rel="stylesheet" href="/assets/css/style.css" />
    </>
  )
}

export default MarketingParaTuNegocio;