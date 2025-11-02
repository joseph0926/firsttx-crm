import { motion } from 'motion/react';
import { useState } from 'react';
import { TASKS } from './data';

export function TaskManagementVisual() {
  const [checkedItems, setCheckedItems] = useState<boolean[]>(TASKS.map(() => false));

  const toggleTask = (index: number) => {
    const newChecked = [...checkedItems];
    newChecked[index] = !newChecked[index];
    setCheckedItems(newChecked);
  };

  return (
    <div className="relative w-full h-[500px]">
      <div className="absolute inset-0 bg-card/40 backdrop-blur-xl rounded-3xl border border-border shadow-2xl overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-primary/5 to-transparent" />

        <div className="p-6 h-full flex flex-col relative z-10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-foreground">My Tasks</h3>
            <motion.div
              className="px-3 py-1.5 bg-primary/10 backdrop-blur-sm rounded-full text-xs font-medium text-primary border border-primary/20"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {checkedItems.filter(checked => !checked).length} active
            </motion.div>
          </div>

          <div className="flex-1 space-y-3 overflow-hidden">
            {TASKS.map((task, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 + 0.5 }}
                className="group cursor-pointer"
                onClick={() => toggleTask(i)}
              >
                <div className={`flex items-center gap-4 p-3.5 bg-card/80 backdrop-blur-sm rounded-2xl border border-border hover:border-primary/30 transition-all ${checkedItems[i] ? 'opacity-60' : 'hover:shadow-lg'}`}>
                  <motion.div
                    className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors ${checkedItems[i] ? 'bg-primary border-primary' : 'border-border bg-card'}`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {checkedItems[i] && (
                      <motion.svg
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-4 h-4 text-primary-foreground"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </motion.svg>
                    )}
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium text-foreground truncate transition-all ${checkedItems[i] ? 'line-through opacity-50' : ''}`}>
                      {task.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">{task.dueDate}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${task.priority === 'High' ? 'bg-destructive/10 text-destructive border border-destructive/20' : 'bg-chart-2/10 text-chart-2 border border-chart-2/20'}`}>
                      {task.priority}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-4 pt-4 border-t border-border"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <button className="w-full p-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-medium text-sm transition-colors flex items-center justify-center gap-2 shadow-md">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add New Task
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
