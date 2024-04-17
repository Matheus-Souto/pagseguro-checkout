import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const token = process.env.PAGSEGURO_TOKEN;

const app = express();
app.use(cors());

app.get('/PaymentController', async function (req, res) {
    let reqs = await fetch("https://sandbox.api.pagseguro.com/orders", {
        method: 'POST',
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "reference_id": "ex-00001",
            "customer": {
                "name": "Jose da Silva",
                "email": "email@test.com",
                "tax_id": "12345678909",
                "phones": [
                    {
                        "country": "55",
                        "area": "11",
                        "number": "999999999",
                        "type": "MOBILE"
                    }
                ]
            },
            "items": [
                {
                    "reference_id": "referencia do item",
                    "name": "nome do item",
                    "quantity": 1,
                    "unit_amount": 500
                }
            ],
            "shipping": {
                "address": {
                    "street": "Avenida Brigadeiro Faria Lima",
                    "number": "1384",
                    "complement": "apto 12",
                    "locality": "Pinheiros",
                    "city": "São Paulo",
                    "region_code": "SP",
                    "country": "BRA",
                    "postal_code": "01452002"
                }
            },
            // "notification_urls": [
            //     "https://meusite.com/notificacoes"
            // ],
            "charges": [
                {
                    "reference_id": "referencia da cobranca",
                    "description": "descricao da cobranca",
                    "amount": {
                        "value": 500,
                        "currency": "BRL"
                    },
                    "payment_method": {
                        "soft_descriptor": "DEV",
                        "type": "CREDIT_CARD",
                        "installments": 1,
                        "capture": true,
                        "card": {
                            "encrypted": "n+FyVMZHcuL4EXYeZC9PU9Ey9CXjF7XXDesvTKpU1cAsjJput6hHk2dzRqnx4FVJOCpfLfGdgbRr9mFkqXS0C8ANG/Kv5AnmJBz5710N6RhSBZIQZEOHvJVbkWEpG/cFFYVYH68bTs+1HnBizfNOk5VUX5fLVWOgpZ2kEF6eAIu34Dzajlsj96crVv4aOx31aQszUswi87NMcGSgIMWo0ePSab6vzqlYKlOgKJBNAt2u7y7r315hyY5j0NgB5D2pg8g6vrl8+Sj1yo9tWn3C4Hf2JOxGgqyidwJxJtAz64ooxCD0pJlx9aLOfbH7fWTCtn96lPdbIBOWcRXtgCPM7g==",
                            "store": true
                        },
                        "holder": {
                            "name": "Jose da Silva",
                            "tax_id": "12345678909"
                        }
                    }
                }
            ]
        })
    });
    let ress = await reqs.json();
    console.log(ress);
});
app.listen(3000, (req, res) => {
    console.log('Server is running on port 3000');
})