import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Calendar,
  Video,
  FileText,
  MessageSquare,
  Bell,
  CreditCard,
  Shield,
  Smartphone,
  Clock,
  Users,
  Pill,
  Activity,
} from 'lucide-react';

const features = [
  {
    icon: Calendar,
    title: 'Smart Appointment Scheduling',
    description: 'Book appointments with ease using our intelligent scheduling system. View doctor availability in real-time, receive automated reminders, and reschedule with just a few clicks.',
    highlights: ['Real-time availability', 'Automated reminders', 'Easy rescheduling'],
  },
  {
    icon: Video,
    title: 'Telemedicine Consultations',
    description: 'Connect with healthcare providers through secure, HD video consultations. Get medical advice from the comfort of your home without compromising on quality of care.',
    highlights: ['HD video calls', 'Screen sharing', 'Digital prescriptions'],
  },
  {
    icon: FileText,
    title: 'Digital Medical Records',
    description: 'Access your complete medical history anytime, anywhere. Store prescriptions, lab results, imaging reports, and more in one secure location.',
    highlights: ['Secure storage', 'Easy sharing', 'Complete history'],
  },
  {
    icon: Pill,
    title: 'E-Prescriptions',
    description: 'Receive digital prescriptions directly from your doctor. Send them to any pharmacy or get medications delivered to your doorstep.',
    highlights: ['Digital delivery', 'Pharmacy integration', 'Refill reminders'],
  },
  {
    icon: MessageSquare,
    title: 'Secure Messaging',
    description: 'Communicate directly with your healthcare team through our encrypted messaging system. Ask questions, share updates, and receive guidance.',
    highlights: ['End-to-end encryption', 'File sharing', 'Quick responses'],
  },
  {
    icon: Bell,
    title: 'Smart Notifications',
    description: 'Stay informed with intelligent notifications about appointments, medication reminders, lab results, and important health updates.',
    highlights: ['Appointment reminders', 'Medication alerts', 'Result notifications'],
  },
  {
    icon: CreditCard,
    title: 'Seamless Payments',
    description: 'Handle all healthcare payments in one place. View bills, pay online, track insurance claims, and manage your healthcare expenses.',
    highlights: ['Multiple payment methods', 'Insurance integration', 'Payment history'],
  },
  {
    icon: Activity,
    title: 'Health Monitoring',
    description: 'Track vital signs, symptoms, and health metrics over time. Share data with your doctors for better-informed care decisions.',
    highlights: ['Vital tracking', 'Symptom logging', 'Progress charts'],
  },
];

export default function Features() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/10">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Powerful Features for Modern Healthcare</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Everything you need to manage your health journey in one comprehensive platform.
          </p>
          <Button size="lg" asChild>
            <Link to="/register">Get Started Free</Link>
          </Button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature) => (
              <Card key={feature.title} className="overflow-hidden">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Enterprise-Grade Security</h2>
              <p className="text-muted-foreground mb-6">
                Your health data is precious. We protect it with industry-leading security measures and full HIPAA compliance.
              </p>
              <ul className="space-y-4">
                {[
                  { icon: Shield, text: 'HIPAA Compliant Infrastructure' },
                  { icon: Clock, text: '99.9% Uptime Guarantee' },
                  { icon: Users, text: 'Role-Based Access Control' },
                  { icon: Smartphone, text: 'Two-Factor Authentication' },
                ].map((item) => (
                  <li key={item.text} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <span className="font-medium">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl p-8 aspect-square flex items-center justify-center">
              <Shield className="h-32 w-32 text-primary" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Experience Modern Healthcare?</h2>
          <p className="text-lg opacity-90 mb-8">Start your free trial today. No credit card required.</p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/register">Create Free Account</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
