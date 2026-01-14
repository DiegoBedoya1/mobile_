import { motion } from 'framer-motion';
import { CheckCircle2, Target, TrendingUp, Calendar } from 'lucide-react';
import { Task } from '../hooks/useTaskStore';
import { ProgressRing } from '../components/ProgressRing';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface ProgressPageProps {
  completedTasks: Task[];
  totalTasks: number;
  completedCount: number;
  completionRate: number;
  tasksThisWeek: Task[];
}

export const ProgressPage = ({
  completedTasks,
  totalTasks,
  completedCount,
  completionRate,
  tasksThisWeek,
}: ProgressPageProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const completedThisWeek = tasksThisWeek.filter((t) => t.completed).length;

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="px-4 pt-6 pb-4 max-w-lg mx-auto">
        <h1 className="font-display text-2xl font-bold text-foreground">Tu progreso</h1>
        <p className="text-muted-foreground mt-1">Sigue así, ¡vas muy bien!</p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="px-4 max-w-lg mx-auto space-y-6"
      >
        {/* Progress Ring Card */}
        <motion.div
          variants={itemVariants}
          className="bg-card rounded-2xl p-6 shadow-card border border-border flex flex-col items-center"
        >
          <ProgressRing progress={completionRate} />
          <p className="mt-4 text-center text-muted-foreground">
            Has completado <span className="font-semibold text-foreground">{completedCount}</span> de{' '}
            <span className="font-semibold text-foreground">{totalTasks}</span> tareas
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
          <div className="bg-card rounded-2xl p-4 shadow-soft border border-border">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center mb-3">
              <Target className="w-5 h-5 text-primary-foreground" />
            </div>
            <p className="font-display text-2xl font-bold text-foreground">{totalTasks}</p>
            <p className="text-sm text-muted-foreground">Tareas totales</p>
          </div>

          <div className="bg-card rounded-2xl p-4 shadow-soft border border-border">
            <div className="w-10 h-10 rounded-xl gradient-success flex items-center justify-center mb-3">
              <CheckCircle2 className="w-5 h-5 text-accent-foreground" />
            </div>
            <p className="font-display text-2xl font-bold text-foreground">{completedCount}</p>
            <p className="text-sm text-muted-foreground">Completadas</p>
          </div>

          <div className="bg-card rounded-2xl p-4 shadow-soft border border-border">
            <div className="w-10 h-10 rounded-xl bg-warning/20 flex items-center justify-center mb-3">
              <TrendingUp className="w-5 h-5 text-warning" />
            </div>
            <p className="font-display text-2xl font-bold text-foreground">{tasksThisWeek.length}</p>
            <p className="text-sm text-muted-foreground">Esta semana</p>
          </div>

          <div className="bg-card rounded-2xl p-4 shadow-soft border border-border">
            <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center mb-3">
              <Calendar className="w-5 h-5 text-secondary-foreground" />
            </div>
            <p className="font-display text-2xl font-bold text-foreground">{completedThisWeek}</p>
            <p className="text-sm text-muted-foreground">Hechas esta semana</p>
          </div>
        </motion.div>

        {/* Recent Completed Tasks */}
        <motion.div variants={itemVariants}>
          <h2 className="font-display text-lg font-semibold text-foreground mb-3">
            Tareas completadas recientemente
          </h2>
          {completedTasks.length === 0 ? (
            <div className="bg-card rounded-2xl p-6 shadow-soft border border-border text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-muted flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">Aún no has completado ninguna tarea</p>
              <p className="text-sm text-muted-foreground mt-1">
                ¡Completa tu primera tarea para verla aquí!
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {completedTasks.slice(0, 5).map((task, index) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-xl p-4 shadow-soft border border-border flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-full gradient-success flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-accent-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{task.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(task.date), 'd MMM', { locale: es })}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};
