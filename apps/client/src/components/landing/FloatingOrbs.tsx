import { motion } from 'motion/react';

export function FloatingOrbs() {
  return (
    <>
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl"
        animate={{
          y: [0, 30, 0],
          x: [0, 20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute top-40 right-20 w-96 h-96 bg-primary/15 rounded-full blur-3xl"
        animate={{
          y: [0, -40, 0],
          x: [0, -30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-20 left-1/2 w-80 h-80 bg-accent/20 rounded-full blur-3xl"
        animate={{
          y: [0, 25, 0],
          x: [0, -15, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </>
  );
}
