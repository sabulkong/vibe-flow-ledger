
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Check, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Pricing = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: "Starter",
      price: "Free",
      period: "forever",
      description: "Perfect for getting started with basic tracking",
      features: [
        "Up to 50 transactions per month",
        "Basic voice entry",
        "Simple dashboard",
        "Email support",
        "Mobile app access"
      ],
      popular: false
    },
    {
      name: "Pro",
      price: "$9",
      period: "per month",
      description: "Ideal for growing businesses with advanced needs",
      features: [
        "Unlimited transactions",
        "Advanced voice recognition",
        "AI-powered insights",
        "Receipt scanning (OCR)",
        "SMS/WhatsApp notifications",
        "Advanced reports",
        "Priority support",
        "Multi-language support"
      ],
      popular: true
    },
    {
      name: "Business",
      price: "$19",
      period: "per month",
      description: "For established traders with team collaboration needs",
      features: [
        "Everything in Pro",
        "Team collaboration (up to 5 users)",
        "Custom categories",
        "API access",
        "White-label receipts",
        "Advanced analytics",
        "Phone support",
        "Custom integrations"
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => navigate('/')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <h1 className="text-2xl font-bold text-slate-900">Pricing Plans</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Choose the Perfect Plan for Your Business
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Start free and upgrade as your business grows. All plans include our core features with no hidden fees.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'border-blue-500 shadow-lg scale-105' : 'border-slate-200'}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white px-4 py-1">
                      <Star className="w-3 h-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
                    {plan.price !== "Free" && <span className="text-slate-600 ml-1">/{plan.period}</span>}
                  </div>
                  <CardDescription className="mt-2">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="w-4 h-4 text-green-600 mr-3 flex-shrink-0" />
                        <span className="text-slate-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : 'bg-slate-600 hover:bg-slate-700'}`}
                    onClick={() => navigate('/')}
                  >
                    {plan.price === "Free" ? "Get Started" : "Start Free Trial"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-white rounded-2xl p-8 border border-slate-200">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Frequently Asked Questions</h3>
              <p className="text-slate-600">Everything you need to know about our pricing</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Can I change plans anytime?</h4>
                <p className="text-slate-600 mb-4">Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
                
                <h4 className="font-semibold text-slate-900 mb-2">Is there a free trial?</h4>
                <p className="text-slate-600">All paid plans come with a 14-day free trial. No credit card required to start.</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">What payment methods do you accept?</h4>
                <p className="text-slate-600 mb-4">We accept all major credit cards, PayPal, and mobile money (M-Pesa, Airtel Money).</p>
                
                <h4 className="font-semibold text-slate-900 mb-2">Do you offer discounts for annual plans?</h4>
                <p className="text-slate-600">Yes! Save 20% when you pay annually for Pro or Business plans.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
