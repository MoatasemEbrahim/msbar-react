
import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import routes from './routes';


const Router = () => {

  return (
    <BrowserRouter>
      <Routes>
        {routes.map(({
          path, key, component,
        }) => (
          <Route
            path={path}
            key={key}
            element={component()}
          />
        ))}
      </Routes>
    </BrowserRouter>
  )};

export default Router;
