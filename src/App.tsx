import UserSystem from './components/users/UserSystem';
import { GlobalTimerProvider } from './components/providers/GlobalTimerProvider';
import TextDisplay from './components/text/TextDisplay';
import ToastsDisplay from './components/toasts/ToastsDisplay';
import Ad from './components/ads/Ad';

function App() {
  return (
    <>
      <GlobalTimerProvider>
        <ToastsDisplay />
        <div className="max-w-screen">
          <Ad
            className="w-full h-50"
            colors={['bg-carbon-1', 'bg-nitrogen-3']}
          />
          <main className="md:grid grid-cols-5 m-5 sm:m-10 gap-10">
            <div className="hidden lg:flex flex-col w-full h-full gap-10">
              <Ad
                className="grow"
                speed={2}
                colors={['bg-silicon-2', 'bg-oxygen-3']}
              />
              <Ad className="grow" delay={1} />
            </div>
            <section className="col-span-3 relative max-w-[100ch]">
              <UserSystem />
              <TextDisplay />
            </section>
            <div className="hidden lg:flex flex-col w-full h-full gap-10">
              <Ad
                className="grow"
                speed={2}
                colors={['bg-carbon-2', 'bg-oxygen-2']}
              />
              <Ad className="grow" delay={3} />
              <Ad
                className="grow"
                delay={1}
                colors={['bg-silicon-2', 'bg-oxygen-3']}
              />
            </div>
          </main>
        </div>
      </GlobalTimerProvider>
    </>
  );
}

export default App;
