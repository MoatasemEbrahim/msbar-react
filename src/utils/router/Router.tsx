
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import routes from './routes';
import Layout from '../../components/Layout';

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
            element={<Layout>{component()}</Layout>}
          />
        ))}
      </Routes>
    </BrowserRouter>
  )};

export default Router;
