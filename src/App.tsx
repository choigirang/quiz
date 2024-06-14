import { Route, Routes } from 'react-router-dom';
import useMobile from 'hooks/useMobile';

import WithProvider from './components/common/provider/WithProvider';
import Header from './components/common/header/Header';
import SelectPage from './pages/quiz/SelectPage';
import QuizPage from './pages/quiz/QuizPage';
import AllPage from './pages/all/AllPage';
import ChartPage from './pages/chart/ChartPage';

function App() {
  const { isMobile } = useMobile();

  return (
    <div className={`flex w-full h-screen ${isMobile ? 'flex-col' : 'flex-row'}`}>
      <WithProvider>
        <Header />
        <Routes>
          <Route path='/' element={<SelectPage />} />
          <Route path='/quiz' element={<SelectPage />} />
          <Route path='/quiz/:stack' element={<QuizPage />} />
          <Route path='/all/*' element={<AllPage />} />
          <Route path='/chart/*' element={<ChartPage />} />
        </Routes>
      </WithProvider>
    </div>
  );
}

export default App;
