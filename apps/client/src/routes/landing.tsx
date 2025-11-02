import { Link } from 'react-router';
import { motion } from 'motion/react';
import {
  FloatingOrbs,
  FeatureCard,
  ContactManagementVisual,
  SmartTrackingVisual,
  TaskManagementVisual,
} from '../components/landing';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <FloatingOrbs />

      <nav className="relative z-10 px-6 py-6 max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold text-primary">
          FirstTX
        </div>
        <Link
          to="/login"
          className="px-6 py-2 bg-card/80 backdrop-blur-sm border border-border rounded-full hover:bg-card transition-colors text-sm font-medium text-foreground"
        >
          Sign In
        </Link>
      </nav>

      <main className="relative z-10 px-6 pt-20 pb-32 max-w-7xl mx-auto">
        <HeroSection />
        <FeaturesSection />
      </main>
    </div>
  );
}

function HeroSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="text-center max-w-4xl mx-auto"
    >
      <motion.h1
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <span className="text-foreground">
          Relationships that scale.
        </span>
        <br />
        <span className="text-primary">
          CRM that doesn't get in the way.
        </span>
      </motion.h1>

      <motion.p
        className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Built for teams who value connections over complexity.
        Track interactions, nurture relationships, and grow your business—without the bloat.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Link
          to="/login"
          className="inline-block px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300"
        >
          Get Started Free
        </Link>
      </motion.div>
    </motion.div>
  );
}

function FeaturesSection() {
  return (
    <div className="mt-32 space-y-24">
      <FeatureCard
        title="Effortless Contact Management"
        description="Keep every conversation, note, and interaction in one place. Build relationships that matter with our intuitive contact system."
        visual={<ContactManagementVisual />}
        align="left"
      />

      <FeatureCard
        title="Smart Tracking"
        description="Never miss a follow-up with intelligent reminders and activity timeline. Stay on top of every relationship."
        visual={<SmartTrackingVisual />}
        align="right"
      />

      <FeatureCard
        title="Task Management"
        description="Turn conversations into actions. Seamlessly create and track tasks directly from your interactions."
        visual={<TaskManagementVisual />}
        align="left"
      />
    </div>
  );
}
