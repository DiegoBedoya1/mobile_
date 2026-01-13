import { 
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, 
  IonList, IonItem, IonLabel, IonCheckbox, IonFab, IonFabButton, IonIcon 
} from '@ionic/react';
import { add } from 'ionicons/icons';
import { useState } from 'react';

const Tasks: React.FC = () => {
  // Aquí va la lógica (el estado de tus tareas)
  const [tareas, setTareas] = useState([
    { id: 1, texto: 'Investigar Ionic', completada: false },
    { id: 2, texto: 'Hacer boceto de la app', completada: true }
  ]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mis Tareas</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        
        {/* LISTA DE TAREAS (Tu solución de planificación) */}
        <IonList>
          {tareas.map(tarea => (
            <IonItem key={tarea.id}>
              <IonLabel>{tarea.texto}</IonLabel>
              <IonCheckbox slot="start" checked={tarea.completada} />
            </IonItem>
          ))}
        </IonList>

        {/* BOTÓN FLOTANTE (Para agregar nuevas) */}
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>

      </IonContent>
    </IonPage>
  );
};

export default Tasks;