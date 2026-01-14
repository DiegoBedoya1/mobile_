import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BottomNav } from '../components/BottomNav';
import { CalendarPage } from '../pages/CalendarPage';
import { ProgressPage } from '../pages/ProgressPage';
import { useTaskStore } from '../hooks/useTaskStore';

const Index = () => {
  const [activeTab, setActiveTab] = useState<'calendar' | 'progress'>('calendar');
  const {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    getTasksByDate,
    getCompletedTasks,
    getTotalTasks,
    getCompletedCount,
    getCompletionRate,
    getTasksThisWeek,
  } = useTaskStore();

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {activeTab === 'calendar' ? (
          <motion.div
            key="calendar"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
          >
            <CalendarPage
              tasks={tasks}
              onAddTask={addTask}
              onToggleTask={toggleTask}
              onDeleteTask={deleteTask}
              getTasksByDate={getTasksByDate}
            />
          </motion.div>
        ) : (
          <motion.div
            key="progress"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <ProgressPage
              completedTasks={getCompletedTasks()}
              totalTasks={getTotalTasks()}
              completedCount={getCompletedCount()}
              completionRate={getCompletionRate()}
              tasksThisWeek={getTasksThisWeek()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
