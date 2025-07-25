import React from 'react';
import { Link } from 'gatsby';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Autoplay, EffectFade } from 'swiper';
import slides from 'data/Blog/slides.json';
import slidesRTL from 'data/Blog/slides-rtl.json';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

SwiperCore.use([Navigation, Pagination, Autoplay, EffectFade]);

const BlogSlider = ({ style = "4", rtl }) => {
  const data = rtl ? slidesRTL : slides;

  // Función para manejar imágenes y videos
const renderMedia = (media) => {
  const fileExtension = media.split('.').pop().toLowerCase();
  
  // Si es un video
  if (fileExtension === 'mp4') {
    return (
      <video width="100%" autoPlay muted loop>
        <source src={media} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  }
  // Si es una imagen
  return <img src={media} alt="media content" width="100%" />;
};


  return (
    <section className="blog-slider pt-50 pb-50 style-1">
      <div className="container">
        <div className={`section-head text-center mb-60 style-${style}`}>
          <h2 className="mb-20">{ rtl ? 'أخر' : 'Nuestras' } <span>{ rtl ? 'الأخبار' : 'Noticias' }</span></h2>
          <div className="text color-666">{ rtl ? 'احصل على اخر الاخبار من خلال المدونه ناقش وشارك الخبر مع الاصدقاء' : 'Descubre articulos de tu interes' }</div>
        </div>
        <div className="blog-details-slider">
          <Swiper
            className="swiper-container"
            slidesPerView={1}
            spaceBetween={0}
            effect="fade"
            speed={1000}
            pagination={{
              el: ".blog-details-slider .swiper-pagination",
              clickable: "true"
            }}
            navigation={{
              nextEl: '.blog-details-slider .swiper-button-next',
              prevEl: '.blog-details-slider .swiper-button-prev'
            }}
            mousewheel={false}
            keyboard={true}
            autoplay={{
              delay: 4000
            }}
            loop={true}
          >
            {
              data.map((slide, index) => (
                <SwiperSlide key={index}>
                  <div className="content-card">
                    <div className="img overlay">
                      {/* Aquí usamos renderMedia para mostrar la imagen o video */}
                      {renderMedia(slide.media)} 
                    </div>
                    <div className="info">
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="cont">
                            <small className="date small mb-20"> 
                              <a href="#" className="text-uppercase border-end brd-gray pe-3 me-3">{ slide.type }</a>
                              <i className="far fa-clock me-2"></i>{ rtl ? 'موعد النشر' : 'Posted on' } <a href="#">{ slide.time }</a> 
                            </small>
                            <h2 className="title">
                              <Link to={ rtl ? "/rtl-page-single-post" : "/page-single-post-5"}>{ slide.title }</Link>
                            </h2>
                            <p className="fs-13px mt-10 text-light text-info">
                              { slide.desc } [...]
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))
            }
          </Swiper>

          <div className="swiper-pagination"></div>

          <div className="swiper-button-next"></div>
          <div className="swiper-button-prev"></div>
        </div>
      </div>
    </section>
  );
};

export default BlogSlider;
