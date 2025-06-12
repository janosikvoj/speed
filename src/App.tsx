import { Toaster } from 'sonner';
import Headless from './quick/toast';
import VaulDrawer from './quick/drawer';
import UserSystem from './quick/users/UserSystem';
import SlowText from './slow/SlowText';
import { GlobalTimerProvider } from './providers/GlobalTimerProvider';

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
          <section className="relative">
            <UserSystem />
            <SlowText />
          </section>
        </main>
      </GlobalTimerProvider>
    </>
  );
}

export default App;
