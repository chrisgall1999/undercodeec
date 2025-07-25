import React, { useEffect } from 'react';
import { Link } from 'gatsby';
import LightGallery from 'lightgallery/react';
import 'lightgallery/css/lightgallery.css';

const Sidebar = ({ data, style, rtl }) => {
  useEffect(() => {
    const lg = document.querySelector('.lg-react-element');
    if (lg) lg.className = 'd-flex justify-content-between flex-wrap';
  }, []);

  return (
    <div className="col-lg-4">
      <div className="side-blog style-5 ps-lg-5 mt-5 mt-lg-0">
        <form action="contact.php" className="search-form mb-50" method="post">
          
          
        </form>

        <div className="side-recent-post mb-50">
          <h6 className="title mb-20 text-uppercase fw-normal">
            { rtl ? 'المنشورات الاخيرة' : 'recent post' }
          </h6>
          {
            data.recentPosts.map((post, index) => (
              <Link to={ rtl ? "/rtl-page-single-post" : "/page-single-post-5" } key={index} className={`post-card ${index !== data.recentPosts.length - 1 ? 'pb-3 mb-3 border-bottom brd-gray':''}`}>
                <div className="img me-3">
                  <img src={post.image} alt="" />
                </div>
                <div className="inf">
                  <h6>{ post.title }</h6>
                  <p>{ rtl ? 'إذا كانت هناك طريقة واحدة تعمل بها التكنولوجيا اللاسلكية' : 'If there’s one way that wireless technology has' } [...]</p>
                </div>
              </Link>
            ))
          }
        </div>

       

        <div className="side-newsletter mb-50">
          <h6 className="title mb-10 text-uppercase fw-normal">
            { rtl ? 'نشرة الاخبار' : 'newsletter' }
          </h6>
          <div className="text">
            { rtl ? 'سجل الآن للحصول على آخر التحديثات الخاصة بالعروض الترويجية والقسائم.' : 'Register now to get latest updates on promotions & coupons.' }
          </div>
          <form action="contact.php" className="form-subscribe" method="post">
            <div className="email-input d-flex align-items-center py-3 px-3 bg-white mt-3 radius-5">
              <span className="icon me-2 flex-shrink-0">
                <i className="far fa-envelope"></i>
              </span>
              <input type="text" placeholder="Email Address" className="border-0 bg-transparent fs-12px" />
            </div>
            <button className={`btn bg-blue${style} sm-butn text-white hover-darkBlue w-100 mt-3 radius-5 py-3`}>
              <span>{ rtl ? 'أشترك' : 'Subscribe' }</span>
            </button>
          </form>
        </div>

        <div className="side-share mb-50">
          <h6 className="title mb-20 text-uppercase fw-normal">
            { rtl ? 'اجتماعي' : 'social' }
          </h6>
          <a href="#" className="social-icon">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="social-icon">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className="social-icon">
            <i className="fab fa-pinterest"></i>
          </a>
          <a href="#" className="social-icon">
            <i className="fab fa-goodreads-g"></i>
          </a>
          <a href="#" className="social-icon">
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>

        

        
      </div>
    </div>
  )
}

export default Sidebar