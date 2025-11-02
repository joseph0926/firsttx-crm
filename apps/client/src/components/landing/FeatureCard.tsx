import { motion } from 'motion/react';
import type { ReactNode } from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  visual: ReactNode;
  align: 'left' | 'right';
}

export function FeatureCard({ title, description, visual, align }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`flex flex-col ${align === 'right' ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-16 items-center`}
    >
      <div className="flex-1 space-y-6">
        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground"
          initial={{ opacity: 0, x: align === 'left' ? -20 : 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          {title}
        </motion.h2>
        <motion.p
          className="text-lg md:text-xl text-muted-foreground leading-relaxed"
          initial={{ opacity: 0, x: align === 'left' ? -20 : 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
        >
          {description}
        </motion.p>
      </div>

      <div className="flex-1 w-full">
        {visual}
      </div>
    </motion.div>
  );
}
