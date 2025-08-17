import { ReactNode } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export const KPICard = ({ title, value, description, icon: Icon, trend, className }: KPICardProps) => {
  return (
    <Card className={`relative overflow-hidden ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="text-sm font-medium text-muted-foreground">{title}</div>
        <Icon className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
        {trend && (
          <div className={`flex items-center text-xs mt-2 ${
            trend.isPositive ? "text-status-success" : "text-status-error"
          }`}>
            <span className="mr-1">
              {trend.isPositive ? "↗" : "↘"}
            </span>
            {Math.abs(trend.value)}% em relação ao mês anterior
          </div>
        )}
      </CardContent>
    </Card>
  );
};