import React, { useEffect, useRef } from 'react';
//= Scripts
import navbarScrollEffect from "common/navbarScrollEffect";
//= Layout
import MainLayout from 'layouts/Main';
//= Components
import TopNav from 'components/Navbars/TopNav';
import Navbar from 'components/Navbars/SaasNav';
import BlogSlider from 'components/Blog/BlogSlider';
import PopularPosts from 'components/Blog/PopularPosts';
import AllNews from 'components/Blog/AllNews';
import Footer from 'components/Saas/Footer';

const Noticias = () => {
  const navbarRef = useRef(null);

  useEffect(() => {
    navbarScrollEffect(navbarRef.current, true);
  }, [navbarRef]);

  return (
    <MainLayout>
      <TopNav style="5" />
      <Navbar navbarRef={navbarRef} />
      <main className="blog-page style-5 color-5">
        <BlogSlider style="5" />
        <PopularPosts style="5" />
        <AllNews style="5" />
      </main>
      <Footer noWave />
    </MainLayout>
  )
}

export const Head = () => {
  return (
    <>
      <title>Undercodeec - Noticias</title>
      <link rel="stylesheet" href="/assets/css/lib/bootstrap.min.css" />
      <link rel="stylesheet" href="/assets/css/style.css" />
    </>
  )
}

export default Noticias;