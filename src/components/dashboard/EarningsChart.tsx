import React from "react";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EarningData {
  date: string;
  amount: number;
}

interface EarningsChartProps {
  data: EarningData[];
  totalEarnings: string;
  period: string;
  onPeriodChange: (period: string) => void;
}

const EarningsChart = ({
  data,
  totalEarnings,
  period,
  onPeriodChange,
}: EarningsChartProps) => {
  const maxAmount = Math.max(...data.map((d) => d.amount));

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-semibold">{totalEarnings}</h3>
          <p className="text-sm text-gray-500">Total Earnings</p>
        </div>
        <Select value={period} onValueChange={onPeriodChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Last Week</SelectItem>
            <SelectItem value="month">Last Month</SelectItem>
            <SelectItem value="year">Last Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="h-[300px] flex items-end gap-2">
        {data.map((item, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div
              className="w-full bg-primary/20 rounded-t"
              style={{
                height: `${(item.amount / maxAmount) * 100}%`,
                minHeight: "20px",
              }}
            />
            <span className="text-xs text-gray-500 mt-2">{item.date}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default EarningsChart;
