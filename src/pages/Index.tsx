
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, ArrowUp, Mic, Camera, TrendingUp, Shield, Globe, Users } from "lucide-react";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (isLoggedIn) {
    return <Dashboard />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      <Hero setIsLoggedIn={setIsLoggedIn} />
      <Features />
      <Footer />
    </div>
  );
};

const Header = () => (
  <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
    <div className="container mx-auto px-4 py-4 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
          <TrendingUp className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-bold text-slate-800">VibeLedger</span>
      </div>
      <nav className="hidden md:flex space-x-6">
        <a href="#features" className="text-slate-600 hover:text-blue-600 transition-colors">Features</a>
        <a href="#pricing" className="text-slate-600 hover:text-blue-600 transition-colors">Pricing</a>
        <a href="#about" className="text-slate-600 hover:text-blue-600 transition-colors">About</a>
      </nav>
      <div className="space-x-2">
        <Button variant="ghost" className="text-slate-600">Sign In</Button>
        <Button className="bg-blue-600 hover:bg-blue-700">Get Started</Button>
      </div>
    </div>
  </header>
);

const Hero = ({ setIsLoggedIn }: { setIsLoggedIn: (value: boolean) => void }) => (
  <section className="container mx-auto px-4 py-20 text-center">
    <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200">
      🚀 Now with AI-powered insights
    </Badge>
    <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
      Track Your Trading <br />
      <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
        Profits in Real-Time
      </span>
    </h1>
    <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
      Voice-powered expense tracking, photo receipt scanning, and AI insights 
      to help small traders maximize their profits and minimize their losses.
    </p>
    <div className="space-x-4">
      <Button 
        size="lg" 
        className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3"
        onClick={() => setIsLoggedIn(true)}
      >
        Start Trading Smarter
      </Button>
      <Button size="lg" variant="outline" className="text-lg px-8 py-3">
        Watch Demo
      </Button>
    </div>
    
    <div className="mt-16 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
      <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
          <Mic className="w-6 h-6 text-green-600" />
        </div>
        <h3 className="font-semibold text-slate-900 mb-2">Voice Entry</h3>
        <p className="text-slate-600 text-sm text-center">
          "Sold 5 apples for $20" - and it's logged instantly
        </p>
      </div>
      
      <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
          <Camera className="w-6 h-6 text-blue-600" />
        </div>
        <h3 className="font-semibold text-slate-900 mb-2">Photo Scanning</h3>
        <p className="text-slate-600 text-sm text-center">
          Snap receipts and auto-categorize expenses with AI
        </p>
      </div>
      
      <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
          <TrendingUp className="w-6 h-6 text-purple-600" />
        </div>
        <h3 className="font-semibold text-slate-900 mb-2">AI Insights</h3>
        <p className="text-slate-600 text-sm text-center">
          Get personalized tips to boost your trading profits
        </p>
      </div>
    </div>
  </section>
);

const Features = () => (
  <section id="features" className="py-20 bg-white">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-slate-900 mb-4">
          Everything You Need to Succeed
        </h2>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Built specifically for small traders who want to maximize profits and minimize time spent on bookkeeping.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <FeatureCard
          icon={<Shield className="w-6 h-6" />}
          title="Bank-Level Security"
          description="Your financial data is encrypted and protected with enterprise-grade security."
          color="blue"
        />
        <FeatureCard
          icon={<Globe className="w-6 h-6" />}
          title="Multi-Language Support"
          description="Available in English and Swahili with localized voice commands."
          color="green"
        />
        <FeatureCard
          icon={<Users className="w-6 h-6" />}
          title="Team Collaboration"
          description="Share access with partners or accountants for seamless collaboration."
          color="purple"
        />
      </div>
    </div>
  </section>
);

const FeatureCard = ({ icon, title, description, color }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: 'blue' | 'green' | 'purple';
}) => {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600'
  };

  return (
    <Card className="border-slate-200 hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${colorClasses[color]}`}>
          {icon}
        </div>
        <CardTitle className="text-slate-900">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-slate-600">{description}</CardDescription>
      </CardContent>
    </Card>
  );
};

