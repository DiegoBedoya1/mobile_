import { Calendar, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

interface BottomNavProps {
  activeTab: 'calendar' | 'progress';
  onTabChange: (tab: 'calendar' | 'progress') => void;
}

export const BottomNav = ({ activeTab, onTabChange }: BottomNavProps) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-elevated z-50">
      <div className="flex items-center justify-around py-2 px-4 max-w-lg mx-auto">
        <button
          onClick={() => onTabChange('calendar')}
          className="relative flex flex-col items-center gap-1 p-3 rounded-2xl transition-colors"
        >
          {activeTab === 'calendar' && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 gradient-primary rounded-2xl"
              initial={false}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          )}
          <Calendar
            className={`relative z-10 w-6 h-6 transition-colors ${
              activeTab === 'calendar' ? 'text-primary-foreground' : 'text-muted-foreground'
            }`}
          />
          <span
            className={`relative z-10 text-xs font-medium transition-colors ${
              activeTab === 'calendar' ? 'text-primary-foreground' : 'text-muted-foreground'
            }`}
          >
            Calendario
          </span>
        </button>

        <button
          onClick={() => onTabChange('progress')}
          className="relative flex flex-col items-center gap-1 p-3 rounded-2xl transition-colors"
        >
          {activeTab === 'progress' && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 gradient-primary rounded-2xl"
              initial={false}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          )}
          <TrendingUp
            className={`relative z-10 w-6 h-6 transition-colors ${
              activeTab === 'progress' ? 'text-primary-foreground' : 'text-muted-foreground'
            }`}
          />
          <span
            className={`relative z-10 text-xs font-medium transition-colors ${
              activeTab === 'progress' ? 'text-primary-foreground' : 'text-muted-foreground'
            }`}
          >
            Progreso
          </span>
        </button>
      </div>
    </nav>
  );
};
