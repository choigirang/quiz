import React from 'react';
import Header from './components/common/header/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import QuizPage from './section/quiz/QuizPage';
import AllPage from './section/all/AllPage';
import ChartPage from './section/chart/ChartPage';

function App() {
  return (
    <div className='flex w-full'>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<QuizPage />}></Route>
          <Route path='/all' element={<AllPage />}></Route>
          <Route path='/chart' element={<ChartPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
