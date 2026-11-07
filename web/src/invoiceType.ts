type Invoicestatus = 'pending' | 'paid';

interface Customer {
  id: number;
  name: string;
  email: string;
}

 export interface Invoice {
  id: number;
  amount: number;
  status: Invoicestatus;
  issueDate: string;
  dueDate: string;
  customer: Customer;
}