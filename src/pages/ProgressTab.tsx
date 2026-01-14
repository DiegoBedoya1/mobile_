import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonText,
} from '@ionic/react';
import { checkmarkCircle, trophy, flame, calendar, statsChart } from 'ionicons/icons';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useTaskStore } from '../hooks/useTaskStore';
import { ProgressRing } from '../components/ProgressRing';

const ProgressTab = () => {
  const {
    getCompletedTasks,
    getTotalTasks,
    getCompletedCount,
    getCompletionRate,
    getTasksThisWeek,
  } = useTaskStore();

  const completedTasks = getCompletedTasks();
  const totalTasks = getTotalTasks();
  const completedCount = getCompletedCount();
  const completionRate = getCompletionRate();
  const tasksThisWeek = getTasksThisWeek();
  const completedThisWeek = tasksThisWeek.filter((t) => t.completed).length;

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonTitle>Tu Progreso</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonText color="medium">
          <p className="mb-4">Sigue así, ¡vas muy bien!</p>
        </IonText>

        {/* Progress Ring Card */}
        <IonCard className="progress-card">
          <IonCardContent className="flex flex-col items-center py-6">
            <ProgressRing progress={completionRate} />
            <p className="mt-4 text-center text-muted-foreground">
              Has completado <span className="font-semibold text-foreground">{completedCount}</span> de{' '}
              <span className="font-semibold text-foreground">{totalTasks}</span> tareas
            </p>
          </IonCardContent>
        </IonCard>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <IonCard className="stat-card m-0">
            <IonCardContent className="p-4">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center mb-2">
                <IonIcon icon={trophy} className="text-primary-foreground text-xl" />
              </div>
              <p className="font-display text-2xl font-bold text-foreground">{totalTasks}</p>
              <IonText color="medium"><p className="text-sm">Tareas totales</p></IonText>
            </IonCardContent>
          </IonCard>

          <IonCard className="stat-card m-0">
            <IonCardContent className="p-4">
              <div className="w-10 h-10 rounded-xl gradient-success flex items-center justify-center mb-2">
                <IonIcon icon={checkmarkCircle} className="text-accent-foreground text-xl" />
              </div>
              <p className="font-display text-2xl font-bold text-foreground">{completedCount}</p>
              <IonText color="medium"><p className="text-sm">Completadas</p></IonText>
            </IonCardContent>
          </IonCard>

          <IonCard className="stat-card m-0">
            <IonCardContent className="p-4">
              <div className="w-10 h-10 rounded-xl bg-warning/20 flex items-center justify-center mb-2">
                <IonIcon icon={flame} className="text-warning text-xl" />
              </div>
              <p className="font-display text-2xl font-bold text-foreground">{tasksThisWeek.length}</p>
              <IonText color="medium"><p className="text-sm">Esta semana</p></IonText>
            </IonCardContent>
          </IonCard>

          <IonCard className="stat-card m-0">
            <IonCardContent className="p-4">
              <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center mb-2">
                <IonIcon icon={calendar} className="text-secondary-foreground text-xl" />
              </div>
              <p className="font-display text-2xl font-bold text-foreground">{completedThisWeek}</p>
              <IonText color="medium"><p className="text-sm">Hechas esta semana</p></IonText>
            </IonCardContent>
          </IonCard>
        </div>

        {/* Recent Completed Tasks */}
        <h2 className="font-display text-lg font-semibold text-foreground mb-3">
          Tareas completadas recientemente
        </h2>

        {completedTasks.length === 0 ? (
          <IonCard className="m-0">
            <IonCardContent className="text-center py-8">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-muted flex items-center justify-center">
                <IonIcon icon={statsChart} className="text-muted-foreground text-2xl" />
              </div>
              <p className="text-muted-foreground">Aún no has completado ninguna tarea</p>
              <p className="text-sm text-muted-foreground mt-1">
                ¡Completa tu primera tarea para verla aquí!
              </p>
            </IonCardContent>
          </IonCard>
        ) : (
          <IonList className="rounded-xl overflow-hidden">
            {completedTasks.slice(0, 5).map((task) => (
              <IonItem key={task.id} lines="inset">
                <div className="w-8 h-8 rounded-full gradient-success flex items-center justify-center mr-3">
                  <IonIcon icon={checkmarkCircle} className="text-accent-foreground text-lg" />
                </div>
                <IonLabel>
                  <h3>{task.title}</h3>
                  <p className="text-xs text-muted-foreground">
                    {format(new Date(task.date), 'd MMM', { locale: es })}
                  </p>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default ProgressTab;
