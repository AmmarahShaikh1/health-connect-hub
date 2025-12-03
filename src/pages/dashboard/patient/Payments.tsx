import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CreditCard, Download, DollarSign, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

const pendingPayments = [
  { id: 1, description: 'Consultation - Dr. Sarah Smith', date: '2024-11-28', amount: 150, dueDate: '2024-12-15' },
  { id: 2, description: 'Lab Tests - CBC, Lipid Panel', date: '2024-11-25', amount: 85, dueDate: '2024-12-10' },
];

const paymentHistory = [
  { id: 1, description: 'Consultation - Dr. Michael Chen', date: '2024-11-15', amount: 80, status: 'Paid', method: 'Credit Card' },
  { id: 2, description: 'X-Ray - Chest', date: '2024-11-20', amount: 120, status: 'Paid', method: 'Insurance' },
  { id: 3, description: 'Prescription - Lisinopril', date: '2024-11-10', amount: 25, status: 'Paid', method: 'Credit Card' },
  { id: 4, description: 'Consultation - Dr. Emily Wilson', date: '2024-10-20', amount: 120, status: 'Paid', method: 'Debit Card' },
];

const paymentMethods = [
  { id: 1, type: 'Visa', last4: '4242', expiry: '12/25', default: true },
  { id: 2, type: 'Mastercard', last4: '8888', expiry: '06/26', default: false },
];

export default function Payments() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Payments & Billing</h1>
        <p className="text-muted-foreground">Manage your healthcare payments and billing history</p>
      </div>

      {/* Summary Cards */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Outstanding Balance</p>
                <p className="text-3xl font-bold text-destructive">$235.00</p>
              </div>
              <div className="p-3 rounded-full bg-destructive/10">
                <AlertCircle className="h-5 w-5 text-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Paid This Month</p>
                <p className="text-3xl font-bold text-success">$345.00</p>
              </div>
              <div className="p-3 rounded-full bg-success/10">
                <CheckCircle2 className="h-5 w-5 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Insurance Coverage</p>
                <p className="text-3xl font-bold">80%</p>
              </div>
              <div className="p-3 rounded-full bg-primary/10">
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList>
          <TabsTrigger value="pending">Pending ({pendingPayments.length})</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="methods">Payment Methods</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="mt-6 space-y-4">
          {pendingPayments.map((payment) => (
            <Card key={payment.id}>
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center shrink-0">
                    <Clock className="h-6 w-6 text-warning" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{payment.description}</h3>
                    <p className="text-sm text-muted-foreground">
                      Service date: {new Date(payment.date).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Due by: {new Date(payment.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">${payment.amount.toFixed(2)}</p>
                    <Button size="sm" className="mt-2">Pay Now</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          <Card className="bg-muted/50">
            <CardContent className="p-4 text-center">
              <p className="text-muted-foreground mb-2">Total Outstanding: <strong className="text-foreground">$235.00</strong></p>
              <Button>Pay All Outstanding</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg">Payment History</CardTitle>
                <CardDescription>Your past transactions</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paymentHistory.map((payment) => (
                  <div key={payment.id} className="flex items-center gap-4 pb-4 border-b last:border-0 last:pb-0">
                    <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="h-5 w-5 text-success" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{payment.description}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(payment.date).toLocaleDateString()} • {payment.method}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${payment.amount.toFixed(2)}</p>
                      <Badge variant="secondary">{payment.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="methods" className="mt-6 space-y-4">
          {paymentMethods.map((method) => (
            <Card key={method.id}>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                    <CreditCard className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">{method.type} •••• {method.last4}</p>
                      {method.default && <Badge>Default</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground">Expires {method.expiry}</p>
                  </div>
                  <div className="flex gap-2">
                    {!method.default && (
                      <Button size="sm" variant="outline">Set Default</Button>
                    )}
                    <Button size="sm" variant="ghost" className="text-destructive">Remove</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          <Button variant="outline" className="w-full">
            <CreditCard className="mr-2 h-4 w-4" />
            Add New Payment Method
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
}
