import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, ArrowUp, Mic, Camera, TrendingUp, Shield, Globe, Users, Plus } from "lucide-react";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { AuthModal } from "@/components/auth/AuthModal";
import { TransactionForm } from "@/components/transactions/TransactionForm";
import { MetricsCards } from "@/components/dashboard/MetricsCards";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { VoiceRecorder } from "@/components/voice/VoiceRecorder";
import { ReceiptScanner } from "@/components/receipt/ReceiptScanner";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
};

const MainApp = () => {
  const { user, loading, signOut } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const [showVoiceRecorder, setShowVoiceRecorder] = useState(false);
  const [showReceiptScanner, setShowReceiptScanner] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (user) {
    return <Dashboard 
              onShowTransactionForm={() => setShowTransactionForm(true)} 
              showTransactionForm={showTransactionForm}
              onCloseTransactionForm={() => setShowTransactionForm(false)}
              showVoiceRecorder={showVoiceRecorder}
              onShowVoiceRecorder={() => setShowVoiceRecorder(true)}
              onCloseVoiceRecorder={() => setShowVoiceRecorder(false)}
              showReceiptScanner={showReceiptScanner}
              onShowReceiptScanner={() => setShowReceiptScanner(true)}
              onCloseReceiptScanner={() => setShowReceiptScanner(false)}
            />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header onSignIn={() => { setAuthMode('signin'); setAuthModalOpen(true); }}
              onSignUp={() => { setAuthMode('signup'); setAuthModalOpen(true); }} />
      <Hero onGetStarted={() => { setAuthMode('signup'); setAuthModalOpen(true); }} />
      <Features />
      <Footer />
      <AuthModal 
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
      />
    </div>
  );
};

const Header = ({ onSignIn, onSignUp }: { onSignIn: () => void; onSignUp: () => void }) => (
  <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
    <div className="container mx-auto px-4 py-4 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
          <TrendingUp className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-bold text-slate-800">VibeLedger</span>
      </div>
      <nav className="hidden md:flex space-x-6">
        <Link to="/pricing" className="text-slate-600 hover:text-blue-600 transition-colors">Pricing</Link>
        <Link to="/about" className="text-slate-600 hover:text-blue-600 transition-colors">About</Link>
      </nav>
      <div className="space-x-2">
        <Button variant="ghost" className="text-slate-600" onClick={onSignIn}>Sign In</Button>
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={onSignUp}>Get Started</Button>
      </div>
    </div>
  </header>
);

const Hero = ({ onGetStarted }: { onGetStarted: () => void }) => (
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
        onClick={onGetStarted}
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
            <li><Link to="/pricing" className="hover:text-white">Pricing</Link></li>
            <li><a href="#features" className="hover:text-white">Features</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-slate-400">
            <li><Link to="/about" className="hover:text-white">About</Link></li>
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

const Dashboard = ({ 
  onShowTransactionForm, 
  showTransactionForm, 
  onCloseTransactionForm,
  showVoiceRecorder,
  onShowVoiceRecorder,
  onCloseVoiceRecorder,
  showReceiptScanner,
  onShowReceiptScanner,
  onCloseReceiptScanner
}: {
  onShowTransactionForm: () => void;
  showTransactionForm: boolean;
  onCloseTransactionForm: () => void;
  showVoiceRecorder: boolean;
  onShowVoiceRecorder: () => void;
  onCloseVoiceRecorder: () => void;
  showReceiptScanner: boolean;
  onShowReceiptScanner: () => void;
  onCloseReceiptScanner: () => void;
}) => {
  const { user, signOut } = useAuth();

  const handleVoiceTranscription = (text: string) => {
    // Parse voice input and auto-fill transaction form
    console.log('Voice transcription:', text);
    onCloseVoiceRecorder();
    onShowTransactionForm();
  };

  const handleReceiptScan = (data: any) => {
    // Auto-fill transaction form with scanned data
    console.log('Receipt scan result:', data);
    onCloseReceiptScanner();
    onShowTransactionForm();
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardHeader onSignOut={signOut} />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome back, {user?.user_metadata?.full_name || 'Trader'}!</h1>
          <p className="text-slate-600">Here's your trading performance today.</p>
        </div>
        
        <MetricsCards />
        
        <div className="grid lg:grid-cols-2 gap-6">
          <div>
            <RecentTransactions />
          </div>
          
          <div className="space-y-4">
            {showTransactionForm && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Add Transaction</h2>
                  <Button variant="outline" onClick={onCloseTransactionForm}>Cancel</Button>
                </div>
                <TransactionForm onSuccess={onCloseTransactionForm} />
              </div>
            )}

            {showVoiceRecorder && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Voice Entry</h2>
                  <Button variant="outline" onClick={onCloseVoiceRecorder}>Cancel</Button>
                </div>
                <VoiceRecorder onTranscription={handleVoiceTranscription} />
              </div>
            )}

            {showReceiptScanner && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Scan Receipt</h2>
                  <Button variant="outline" onClick={onCloseReceiptScanner}>Cancel</Button>
                </div>
                <ReceiptScanner onScanResult={handleReceiptScan} />
              </div>
            )}

            {!showTransactionForm && !showVoiceRecorder && !showReceiptScanner && (
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Add new entries with ease</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <Button 
                      className="w-full bg-blue-600 hover:bg-blue-700" 
                      size="lg"
                      onClick={onShowTransactionForm}
                    >
                      <Plus className="w-5 h-5 mr-2" />
                      Add Transaction
                    </Button>
                    <Button 
                      className="w-full bg-green-600 hover:bg-green-700" 
                      size="lg"
                      onClick={onShowVoiceRecorder}
                    >
                      <Mic className="w-5 h-5 mr-2" />
                      Record with Voice
                    </Button>
                    <Button 
                      className="w-full bg-purple-600 hover:bg-purple-700" 
                      size="lg"
                      onClick={onShowReceiptScanner}
                    >
                      <Camera className="w-5 h-5 mr-2" />
                      Scan Receipt
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const DashboardHeader = ({ onSignOut }: { onSignOut: () => void }) => (
  <header className="bg-white border-b border-slate-200">
    <div className="container mx-auto px-4 py-4 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
          <TrendingUp className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-bold text-slate-800">VibeLedger</span>
      </div>
      <nav className="hidden md:flex space-x-6">
        <Link to="/" className="text-slate-900 font-medium">Dashboard</Link>
        <Link to="/transactions" className="text-slate-600 hover:text-slate-900">Transactions</Link>
        <Link to="/reports" className="text-slate-600 hover:text-slate-900">Reports</Link>
        <Link to="/settings" className="text-slate-600 hover:text-slate-900">Settings</Link>
      </nav>
      <Button variant="outline" size="sm" onClick={onSignOut}>
        Sign Out
      </Button>
    </div>
  </header>
);

export default Index;
