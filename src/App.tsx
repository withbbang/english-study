import React from 'react';
import Index from 'screens/index';
import CardList from 'screens/cardList';
import NotFound from 'screens/notFound';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App(): React.JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/:type/list" element={<CardList />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
