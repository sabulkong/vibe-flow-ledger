
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowDown, ArrowUp, TrendingUp } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface MetricsData {
  todayIncome: number;
  todayExpense: number;
  todayProfit: number;
  totalIncome: number;
  totalExpense: number;
}

export const MetricsCards: React.FC = () => {
  const [metrics, setMetrics] = useState<MetricsData>({
    todayIncome: 0,
    todayExpense: 0,
    todayProfit: 0,
    totalIncome: 0,
    totalExpense: 0,
  });
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const fetchMetrics = async () => {
      try {
        const today = new Date().toISOString().split('T')[0];
        
        // Fetch today's transactions
        const { data: todayData } = await supabase
          .from('transactions')
          .select('type, amount')
          .eq('user_id', user.id)
          .eq('date', today);

        // Fetch all transactions
        const { data: allData } = await supabase
          .from('transactions')
          .select('type, amount')
          .eq('user_id', user.id);

        const todayIncome = todayData?.filter(t => t.type === 'income').reduce((sum, t) => sum + Number(t.amount), 0) || 0;
        const todayExpense = todayData?.filter(t => t.type === 'expense').reduce((sum, t) => sum + Number(t.amount), 0) || 0;
        const totalIncome = allData?.filter(t => t.type === 'income').reduce((sum, t) => sum + Number(t.amount), 0) || 0;
        const totalExpense = allData?.filter(t => t.type === 'expense').reduce((sum, t) => sum + Number(t.amount), 0) || 0;

        setMetrics({
          todayIncome,
          todayExpense,
          todayProfit: todayIncome - todayExpense,
          totalIncome,
          totalExpense,
        });
      } catch (error) {
        console.error('Error fetching metrics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, [user]);

  if (loading) {
    return (
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-3 gap-6 mb-8">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium">Today's Profit</p>
              <p className={`text-2xl font-bold ${metrics.todayProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ${metrics.todayProfit.toFixed(2)}
              </p>
            </div>
            <div className="flex items-center space-x-1">
              {metrics.todayProfit >= 0 ? (
                <ArrowUp className="w-4 h-4 text-green-500" />
              ) : (
                <ArrowDown className="w-4 h-4 text-red-500" />
              )}
              <TrendingUp className="w-6 h-6 text-slate-400" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium">Total Income</p>
              <p className="text-2xl font-bold text-green-600">
                ${metrics.totalIncome.toFixed(2)}
              </p>
            </div>
            <div className="flex items-center space-x-1">
              <ArrowUp className="w-4 h-4 text-green-500" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium">Total Expenses</p>
              <p className="text-2xl font-bold text-red-600">
                ${metrics.totalExpense.toFixed(2)}
              </p>
            </div>
            <div className="flex items-center space-x-1">
              <ArrowDown className="w-4 h-4 text-red-500" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
