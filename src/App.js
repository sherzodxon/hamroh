import AppLayout from './layouts/App';
import "./assets/scss/main.scss"
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient()
function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <AppLayout/>
    </QueryClientProvider>
  );
}

export default App;
