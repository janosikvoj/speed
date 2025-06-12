import UserSystem from './components/users/UserSystem';
import { GlobalTimerProvider } from './components/providers/GlobalTimerProvider';
import TextDisplay from './components/text/TextDisplay';
import ToastsDisplay from './components/toasts/ToastsDisplay';

function App() {
  return (
    <>
      <GlobalTimerProvider>
        <ToastsDisplay />
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
