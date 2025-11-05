import { motion } from 'motion/react';
import type { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: number | string;
  description?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  delay?: number;
}

export function StatsCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  delay = 0,
}: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      whileHover={{ y: -4 }}
      className="relative group"
    >
      <div className="relative overflow-hidden rounded-3xl border border-border/40 bg-background/60 backdrop-blur-2xl p-6 transition-all duration-500 hover:bg-background/80 hover:border-border/60 hover:shadow-xl hover:shadow-primary/5">
        <div className="absolute -right-4 -top-4 opacity-[0.07] group-hover:opacity-[0.12] transition-opacity duration-500">
          <Icon className="h-32 w-32" strokeWidth={1.5} />
        </div>

        <div className="relative z-10 space-y-3">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {title}
          </p>

          <div className="flex items-baseline gap-2">
            <motion.span
              initial={{ scale: 0.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: delay + 0.2,
                ease: [0.34, 1.56, 0.64, 1],
              }}
              className="text-4xl font-bold tracking-tight"
            >
              {value}
            </motion.span>
          </div>

          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}

          {trend && (
            <div className="flex items-center gap-1.5 pt-2">
              <span
                className={`flex items-center gap-0.5 text-xs font-semibold ${
                  trend.isPositive ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {trend.isPositive ? '↑' : '↓'}
                {Math.abs(trend.value)}%
              </span>
              <span className="text-xs text-muted-foreground">
                vs last month
              </span>
            </div>
          )}
        </div>

        <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </motion.div>
  );
}
