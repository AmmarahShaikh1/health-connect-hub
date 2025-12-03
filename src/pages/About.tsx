import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Target, Eye, Users, Award, Globe } from 'lucide-react';

const values = [
  {
    icon: Heart,
    title: 'Patient-First',
    description: 'Every feature we build starts with the question: how does this improve patient care?',
  },
  {
    icon: Target,
    title: 'Innovation',
    description: 'We continuously push the boundaries of healthcare technology to deliver better solutions.',
  },
  {
    icon: Eye,
    title: 'Transparency',
    description: 'Clear communication and honest practices are at the core of everything we do.',
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'We work closely with healthcare providers to understand and meet their needs.',
  },
];

const stats = [
  { value: '2019', label: 'Founded' },
  { value: '50K+', label: 'Active Users' },
  { value: '1,200+', label: 'Healthcare Providers' },
  { value: '15', label: 'Countries Served' },
];

const team = [
  { name: 'Dr. Sarah Chen', role: 'CEO & Co-founder', bio: 'Former Chief Medical Officer with 15+ years in healthcare technology.' },
  { name: 'James Wilson', role: 'CTO', bio: 'Ex-Google engineer specializing in secure healthcare systems.' },
  { name: 'Dr. Michael Roberts', role: 'Chief Medical Advisor', bio: 'Board-certified physician and digital health advocate.' },
  { name: 'Emily Thompson', role: 'Head of Product', bio: 'Product leader with experience at leading health-tech startups.' },
];

export default function About() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/10">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Mission</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            To make quality healthcare accessible to everyone through innovative technology 
            that connects patients with the right care at the right time.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  MediCare was founded in 2019 by a team of healthcare professionals and 
                  technology experts who experienced firsthand the challenges of navigating 
                  the healthcare system.
                </p>
                <p>
                  Frustrated by fragmented records, long wait times, and difficulty accessing 
                  specialists, we set out to build a platform that puts patients in control 
                  of their healthcare journey.
                </p>
                <p>
                  Today, MediCare serves over 50,000 patients and 1,200 healthcare providers 
                  across 15 countries, making quality healthcare more accessible than ever before.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl p-8 aspect-video flex items-center justify-center">
              <div className="text-center">
                <Heart className="h-16 w-16 text-primary mx-auto mb-4" />
                <p className="text-lg font-semibold">Healthcare for Everyone</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y bg-muted/30">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do at MediCare.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <Card key={value.title}>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Leadership Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Meet the people driving MediCare's mission forward.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {team.map((member) => (
              <Card key={member.name}>
                <CardContent className="p-6 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary/30 to-accent/30 rounded-full mx-auto mb-4" />
                  <h3 className="font-semibold">{member.name}</h3>
                  <p className="text-sm text-primary mb-2">{member.role}</p>
                  <p className="text-xs text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Join Us on Our Mission</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Whether you're a patient looking for better care or a provider wanting to reach more people, 
            we're here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/register">Get Started</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
