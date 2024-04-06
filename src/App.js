import AppLayout from './layouts/App';
import "./assets/scss/main.scss"
import {QueryClient, QueryClientProvider} from 'react-query';
import DataCurrentZone from './contexts/context';
import {store} from './store';
import {Provider} from 'react-redux';
const queryClient = new QueryClient()
function App() {
    return (
        <Provider store={store}>
            <DataCurrentZone>
                <QueryClientProvider client={queryClient}>
                    <AppLayout/>
                </QueryClientProvider>
            </DataCurrentZone>
        </Provider>

    );
}

export default App;
