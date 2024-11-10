import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigation from './navigations/AppNavigation';
import { TransactionsProvider } from './TransactionsProvider';

export default function App() {

  return (
    <SafeAreaProvider>
      <TransactionsProvider>
        <AppNavigation />
      </TransactionsProvider>
    </SafeAreaProvider>

  );
}
