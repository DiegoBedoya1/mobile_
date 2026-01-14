import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import { es } from 'date-fns/locale';
import { Task } from '../hooks/useTaskStore';
import { TaskItem } from '../components/TaskItem';
import { AddTaskModal } from '../components/AddTaskModal';

interface CalendarPageProps {
  tasks: Task[];
  onAddTask: (title: string, date: string) => void;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  getTasksByDate: (date: string) => Task[];
}

export const CalendarPage = ({
  tasks,
  onAddTask,
  onToggleTask,
  onDeleteTask,
  getTasksByDate,
}: CalendarPageProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const startPadding = monthStart.getDay();
  const paddedDays = [...Array(startPadding).fill(null), ...days];

  const selectedDateStr = format(selectedDate, 'yyyy-MM-dd');
  const dayTasks = getTasksByDate(selectedDateStr);

  const hasTasksOnDay = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return tasks.some((task) => task.date === dateStr);
  };

  const weekDays = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="px-4 py-4 max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
              className="p-2 rounded-full hover:bg-muted transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <h1 className="font-display text-xl font-bold text-foreground capitalize">
              {format(currentMonth, 'MMMM yyyy', { locale: es })}
            </h1>
            <button
              onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
              className="p-2 rounded-full hover:bg-muted transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
          </div>

          {/* Week days header */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map((day, i) => (
              <div key={i} className="text-center text-xs font-medium text-muted-foreground py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {paddedDays.map((day, i) => {
              if (!day) {
                return <div key={`empty-${i}`} className="aspect-square" />;
              }

              const isSelected = isSameDay(day, selectedDate);
              const isToday = isSameDay(day, new Date());
              const hasTasks = hasTasksOnDay(day);
              const isCurrentMonth = isSameMonth(day, currentMonth);

              return (
                <motion.button
                  key={day.toISOString()}
                  onClick={() => setSelectedDate(day)}
                  whileTap={{ scale: 0.95 }}
                  className={`aspect-square flex flex-col items-center justify-center rounded-xl relative transition-all ${
                    isSelected
                      ? 'gradient-primary text-primary-foreground shadow-soft'
                      : isToday
                      ? 'bg-secondary text-foreground font-semibold'
                      : isCurrentMonth
                      ? 'text-foreground hover:bg-muted'
                      : 'text-muted-foreground'
                  }`}
                >
                  <span className="text-sm font-medium">{format(day, 'd')}</span>
                  {hasTasks && !isSelected && (
                    <div className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-accent" />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tasks for selected day */}
      <div className="px-4 py-4 max-w-lg mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-lg font-semibold text-foreground">
            {isSameDay(selectedDate, new Date()) ? 'Hoy' : format(selectedDate, 'EEEE d', { locale: es })}
          </h2>
          <span className="text-sm text-muted-foreground">
            {dayTasks.length} {dayTasks.length === 1 ? 'tarea' : 'tareas'}
          </span>
        </div>

        <AnimatePresence mode="popLayout">
          {dayTasks.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <Plus className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">No hay tareas para este día</p>
              <p className="text-sm text-muted-foreground mt-1">
                Toca el botón + para agregar una
              </p>
            </motion.div>
          ) : (
            <div className="space-y-3">
              {dayTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={onToggleTask}
                  onDelete={onDeleteTask}
                />
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* FAB */}
      <motion.button
        onClick={() => setIsModalOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-24 right-4 w-14 h-14 gradient-primary rounded-full shadow-elevated flex items-center justify-center z-40"
      >
        <Plus className="w-6 h-6 text-primary-foreground" />
      </motion.button>

      {/* Add Task Modal */}
      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={(title) => onAddTask(title, selectedDateStr)}
        selectedDate={selectedDateStr}
      />
    </div>
  );
};
