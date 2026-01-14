import { useState } from 'react';
import { IonApp, setupIonicReact } from '@ionic/react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CalendarTab from './pages/CalendarTab';
import ProgressTab from './pages/ProgressTab';
import { BottomNav } from './components/BottomNav';
import "./index.css";
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

setupIonicReact({ mode: 'ios' });

const queryClient = new QueryClient();

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'calendar' | 'progress'>('calendar');

  return (
    <QueryClientProvider client={queryClient}>
      <IonApp>
        {activeTab === 'calendar' ? <CalendarTab /> : <ProgressTab />}
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </IonApp>
    </QueryClientProvider>
  );
};

export default App;

