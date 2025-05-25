
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, TrendingUp, Shield, Globe, Users, Mic, Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => navigate('/')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <h1 className="text-2xl font-bold text-slate-900">About VibeLedger</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Empowering Small Traders with Smart Financial Tracking
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              VibeLedger is designed specifically for small traders who want to maximize profits and minimize time spent on bookkeeping.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mic className="w-6 h-6 mr-3 text-green-600" />
                  Voice-Powered Entry
                </CardTitle>
                <CardDescription>
                  Simply say "Sold 5 apples for $20" and watch your transaction get logged instantly with AI-powered voice recognition.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Camera className="w-6 h-6 mr-3 text-blue-600" />
                  Smart Receipt Scanning
                </CardTitle>
                <CardDescription>
                  Snap a photo of any receipt and let our AI automatically extract and categorize expense information for you.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-6 h-6 mr-3 text-purple-600" />
                  AI-Powered Insights
                </CardTitle>
                <CardDescription>
                  Get personalized tips and recommendations to boost your trading profits based on your transaction patterns.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-6 h-6 mr-3 text-red-600" />
                  Bank-Level Security
                </CardTitle>
                <CardDescription>
                  Your financial data is encrypted and protected with enterprise-grade security, giving you peace of mind.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          <Card className="mb-16">
            <CardHeader>
              <CardTitle>Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-4">
                We believe that every small trader deserves access to powerful financial tools that were once only available to large corporations. VibeLedger democratizes financial tracking by making it simple, intelligent, and accessible to everyone.
              </p>
              <p className="text-slate-600 mb-4">
                Our team has worked with traders across Africa and understands the unique challenges faced by small business owners. We've built VibeLedger to address these specific needs with features like:
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-2">
                <li>Multi-language support including English and Swahili</li>
                <li>Offline functionality for areas with unreliable internet</li>
                <li>SMS and WhatsApp integration for real-time notifications</li>
                <li>Simple, intuitive interface designed for non-technical users</li>
                <li>Affordable pricing that scales with your business</li>
              </ul>
            </CardContent>
          </Card>

          <div className="text-center">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Ready to Transform Your Business?</h3>
            <p className="text-slate-600 mb-6">
              Join thousands of traders who are already using VibeLedger to grow their profits.
            </p>
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => navigate('/')}
            >
              Get Started Today
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
