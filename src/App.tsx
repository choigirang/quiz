import WithProvider from './components/common/provider/WithProvider';
import Header from './components/common/header/Header';
import { Route, Routes } from 'react-router-dom';
import QuizPage from './section/quiz/home/QuizPage';
import AllPage from './section/all/AllPage';
import ChartPage from './section/chart/ChartPage';
import Quiz from './section/quiz/stack/Quiz';

function App() {
  return (
    <div className='flex w-full'>
      <WithProvider>
        <Header />
        <Routes>
          <Route path='/quiz' element={<QuizPage />}></Route>
          <Route path='/quiz/:stack' element={<Quiz />}></Route>
          <Route path='/all' element={<AllPage />}></Route>
          <Route path='/chart' element={<ChartPage />}></Route>
        </Routes>
      </WithProvider>
    </div>
  );
}

export default App;
