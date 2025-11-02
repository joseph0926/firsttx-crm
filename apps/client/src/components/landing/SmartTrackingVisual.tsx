import { motion } from 'motion/react';
import { ACTIVITIES } from './data';
import { ActivityIcon } from './ActivityIcon';

export function SmartTrackingVisual() {
  return (
    <div className="relative w-full h-[500px]">
      <div className="absolute inset-0 bg-card/40 backdrop-blur-xl rounded-3xl border border-border shadow-2xl overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-primary/5 to-transparent" />

        <div className="p-6 h-full flex flex-col relative z-10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-foreground">Activity Timeline</h3>
            <div className="flex items-center gap-2">
              <motion.div
                className="w-2 h-2 rounded-full bg-chart-2"
                animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-xs font-medium text-muted-foreground">Live</span>
            </div>
          </div>

          <div className="flex-1 relative">
            <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-border" />

            <div className="space-y-6 relative">
              {ACTIVITIES.map((activity, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.15 + 0.5 }}
                  className="flex gap-4 relative"
                >
                  <motion.div
                    className={`relative z-10 w-10 h-10 rounded-xl bg-${activity.color} flex items-center justify-center shadow-lg shrink-0`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <ActivityIcon type={activity.type} />
                  </motion.div>

                  <div className="flex-1 pb-2">
                    <div className="p-4 bg-card/80 backdrop-blur-sm rounded-2xl border border-border hover:border-primary/30 transition-colors">
                      <p className="text-sm font-medium text-foreground mb-1">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            className="mt-6 p-4 bg-primary/10 backdrop-blur-sm rounded-2xl border border-primary/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">Upcoming: Call with Sarah</p>
                <p className="text-xs text-muted-foreground">In 2 hours</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
