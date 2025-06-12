import { Toaster } from 'sonner';
import Headless from './components/toast';
import VaulDrawer from './components/drawer';
import UserSystem from './components/users/UserSystem';
import { GlobalTimerProvider } from './components/providers/GlobalTimerProvider';
import TextDisplay from './components/text/TextDisplay';

function App() {
  return (
    <>
      <GlobalTimerProvider>
        <Toaster expand position="top-right" visibleToasts={4} />
        <div className="fixed bg-nitrogen-1 top-0 left-1/8 z-20">
          <Headless />
          <VaulDrawer />
        </div>
        <main className="flex justify-center max-w-screen py-45 px-5">
          <section className="relative max-w-[100ch]">
            <UserSystem />
            <TextDisplay />
          </section>
        </main>
      </GlobalTimerProvider>
    </>
  );
}

export default App;
