import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';

const appointmentData = [
  { month: 'Jan', appointments: 420, revenue: 12500 },
  { month: 'Feb', appointments: 380, revenue: 11200 },
  { month: 'Mar', appointments: 510, revenue: 15800 },
  { month: 'Apr', appointments: 470, revenue: 14200 },
  { month: 'May', appointments: 590, revenue: 18500 },
  { month: 'Jun', appointments: 620, revenue: 19800 },
];

const specialtyData = [
  { name: 'Cardiology', value: 25, color: 'hsl(217, 91%, 60%)' },
  { name: 'General', value: 35, color: 'hsl(142, 76%, 36%)' },
  { name: 'Dermatology', value: 15, color: 'hsl(38, 92%, 50%)' },
  { name: 'Orthopedics', value: 15, color: 'hsl(0, 84%, 60%)' },
  { name: 'Neurology', value: 10, color: 'hsl(280, 60%, 50%)' },
];

const patientGrowth = [
  { month: 'Jan', patients: 8500 },
  { month: 'Feb', patients: 9200 },
  { month: 'Mar', patients: 9800 },
  { month: 'Apr', patients: 10500 },
  { month: 'May', patients: 11400 },
  { month: 'Jun', patients: 12458 },
];

export default function Analytics() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">System performance and insights</p>
        </div>
        <Select defaultValue="6months">
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Time period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">Last 7 days</SelectItem>
            <SelectItem value="30days">Last 30 days</SelectItem>
            <SelectItem value="6months">Last 6 months</SelectItem>
            <SelectItem value="year">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue', value: '$92,000', change: '+18%' },
          { label: 'Avg. Per Appointment', value: '$125', change: '+5%' },
          { label: 'Patient Retention', value: '87%', change: '+3%' },
          { label: 'Doctor Utilization', value: '78%', change: '+8%' },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-success">{stat.change} from last period</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Appointments & Revenue</CardTitle>
            <CardDescription>Monthly appointment volume and revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={appointmentData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis yAxisId="left" className="text-xs" />
                <YAxis yAxisId="right" orientation="right" className="text-xs" />
                <Tooltip />
                <Bar yAxisId="left" dataKey="appointments" fill="hsl(217, 91%, 60%)" radius={4} />
                <Bar yAxisId="right" dataKey="revenue" fill="hsl(142, 76%, 36%)" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Appointments by Specialty</CardTitle>
            <CardDescription>Distribution across departments</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={specialtyData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {specialtyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Patient Growth</CardTitle>
            <CardDescription>Total registered patients over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={patientGrowth}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="patients" 
                  stroke="hsl(217, 91%, 60%)" 
                  fill="hsl(217, 91%, 60%)" 
                  fillOpacity={0.2} 
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
