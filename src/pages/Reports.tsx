
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { ArrowLeft, Download, TrendingUp, TrendingDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from '@/integrations/supabase/client';

const Reports = () => {
  return (
    <AuthProvider>
      <ReportsPage />
    </AuthProvider>
  );
};

const ReportsPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState('month');
  const [reportData, setReportData] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    netProfit: 0,
    transactionCount: 0
  });

  useEffect(() => {
    if (!user) return;

    const fetchReportData = async () => {
      try {
        const { data } = await supabase
          .from('transactions')
          .select('type, amount')
          .eq('user_id', user.id);

        if (data) {
          const income = data.filter(t => t.type === 'income').reduce((sum, t) => sum + Number(t.amount), 0);
          const expenses = data.filter(t => t.type === 'expense').reduce((sum, t) => sum + Number(t.amount), 0);
          
          setReportData({
            totalIncome: income,
            totalExpenses: expenses,
            netProfit: income - expenses,
            transactionCount: data.length
          });
        }
      } catch (error) {
        console.error('Error fetching report data:', error);
      }
    };

    fetchReportData();
  }, [user, timeRange]);

  if (!user) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate('/')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
              <h1 className="text-2xl font-bold text-slate-900">Reports</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>
              <Button>
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Income</CardDescription>
              <CardTitle className="text-2xl text-green-600">
                ${reportData.totalIncome.toFixed(2)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-green-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span className="text-sm">+12% from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Expenses</CardDescription>
              <CardTitle className="text-2xl text-red-600">
                ${reportData.totalExpenses.toFixed(2)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-red-600">
                <TrendingDown className="w-4 h-4 mr-1" />
                <span className="text-sm">+5% from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Net Profit</CardDescription>
              <CardTitle className={`text-2xl ${reportData.netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ${reportData.netProfit.toFixed(2)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`flex items-center ${reportData.netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {reportData.netProfit >= 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                <span className="text-sm">+8% from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Transactions</CardDescription>
              <CardTitle className="text-2xl text-slate-900">
                {reportData.transactionCount}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-blue-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span className="text-sm">15 this month</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Profit & Loss Summary</CardTitle>
            <CardDescription>Detailed breakdown of your financial performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b">
                <span className="font-medium">Revenue (Sales)</span>
                <span className="text-green-600">${reportData.totalIncome.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="font-medium">Operating Expenses</span>
                <span className="text-red-600">-${reportData.totalExpenses.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b font-bold">
                <span>Net Profit</span>
                <span className={reportData.netProfit >= 0 ? 'text-green-600' : 'text-red-600'}>
                  ${reportData.netProfit.toFixed(2)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;
