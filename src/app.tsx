import React from 'react';
import { createRoot } from 'react-dom/client';
import { Route, Link, Routes, HashRouter } from 'react-router-dom';
// Functions
import TaskProvider from './contexts/taskContext';
// Components
import IndexPage from './pages/indexPage/indexPage';
import TestPage from './pages/test/test';
// Styles
import './styles/global.scss';

function App() {
  return (
    // Note: Using HashRouter because BrowserRouter doesn't work with Github Pages (https://stackoverflow.com/questions/71984401/react-router-not-working-with-github-pages)
    <HashRouter>
      <TaskProvider>
        <Routes>
          <Route path='/' element={<IndexPage />} />
          {/* <Route path='/test' element={<TestPage />} /> */}
        </Routes>
      </TaskProvider>
    </HashRouter>
  );
}

createRoot(document.getElementById('page-content') as HTMLElement).render(<App />);
