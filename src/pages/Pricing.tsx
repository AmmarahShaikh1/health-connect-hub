import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, X } from 'lucide-react';

const plans = [
  {
    name: 'Basic',
    description: 'Perfect for individuals managing personal health',
    price: 'Free',
    period: 'forever',
    features: [
      { name: 'Book up to 3 appointments/month', included: true },
      { name: 'Digital medical records', included: true },
      { name: 'Appointment reminders', included: true },
      { name: 'Basic health tracking', included: true },
      { name: 'Email support', included: true },
      { name: 'Video consultations', included: false },
      { name: 'Priority booking', included: false },
      { name: 'Family accounts', included: false },
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Pro',
    description: 'Ideal for active healthcare management',
    price: '$19',
    period: '/month',
    features: [
      { name: 'Unlimited appointments', included: true },
      { name: 'Digital medical records', included: true },
      { name: 'Smart reminders & notifications', included: true },
      { name: 'Advanced health tracking', included: true },
      { name: 'Video consultations (10/month)', included: true },
      { name: 'Priority booking', included: true },
      { name: '24/7 chat support', included: true },
      { name: 'Family accounts (up to 4)', included: false },
    ],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Clinic',
    description: 'For healthcare providers and clinics',
    price: '$99',
    period: '/month',
    features: [
      { name: 'Unlimited appointments', included: true },
      { name: 'Patient management system', included: true },
      { name: 'E-prescription system', included: true },
      { name: 'Unlimited video consultations', included: true },
      { name: 'Custom branding', included: true },
      { name: 'Analytics dashboard', included: true },
      { name: 'API access', included: true },
      { name: 'Dedicated account manager', included: true },
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

const faqs = [
  {
    q: 'Can I change plans later?',
    a: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.',
  },
  {
    q: 'Is there a free trial?',
    a: 'Yes! Pro and Clinic plans come with a 14-day free trial. No credit card required to start.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept all major credit cards, PayPal, and bank transfers for annual plans.',
  },
  {
    q: 'Is my data secure?',
    a: 'Absolutely. We are fully HIPAA compliant and use enterprise-grade encryption for all data.',
  },
];

export default function Pricing() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/10">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Simple, Transparent Pricing</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that best fits your healthcare needs. All plans include core features.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan) => (
              <Card 
                key={plan.name} 
                className={`relative ${plan.popular ? 'border-primary shadow-lg scale-105' : ''}`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Most Popular</Badge>
                )}
                <CardHeader className="text-center pb-2">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-6">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature) => (
                      <li key={feature.name} className="flex items-start gap-3">
                        {feature.included ? (
                          <Check className="h-5 w-5 text-success shrink-0" />
                        ) : (
                          <X className="h-5 w-5 text-muted-foreground shrink-0" />
                        )}
                        <span className={feature.included ? '' : 'text-muted-foreground'}>
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full" 
                    variant={plan.popular ? 'default' : 'outline'}
                    asChild
                  >
                    <Link to="/register">{plan.cta}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {faqs.map((faq) => (
              <div key={faq.q}>
                <h3 className="font-semibold mb-2">{faq.q}</h3>
                <p className="text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Need a Custom Solution?</h2>
          <p className="text-lg opacity-90 mb-8">
            Contact us for enterprise pricing and custom features tailored to your organization.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/contact">Contact Sales</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
