import React, { useState, useEffect, useRef } from 'react'; // agregar useRef
import { FaTag, FaCreditCard, FaExchangeAlt } from 'react-icons/fa'; import ReactGA from 'react-ga4';
import ReCAPTCHA from 'react-google-recaptcha';


const AffiliationSection = () => {
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const [showBankDetails, setShowBankDetails] = useState(false);

  const [selectedPlan, setSelectedPlan] = useState('Landing Page');
  const [loading, setLoading] = useState(false);

  const [recaptchaToken, setRecaptchaToken] = useState('');
  const recaptchaRef = useRef(null);

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showError, setShowError] = useState(false);


  const [selectedSubPlan, setSelectedSubPlan] = useState('Web estándar');

  const handlePlanChange = (plan) => {
    setSelectedPlan(plan);
    setSelectedSubPlan('Web estándar'); // ← Selecciona siempre este subplan por defecto
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
      subPlans: {
        'Web estándar': {
          price: '$40',
          features1: [
            'Tu dominio.com & hosting por un año',
            'Diseño estandar',
            'Página autoadministrable',
            'SEO basico (busquedas en Google palabra unica)',
          ],
          features2: [
            'Formularios de contacto',
            'Botones de WhatsApp',
            'Correos corporativos',
            'Una sola pestaña interna',
          ],
        },
        'Web completa': {
          price: '$80',
          features1: [
            'Tu dominio.com & hosting por un año',
            'Google Analytics integrado & Pixel Meta',
            'Página autoadministrable',
            'SEO con Google Ads (publicidad)',
            'Integraciones personalizadas',
          ],
          features2: [
            'Creacion de resdes sociales',
            'Diseño personalizado',
            'Botones de WhatsApp',
            'Seguridad integrada (firewall)',
            'copias de seguridad automaticas',
          ],
        }
      }
    },
    'Página Informativa': {
      subPlans: {
        'Web estándar': {
          price: '$60',
          features1: [
            'Tu dominio.com & hosting por un año',
            'Inicio, servicios, nosotros, contacto',
            'SEO basico (busquedas en Google palabra unica)',
            'Diseño estandar',
            'SEO basico (busquedas en Google palabra unica)',

          ],
          features2: [
            'Google Analytics integrado',
            'Formulario de contacto',
            'Botones de whatsApp',
            'Correos corporativos',
          ],
        },
        'Web completa': {
          price: '$160',
          features1: [
            'Tu dominio.com por un año',
            'Creacion de resdes sociales',
            'Inicio, tienda , nosotros, contacto',
            'Hasta 4 pestañas internas adicionales',
            'SEO con Google Ads (publicidad)',
          ],
          features2: [
            'Página autoadministrable',
            'Formulario de contacto',
            'Botones de WhatsApp',
            'Correos corporativos',
            'Copias de seguridad automaticas',
            'Seguridad integrada (firewall)',
          ],
        }
      }
    },
    'Tienda Online': {
      subPlans: {
        'Tienda Online estándar': {
          price: '$125',
          features1: [
            'Tu dominio.com & hosting por un año',
            'Catálogo de tus productos',
            'Pasarela de pago con tarjetas debito/credito',
            'Google Analytics integrado',
            'SEO basico (busquedas en Google palabra unica)',
          ],
          features2: [
            'Formulario de contacto',
            'Botones de whatsApp para comprar',
            'Correos corporativos',
            'Confirmación de pago al correo electrónico',
          ],
        },
        'Tienda Online completa': {
          price: '$290',
          features1: [
            'Tu dominio.com & hosting por un año',
            'Sube tus productos de forma ilimitada',
            'Pasarela de pago con tarjetas debito/credito',
            'Copias de seguridad automaticas',
            'SEO con Google Ads (publicidad)',
            'Creacion de resdes sociales',
            'Correos corporativos',
          ],
          features2: [
            'Inicio, tienda , nosotros, contacto (varias paginas integradas)',
            'Carrito de compra',
            'Confirmación de pago al correo electrónico',
            'Videos tutoriales integrados a WordPress',
            'Seguridad integrada (firewall)',
            'Botones de whatsApp para comprar',
          ],
        }
      }
    },
    'Plataforma de cursos': {
      subPlans: {
        'Plataforma estandar': {
          price: '$250',
          features1: [
            'Tu dominio.com & hosting por un año',
            'Tu propia plataforma de cursos tipo Crehana, Domestika, Netflix',
            'Portal completo para estudiantes y profesores',
            'SEO basico (busquedas en Google palabra unica)',
          ],
          features2: [
            'Certificados automáticos',
            'Vende tus cursos en línea',
            'Sube cursos de forma ilimitada',
            'Correos corporativos',
            'SEO con Google Ads (publicidad)',
            'Seguridad integrada (firewall)',
          ],
        },
        'Plataforma completa': {
          price: '$350',
          features1: [
            'Tu dominio.com & hosting por un año',
            'Tu propia plataforma de cursos tipo Crehana, Domestika, Netflix',
            'Portal completo para estudiantes y profesores',
            'Videos tutoriales integrados',
            'Creacion de resdes sociales',
          ],
          features2: [
            'Certificados automáticos',
            'Vende tus cursos en línea',
            'Sube cursos de forma ilimitada',
            'Correos corporativos',
            'SEO con Google Ads (publicidad)',
            'Seguridad integrada (firewall)',
          ],
        }
      }
    },
  };
  const handlePayment = async (isFormSubmitted = formSubmitted) => {
    console.log('Iniciando handlePayment - formSubmitted:', isFormSubmitted);

    if (!isFormSubmitted) {
      console.warn('Payment bloqueado: formulario no enviado');
      setShowForm(true);
      setShowBankDetails(false); // Asegura que los datos bancarios estén ocultos
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
                      const firstSubPlan = planDetails[plan]?.subPlans
                        ? Object.keys(planDetails[plan].subPlans)[0]
                        : null;
                      setSelectedSubPlan(firstSubPlan);
                    }}

                  >
                    {plan}
                  </button>
                ))}
              </div>

              {planDetails[selectedPlan]?.subPlans && (
                <div className="subplan-toggle d-flex justify-content-center gap-2 mb-3">
                  {Object.keys(planDetails[selectedPlan].subPlans).map((subPlan) => (
                    <button
                      key={subPlan}
                      className={`btn ${selectedSubPlan === subPlan ? 'btn-active' : 'btn-inactive'}`}
                      onClick={() => setSelectedSubPlan(subPlan)}
                    >
                      {subPlan}
                    </button>
                  ))}
                </div>
              )}

              <p>Dos pagos mensuales de</p>
              <div className="pricing d-flex align-items-center gap-2 mb-2">
                <FaTag size={28} style={{ color: '#fdb800' }} />
                <h4 className="mb-0">
                  {planDetails[selectedPlan].subPlans
                    ? planDetails[selectedPlan].subPlans[selectedSubPlan].price
                    : planDetails[selectedPlan].price}
                </h4>
              </div>


              {planDetails[selectedPlan]?.subPlans && planDetails[selectedPlan].subPlans[selectedSubPlan] && (
                <div className="row">
                  <div className="col-md-6">
                    <ul className="features-list">
                      {planDetails[selectedPlan].subPlans[selectedSubPlan].features1.map((feature, index) => (
                        <li key={`col1-${index}`}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="col-md-6">
                    <ul className="features-list">
                      {planDetails[selectedPlan].subPlans[selectedSubPlan].features2.map((feature, index) => (
                        <li key={`col2-${index}`}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}


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
                    window.fbq('trackCustom', 'ClickEmpezarPago', {
                      plan: selectedPlan,
                    });
                    setShowBankDetails(false); // Oculta datos bancarios
                    handlePayment();
                  }}
                  disabled={loading}
                >
                  <FaCreditCard className="icon-card-pulse" /> {/* ¡Clase actualizada aquí! */}
                  {loading ? 'Procesando...' : 'PAGAR CON TARJETA'}
                </button>

                <a
                  href="#reserva"
                  className={`btn-link ${showError ? 'text-danger' : ''} d-flex align-items-center gap-2`}
                  onClick={(e) => {
                    e.preventDefault();
                    setShowBankDetails(!showBankDetails);
                    setShowForm(false); // Asegura que el formulario esté oculto
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <FaExchangeAlt />
                  {showBankDetails ? 'Ocultar datos de transferencia ↑' : 'PAGAR CON TRANSFERENCIA ↓'}
                </a>

              </div>
              {showForm && (
                <>
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


                </>
              )}
              {/* Datos bancarios - ahora independiente del formulario */}
              {showBankDetails && (
                <div className="mt-4 p-3 border rounded bg-light">
                  <p className="fw-bold mb-2">
                    Si lo prefieres, puedes realizar el pago por transferencia bancaria a la siguiente cuenta:
                  </p>
                  <ul className="list-unstyled mb-0">
                    <li><strong>Banco:</strong> Pichincha</li>
                    <li><strong>Nombres:</strong> Christopher Alexander Gallardo Campos</li>
                    <li><strong>Cédula:</strong> 1727155671</li>
                    <li><strong>N° de cuenta:</strong> 2212385867</li>
                    <li><strong>Tipo de cuenta:</strong> Ahorros</li>
                    <li><strong>Celular:</strong> 0979046329</li>
                  </ul>
                  <p className="fw-bold mb-2 mt-2">
                    Por favor enviar el comprobante al WhatsApp: 0979046329
                  </p>
                </div>
              )}


            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AffiliationSection;
