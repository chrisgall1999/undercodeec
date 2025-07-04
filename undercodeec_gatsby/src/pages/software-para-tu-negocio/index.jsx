import React, { useEffect } from 'react';
//= Layout
import MainLayout from 'layouts/Main';
//= Components
import Header from 'components/DataAnalysis/Header';
import Services from 'components/DataAnalysis/Services';
import About from 'components/DataAnalysis/About';
import Numbers from 'components/DataAnalysis/Numbers';
import Projects from 'components/DataAnalysis/Projects';
import ChooseUs from 'components/DataAnalysis/ChooseUs';
import Testimonials from 'components/DataAnalysis/Testimonials';
import Pricing from 'components/DataAnalysis/Pricing';
import Blog from 'components/DataAnalysis/Blog';
import Footer from 'components/DataAnalysis/Footer';
import Seo from 'components/Seo';

const SoftwareParaTuNegocio = () => {
  useEffect(() => {
    document.body.classList.add('home-style-8');
    return () => document.body.classList.remove('home-style-8');
  }, []);

  return (
    <MainLayout>
      <Header />
      <main>
        <Services />
        <About />
        <Numbers />
        <Projects />
        <ChooseUs />
        <Testimonials />
        <Pricing />
        <Blog />
      </main>
      <Footer />
    </MainLayout>
  )
}

export const Head = () => {
  return (
    <>
     <Seo
        title="Desarrollo de Software a Medida en Quito | Soluciones Personalizadas para Empresas"
        description="Creamos soluciones de software personalizadas para empresas en Quito y Ecuador. Optimiza tus procesos con aplicaciones web, móviles y de escritorio adaptadas a tus necesidades."
        keywords={[
          'desarrollo de software a medida Quito',
          'aplicaciones personalizadas Ecuador',
          'desarrollo de software para empresas Quito',
          'soluciones de software a medida Ecuador',
          'desarrollo de aplicaciones web Quito',
          'desarrollo de aplicaciones móviles Ecuador',
          'software empresarial Quito',
          'desarrollo de aplicaciones de escritorio Ecuador',
        ]}
        url="https://undercodeec.com/software-para-tu-negocio/"
      />
      <title>Undercodeec - Software para tu negocio</title>
      <link rel="stylesheet" href="/assets/css/lib/bootstrap.min.css" />
      <link rel="stylesheet" href="/assets/css/style.css" />
    </>
  )
}

export default SoftwareParaTuNegocio;