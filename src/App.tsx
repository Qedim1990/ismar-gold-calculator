import React from 'react';
import { Header } from './components/Header';
import { Inputs } from './components/Inputs';
import { ResultCard } from './components/ResultCard';
import { HistoryList } from './components/HistoryList';
import { ResetButton } from './components/ResetButton';
import { SplashScreen } from './components/SplashScreen';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-safe">
      <SplashScreen />
      <Header />
      
      <main className="max-w-lg mx-auto pb-12">
        <Inputs />
        <ResultCard />
        
        <div className="mx-4">
          <ResetButton />
        </div>

        <HistoryList />
      </main>
    </div>
  );
};

export default App;
