const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors({
  origin: 'https://undercodeec.com'
}));

app.use(express.json());

const TOKEN = process.env.PAYPHONE_TOKEN;
const STORE_ID = process.env.PAYPHONE_STORE_ID;

app.post('/api/create-payment', async (req, res) => {
  const { amount, planName } = req.body;

  // ID único con máximo 15 caracteres
  const crypto = require('crypto');
  const clientTransactionId = crypto.randomBytes(8).toString('hex').substring(0, 15);
  


  try {
    const response = await axios.post(
      'https://pay.payphonetodoesposible.com/api/Links',
      {
        amount: amount * 100,
        amountWithoutTax: amount * 100,
        clientTransactionId,
        currency: 'USD',
        storeId: STORE_ID,
        reference: `Pago de plan: ${planName}`,
      },
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (process.env.NODE_ENV !== 'production') {
      console.log('Respuesta completa de PayPhone:', response.data);
    }
    
    const paymentLink = typeof response.data === 'string' ? response.data : null;

    if (!paymentLink) {
      return res.status(500).json({ error: 'No se recibió el link de pago desde PayPhone' });
    }

    res.json({ paymentUrl: paymentLink });
  } catch (error) {
    console.error('Error al crear el link:', error.response?.data || error.message);
    res.status(500).json({ error: 'Error al generar link de pago' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  } else {
    console.log(`Servidor iniciado en puerto ${PORT}`);
  }
});

