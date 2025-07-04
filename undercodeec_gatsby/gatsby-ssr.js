import React from "react";

const HtmlAttributes = {
  lang: "en"
};

const HeadComponents = [
  <meta key="httpEquiv" httpEquiv="X-UA-Compatible" content="IE=edge" />,
  <meta key="viewport" name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />,
  <meta key="keywords" name="keywords" content="React Gatsby Template Iteck Multi-Purpose themeforest" />,
  <meta key="description" name="description" content="Undercodeec - Diseño & Desarrollo Web - Aplicaciones - Software a medida" />,
  <meta key="author" name="author" content="" />,
  <link key="styles-bs-icons" rel="stylesheet" href="/assets/css/lib/bootstrap-icons.css" />,
  <link key="styles-fa" rel="stylesheet" href="/assets/css/lib/all.min.css" />,
  <link key="styles-animate" rel="stylesheet" href="/assets/css/lib/animate.css" />,
  <link key="styles-all" rel="stylesheet" href="/assets/css/style.css" />,
  <link key="icon" rel="shortcut icon" href="/assets/img/undercode-logo.png" title="Favicon" sizes="16x16" />,
  <link key="InterFont" rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" />,
  <link key="MessiriFont" rel="stylesheet" href="https://fonts.googleapis.com/css2?family=El+Messiri:wght@400;500;600;700&display=swap" />,
  <script key="pace" src="/assets/js/lib/pace.js"></script>,
  <script key="bootstrap" src="/assets/js/lib/bootstrap.bundle.min.js"></script>,
  <script key="mixitup" src="/assets/js/lib/mixitup.min.js"></script>,
  <script key="wow" src="/assets/js/lib/wow.min.js"></script>,
  <script key="html5shiv" src="/assets/js/lib/html5shiv.min.js"></script>
];

const FacebookPixel = [
  <script
    key="facebook-pixel"
    dangerouslySetInnerHTML={{
      __html: `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '699039789185351');
        fbq('track', 'PageView');
      `,
    }}
  />,
  <noscript key="facebook-pixel-noscript">
    <img
      height="1"
      width="1"
      style={{ display: "none" }}
      src="https://www.facebook.com/tr?id=699039789185351&ev=PageView&noscript=1"
      alt=""
    />
  </noscript>
];

export const onRenderBody = ({ setHeadComponents, setHtmlAttributes }) => {
  setHtmlAttributes(HtmlAttributes);
  setHeadComponents([...HeadComponents, ...FacebookPixel]);
};
