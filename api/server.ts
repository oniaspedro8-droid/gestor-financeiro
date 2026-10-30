import express, { response } from 'express';
import { request } from 'node:http';

const app = express();

type Invoicestatus = 'pending' | 'paid';

interface Customer {
    id: number,
    name: string,
    email: string;
}

interface Invoice {
    id: number,
    amount: number,
    status: Invoicestatus,
    issueDate: string,
    dueDate: string,
    customer: Customer;
}

const invoices: Invoice[] = [{
    id: 1,
    amount: 125037,
    status: 'pending',
    issueDate: '2026-09-25',
    dueDate: '2026-10-20',
    customer: {
        id: 7,
        name: 'Construtora Meridiano',
        email: 'Contato@meridiano.com.br',
    }
}, {
    id: 2,
    amount: 35000,
    status: 'paid',
    issueDate: '2026-10-01',
    dueDate: '2026-10-31',
    customer: {
        id: 4,
        name: 'Grafica Nova',
        email: 'grafica@nova.com.br'
    }
} , {
    id: 3,
    amount: 55000,
    status: 'pending',
    issueDate: '2026-10-20',
    dueDate: '2026-11-25',
    customer: {
        id: 15,
        name: 'tenditudo',
        email: 'comercial@tenditudo.com.br'
    }
}];

app.get('/api/health', (request, response) => {
    response.status(200).json({status: 'ok'});
});

app.get('/api/invoices', (request, response) => {
    response.status(200).json(invoices);
});

app.get('/api/invoices/:id', (request, response) => {
    const id = +request.params.id;

const invoice = invoices.find(invoice => invoice.id === id );

if (!invoice) response.status(404).json({error: {
    status: 404,
    message: 'Fatura não encontrada.'
}});

    response.status(200).json(invoice);
});

app.use((request, response) => {
    response.status(404).json({error: {
        status: 404,
        message: 'Recurso não encontrado.'
    }});
});

app.listen(3000);