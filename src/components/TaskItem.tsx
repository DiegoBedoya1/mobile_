import { motion } from 'framer-motion';
import { Check, Trash2 } from 'lucide-react';
import { Task } from '../hooks/useTaskStore';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TaskItem = ({ task, onToggle, onDelete }: TaskItemProps) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="flex items-center gap-3 p-4 bg-card rounded-xl shadow-soft border border-border"
    >
      <button
        onClick={() => onToggle(task.id)}
        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
          task.completed
            ? 'bg-accent border-accent'
            : 'border-muted-foreground hover:border-primary'
        }`}
      >
        {task.completed && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 500 }}
          >
            <Check className="w-4 h-4 text-accent-foreground" />
          </motion.div>
        )}
      </button>

      <span
        className={`flex-1 text-sm font-medium transition-all ${
          task.completed ? 'line-through text-muted-foreground' : 'text-foreground'
        }`}
      >
        {task.title}
      </span>

      <button
        onClick={() => onDelete(task.id)}
        className="flex-shrink-0 p-2 rounded-lg hover:bg-destructive/10 transition-colors group"
      >
        <Trash2 className="w-4 h-4 text-muted-foreground group-hover:text-destructive transition-colors" />
      </button>
    </motion.div>
  );
};
