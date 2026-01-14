import { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonIcon,
  IonModal,
  IonButton,
  IonInput,
  IonItem,
  IonButtons,
  IonText,
  IonCard,
  IonCardContent,
  IonCheckbox,
} from '@ionic/react';
import { add, chevronBack, chevronForward, trashOutline } from 'ionicons/icons';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addMonths, subMonths } from 'date-fns';
import { es } from 'date-fns/locale';
import { useTaskStore } from '../hooks/useTaskStore';
import { motion, AnimatePresence } from 'framer-motion';

const CalendarTab = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const { tasks, addTask, toggleTask, deleteTask, getTasksByDate } = useTaskStore();

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

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      addTask(newTaskTitle.trim(), selectedDateStr);
      setNewTaskTitle('');
      setIsModalOpen(false);
    }
  };

  const weekDays = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
              <IonIcon icon={chevronBack} />
            </IonButton>
          </IonButtons>
          <IonTitle className="ion-text-capitalize">
            {format(currentMonth, 'MMMM yyyy', { locale: es })}
          </IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
              <IonIcon icon={chevronForward} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {/* Calendar Card */}
        <IonCard className="m-0 mb-4">
          <IonCardContent className="p-4">
            {/* Week days header */}
            <div className="grid grid-cols-7 gap-2 mb-3">
              {weekDays.map((day, i) => (
                <div key={i} className="text-center text-sm font-semibold text-muted-foreground">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-2">
              {paddedDays.map((day, i) => {
                if (!day) {
                  return <div key={`empty-${i}`} className="aspect-square" />;
                }

                const isSelected = isSameDay(day, selectedDate);
                const isToday = isSameDay(day, new Date());
                const hasTasks = hasTasksOnDay(day);

                return (
                  <button
                    key={day.toISOString()}
                    onClick={() => setSelectedDate(day)}
                    className={`aspect-square w-full flex flex-col items-center justify-center rounded-xl relative transition-all ${
                      isSelected
                        ? 'gradient-primary text-white shadow-card font-bold'
                        : isToday
                        ? 'bg-primary/10 text-primary font-bold ring-2 ring-primary/30'
                        : 'text-foreground hover:bg-muted active:bg-muted/80'
                    }`}
                  >
                    <span className="text-base font-medium">{format(day, 'd')}</span>
                    {hasTasks && !isSelected && (
                      <div className="absolute bottom-1.5 w-1.5 h-1.5 rounded-full bg-accent" />
                    )}
                  </button>
                );
              })}
            </div>
          </IonCardContent>
        </IonCard>

        {/* Selected Day Section */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display text-lg font-semibold text-foreground capitalize">
            {isSameDay(selectedDate, new Date()) ? 'Hoy' : format(selectedDate, 'EEEE d', { locale: es })}
          </h2>
          <IonText color="medium" className="text-sm">
            {dayTasks.length} {dayTasks.length === 1 ? 'tarea' : 'tareas'}
          </IonText>
        </div>

        {/* Tasks Section */}
        <AnimatePresence mode="wait">
          {dayTasks.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <IonCard className="m-0">
                <IonCardContent className="text-center py-8">
                  <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-muted flex items-center justify-center">
                    <IonIcon icon={add} className="text-2xl text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground mb-3">No hay tareas para este día</p>
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-primary text-white font-semibold shadow-card hover:opacity-90 transition-opacity"
                  >
                    <IonIcon icon={add} className="text-lg" />
                    Agregar tarea
                  </button>
                </IonCardContent>
              </IonCard>
            </motion.div>
          ) : (
            <motion.div
              key="tasks"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-2"
            >
              {dayTasks.map((task) => (
                <motion.div
                  key={task.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <IonCard className="m-0">
                    <IonCardContent className="p-3 flex items-center gap-3">
                      <IonCheckbox
                        checked={task.completed}
                        onIonChange={() => toggleTask(task.id)}
                        className="task-checkbox"
                      />
                      <span className={`flex-1 ${task.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                        {task.title}
                      </span>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="p-2 rounded-lg hover:bg-destructive/10 transition-colors"
                      >
                        <IonIcon icon={trashOutline} className="text-lg text-muted-foreground hover:text-destructive" />
                      </button>
                    </IonCardContent>
                  </IonCard>
                </motion.div>
              ))}
              
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full mt-3 flex items-center justify-center gap-2 px-5 py-3 rounded-xl border-2 border-primary text-primary font-semibold hover:bg-primary/10 transition-colors"
              >
                <IonIcon icon={add} className="text-lg" />
                Agregar otra tarea
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Add Task Modal */}
        <IonModal isOpen={isModalOpen} onDidDismiss={() => setIsModalOpen(false)} breakpoints={[0, 0.5]} initialBreakpoint={0.5}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Nueva tarea</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setIsModalOpen(false)}>Cerrar</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <p className="text-sm text-muted-foreground mb-4 capitalize">
              {format(selectedDate, 'EEEE, d MMMM', { locale: es })}
            </p>
            <IonItem lines="none" className="mb-4">
              <IonInput
                value={newTaskTitle}
                onIonInput={(e) => setNewTaskTitle(e.detail.value || '')}
                placeholder="¿Qué necesitas hacer?"
                className="text-lg"
                onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
              />
            </IonItem>
            <IonButton expand="block" onClick={handleAddTask} disabled={!newTaskTitle.trim()} className="mt-4">
              Agregar tarea
            </IonButton>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default CalendarTab;
