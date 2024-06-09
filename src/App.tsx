import { Route, Routes } from 'react-router-dom';

import WithProvider from './components/common/provider/WithProvider';
import Header from './components/common/header/Header';
import SelectPage from './pages/quiz/SelectPage';
import QuizPage from './pages/quiz/QuizPage';
import AllPage from './pages/all/AllPage';
import ChartPage from './pages/chart/ChartPage';

function App() {
  return (
    <div className='flex w-full'>
      <WithProvider>
        <Header />
        <Routes>
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
