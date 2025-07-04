import React, { useState, useEffect, useRef } from 'react'; // agregar useRef
import { FaTag } from 'react-icons/fa';
import ReactGA from 'react-ga4';
import ReCAPTCHA from 'react-google-recaptcha';


const AffiliationSection = () => {
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);


  const [selectedPlan, setSelectedPlan] = useState('Landing Page');
  const [loading, setLoading] = useState(false);

  const [recaptchaToken, setRecaptchaToken] = useState('');
  const recaptchaRef = useRef(null);

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showError, setShowError] = useState(false);



  const handlePlanChange = (plan) => {
    setSelectedPlan(plan);
  };

  const handleFormToggle = (e) => {
    e.preventDefault();
    setShowForm(!showForm);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!recaptchaToken) {
      alert('Por favor completa el reCAPTCHA');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('https://www.undercodeec.com/guardar_datos.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          'g-recaptcha-response': recaptchaToken
        }),
      });

      if (response.ok) {
        // Fuerza la actualización del estado
        setFormSubmitted(false); // Reset primero
        await new Promise(resolve => setTimeout(resolve, 50)); // Pequeño delay
        setFormSubmitted(true);

        // Limpia el formulario
        setFormData({ nombre: '', email: '', telefono: '', mensaje: '' });
        setRecaptchaToken('');
        if (recaptchaRef.current) recaptchaRef.current.reset();

        setShowError(false);
        setShowForm(false);
        setShowSuccessAlert(true);

        // Ahora llama a handlePayment
        await handlePayment(true); // Pasamos true directamente
      } else {
        alert('Error al enviar la información.');
      }
    } catch (error) {
      console.error('Error en handleSubmit:', error);
      alert('Ocurrió un error al enviar el formulario.');
    } finally {
      setLoading(false);
    }
  };
  // Agrega este componente de alerta en tu JSX (puedes estilarlo como prefieras)



  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: '',
  });
  // Agrega este useEffect aquí
  useEffect(() => {
    if (
      formData.nombre ||
      formData.email ||
      formData.telefono ||
      formData.mensaje
    ) {
      setShowError(false);
    }
  }, [formData]);

  useEffect(() => {
    console.log('Estado formSubmitted cambió:', formSubmitted);
  }, [formSubmitted]);

  useEffect(() => {
    console.log('Estado loading cambió:', loading);
  }, [loading]);

  const planDetails = {
    'Landing Page': {
      price: '$80',
      features1: [
        'Tu dominio.com',
        'Hosting incluido',
        'Diseño personalizado',
        'Página autoadministrable',
      ],
      features2: [
        'Formularios de contacto',
        'Botones de WhatsApp',
        'Correos corporativos',
        'Una sola pestaña interna',
      ],
    },
    'Página Informativa': {
      price: '$160',
      features1: [
        'Tu dominio.com',
        'Hosting incluido',
        'Inicio, tienda , nosotros, contacto',
        'Hasta 4 pestañas internas adicionales',
      ],
      features2: [
        'Página autoadministrable',
        'Formulario de contacto',
        'Botones de WhatsApp',
        'Correos corporativos',
      ],
    },
    'Tienda Online': {
      price: '$290',
      features1: [
        'Tu dominio.com',
        'Hosting incluido',
        'Catálogo de tus productos',
        'Pasarela de pago con tarjetas',
      ],
      features2: [
        'Inicio, tienda , nosotros, contacto',
        'Sube tus productos de forma ilimitada',
        'Carrito de compra',
        'Confirmación de pago al correo electrónico',
      ],
    },
    'Plataforma de cursos': {
      price: '$250',
      features1: [
        'Tu dominio.com',
        'Hosting incluido',
        'Tu propia plataforma de cursos tipo Crehana, Domestika, Netflix',
        'Portal completo para estudiantes y profesores',
      ],
      features2: [
        'Certificados automáticos',
        'Vende tus cursos en línea',
        'Sube cursos de forma ilimitada',
        'Correos corporativos',
      ],
    },
  };
  const handlePayment = async (isFormSubmitted = formSubmitted) => {
    console.log('Iniciando handlePayment - formSubmitted:', isFormSubmitted);

    if (!isFormSubmitted) {  // Cambia formSubmitted por isFormSubmitted
      console.warn('Payment bloqueado: formulario no enviado');
      setShowForm(true);
      setShowError(true);
      return;
    }

    setLoading(true);
    try {
      const plan = planDetails[selectedPlan];
      const amount = parseFloat(plan.price.replace('$', '').replace(',', ''));

      console.log('Enviando solicitud de pago para:', selectedPlan, amount);

      const response = await fetch('https://api.undercodeec.com/api/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          planName: selectedPlan,
          customerEmail: formData.email // Asegúrate de que la API reciba el email
        }),
      });

      const data = await response.json();
      console.log('Respuesta de pago:', data);

      if (!response.ok) throw new Error(data.error || 'Error en la API de pago');

      if (data.paymentUrl) {
        setTimeout(() => {
          const newWindow = window.open('', '_blank');
          if (newWindow) {
            newWindow.location.href = data.paymentUrl;
          } else {
            alert('Por favor permite ventanas emergentes para completar el pago');
            window.location.href = data.paymentUrl;
          }
        }, 2000); // espera 0.5 segundos
      } else {
        throw new Error('No se recibió URL de pago');
      }
    } catch (error) {
      console.error('Error en handlePayment:', error);
      alert(`Error al generar pago: ${error.message}`);
      setShowSuccessAlert(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="planes" className="affiliation-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-10">
            <div className="sec-head text-center mb-40">
              <h2 className="num">
                <span className="color-grd">
                  PLAN DE PRECIOS<span className="thin"></span>
                </span>
              </h2>
              <h3 className="text-capitalize fs-1">Elija el plan adecuado para usted.</h3>
            </div>
          </div>
        </div>

        <div className="row custom-columns">
          {/* Columna izquierda */}
          <div className="custom-left-column">
            <div className="left-column">
              <h2>Únase a Undercodeec</h2>
              <p>Programa una visita guiada rápida de 15 minutos y uno de nuestros asesores te atendera.</p>
              <img src="/landing-preview/img/img-call.png" alt="Visita Guiada" className="img-fluid" />
              <button
                className="btn btn-primary"
                onClick={() => {
                  ReactGA.event({
                    category: 'Interacción',
                    action: 'click_reserva_llamada',
                    label: 'Botón Reserva una llamada introductoria',
                  });
                  // Meta Pixel
                  window.fbq('trackCustom', 'ClickReservaLlamada', {
                    source: 'AffiliationSection',
                  });
                }}
              >
                <a href="#reserva_agenda" className="button-reservation">
                  Reserva una llamada introductoria de 15 minutos
                </a>
              </button>

            </div>
          </div>

          {/* Columna derecha */}
          <div className="custom-right-column">
            <div className="right-column">
              <h3>Planes Web</h3>

              <div className="plan-toggle d-flex flex-wrap gap-2 mb-3">
                {Object.keys(planDetails).map((plan) => (
                  <button
                    key={plan}
                    className={`btn ${selectedPlan === plan ? 'btn-active' : 'btn-inactive'}`}
                    onClick={() => {
                      ReactGA.event({
                        category: 'Planes',
                        action: 'click_plan',
                        label: plan,
                      });

                      // Meta Pixel
                      window.fbq('trackCustom', 'SeleccionarPlan', {
                        plan: plan,
                      });

                      handlePlanChange(plan);
                    }}

                  >
                    {plan}
                  </button>
                ))}
              </div>
              <p>Dos pagos de</p>
              <div className="pricing d-flex align-items-center gap-2 mb-2">
                <FaTag size={28} style={{ color: '#fdb800' }} />
                <h4 className="mb-0">{planDetails[selectedPlan].price}</h4>
              </div>


              <div className="row">
                <div className="col-md-6">
                  <ul className="features-list">
                    {planDetails[selectedPlan].features1.map((feature, index) => (
                      <li key={`col1-${index}`}>{feature}</li>
                    ))}
                  </ul>
                </div>
                <div className="col-md-6">
                  <ul className="features-list">
                    {planDetails[selectedPlan].features2.map((feature, index) => (
                      <li key={`col2-${index}`}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
              {showSuccessAlert && (
                <div className="alert alert-success mb-3" role="alert">
                  ¡Información enviada con éxito! Estamos generando tu link de pago...
                  <button
                    type="button"
                    className="close"
                    onClick={() => setShowSuccessAlert(false)}
                    style={{ background: 'none', border: 'none', fontSize: '1.5rem', marginLeft: '10px' }}
                  >
                    &times;
                  </button>
                </div>
              )}

              <div className="button-group">
                {showError && (
                  <div className="alert alert-warning" role="alert">
                    Debes llenar y enviar los datos de facturación antes de continuar con el pago.
                  </div>
                )}

                <button
                  className="btn btn-primary"
                  onClick={() => {
                    ReactGA.event({
                      category: 'Interacción',
                      action: 'click_empezar',
                      label: 'Botón Empezar',
                    });

                    // Meta Pixel
                    window.fbq('trackCustom', 'ClickEmpezarPago', {
                      plan: selectedPlan,
                    });

                    handlePayment();
                  }}

                  disabled={loading}
                >
                  {loading ? 'Procesando...' : 'Empezar'}
                </button>

                <a
                  href="#reserva"
                  className={`btn-link ${showError ? 'text-danger' : ''}`}
                  onClick={handleFormToggle}
                >
                  Click aquí para llenar datos de facturación ↓
                </a>

              </div>

              {showForm && (
                <form className="mt-3" onSubmit={handleSubmit} style={{ maxWidth: '500px' }}>
                  <div className="mb-2">
                    <input
                      type="text"
                      name="nombre"
                      placeholder="Tu nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      type="email"
                      name="email"
                      placeholder="Tu correo"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      type="tel"
                      name="telefono"
                      placeholder="Tu número de teléfono"
                      value={formData.telefono}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-2">
                    <textarea
                      name="mensaje"
                      placeholder="Mensaje opcional"
                      value={formData.mensaje}
                      onChange={handleInputChange}
                      className="form-control"
                      rows="3"
                    ></textarea>
                  </div>

                  <ReCAPTCHA
                    sitekey="6Lf_OSsrAAAAAORgEcrisGsaYvGk1CtX2sPD24Fr"
                    onChange={(token) => setRecaptchaToken(token)}
                    theme="light"
                    ref={recaptchaRef}
                  />


                  <button
                    type="submit"
                    className="btn btn-success"
                    onClick={() => {
                      ReactGA.event({
                        category: 'Interacción',
                        action: 'click_enviar',
                        label: 'Botón Enviar Formulario',
                      });

                      // Meta Pixel
                      window.fbq('trackCustom', 'EnviarFormulario', {
                        nombre: formData.nombre,
                        email: formData.email,
                      });
                    }}

                  >
                    Enviar
                  </button>

                </form>
              )}

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AffiliationSection;
