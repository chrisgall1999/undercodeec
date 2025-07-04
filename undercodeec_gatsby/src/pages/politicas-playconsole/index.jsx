import React from 'react';
import PoliticaContenido from 'components/Navbars/PlayConsole';

const PoliticasPlayConsole = () => {
  return (
    <main className="politica-playconsole">
      <PoliticaContenido />
    </main>
  );
};

export const Head = () => (
  <>
    <title>Política de Privacidad</title>
    <meta name="robots" content="noindex" />
    <link rel="stylesheet" href="/assets/css/lib/bootstrap.min.css" />
    <link rel="stylesheet" href="/assets/css/style.css" />
  </>
);

export default PoliticasPlayConsole;