const Dashboard = () => (
  <div className="min-h-screen bg-slate-50">
    <DashboardHeader />
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome back, Trader!</h1>
        <p className="text-slate-600">Here's your trading performance today.</p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <MetricCard
          title="Today's Profit"
          value="$284.50"
          change="+12.5%"
          trend="up"
          color="green"
        />
        <MetricCard
          title="Total Income"
          value="$1,247.80"
          change="+8.2%"
          trend="up"
          color="blue"
        />
        <MetricCard
          title="Total Expenses"
          value="$963.30"
          change="-2.1%"
          trend="down"
          color="red"
        />
      </div>
      
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Your latest trading activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <TransactionItem
                description="Sold vegetables at market"
                amount="+$45.00"
                time="2 hours ago"
                type="income"
              />
              <TransactionItem
                description="Transportation costs"
                amount="-$12.50"
                time="4 hours ago"
                type="expense"
              />
              <TransactionItem
                description="Fruit sales"
                amount="+$78.20"
                time="6 hours ago"
                type="income"
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Add new entries with ease</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <Button className="w-full bg-green-600 hover:bg-green-700" size="lg">
                <Mic className="w-5 h-5 mr-2" />
                Record Income
              </Button>
              <Button className="w-full bg-red-600 hover:bg-red-700" size="lg">
                <Camera className="w-5 h-5 mr-2" />
                Scan Receipt
              </Button>
              <Button variant="outline" className="w-full" size="lg">
                Manual Entry
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
);

const DashboardHeader = () => (
  <header className="bg-white border-b border-slate-200">
    <div className="container mx-auto px-4 py-4 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
          <TrendingUp className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-bold text-slate-800">VibeLedger</span>
      </div>
      <nav className="hidden md:flex space-x-6">
        <a href="#" className="text-slate-900 font-medium">Dashboard</a>
        <a href="#" className="text-slate-600 hover:text-slate-900">Transactions</a>
        <a href="#" className="text-slate-600 hover:text-slate-900">Reports</a>
        <a href="#" className="text-slate-600 hover:text-slate-900">Settings</a>
      </nav>
      <Button variant="outline" size="sm">
        Profile
      </Button>
    </div>
  </header>
);

const MetricCard = ({ title, value, change, trend, color }: {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  color: 'green' | 'blue' | 'red';
}) => {
  const colorClasses = {
    green: 'text-green-600',
    blue: 'text-blue-600',
    red: 'text-red-600'
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-600 text-sm font-medium">{title}</p>
            <p className={`text-2xl font-bold ${colorClasses[color]}`}>{value}</p>
          </div>
          <div className="flex items-center space-x-1">
            {trend === 'up' ? (
              <ArrowUp className="w-4 h-4 text-green-500" />
            ) : (
              <ArrowDown className="w-4 h-4 text-red-500" />
            )}
            <span className={`text-sm font-medium ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
              {change}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const TransactionItem = ({ description, amount, time, type }: {
  description: string;
  amount: string;
  time: string;
  type: 'income' | 'expense';
}) => (
  <div className="flex items-center justify-between py-2">
    <div>
      <p className="font-medium text-slate-900">{description}</p>
      <p className="text-sm text-slate-500">{time}</p>
    </div>
    <span className={`font-semibold ${type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
      {amount}
    </span>
  </div>
);

const Footer = () => (
  <footer className="bg-slate-900 text-white py-12">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">VibeLedger</span>
          </div>
          <p className="text-slate-400">
            Empowering small traders with smart financial tracking.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Product</h4>
          <ul className="space-y-2 text-slate-400">
            <li><a href="#" className="hover:text-white">Features</a></li>
            <li><a href="#" className="hover:text-white">Pricing</a></li>
            <li><a href="#" className="hover:text-white">API</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-slate-400">
            <li><a href="#" className="hover:text-white">About</a></li>
            <li><a href="#" className="hover:text-white">Blog</a></li>
            <li><a href="#" className="hover:text-white">Careers</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Support</h4>
          <ul className="space-y-2 text-slate-400">
            <li><a href="#" className="hover:text-white">Help Center</a></li>
            <li><a href="#" className="hover:text-white">Contact</a></li>
            <li><a href="#" className="hover:text-white">Privacy</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
        <p>&copy; 2024 VibeLedger. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Index;
