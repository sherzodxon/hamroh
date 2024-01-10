import AppLayout from './layouts/App';
import "./assets/scss/main.scss"
import { QueryClient, QueryClientProvider } from 'react-query';
import  DataCurrentZone  from './contexts/context';

const queryClient = new QueryClient()
function App() {
  return (
    <DataCurrentZone>
      <QueryClientProvider client={queryClient}>
         <AppLayout/>
      </QueryClientProvider>
    </DataCurrentZone>
  
  );
}

export default App;
