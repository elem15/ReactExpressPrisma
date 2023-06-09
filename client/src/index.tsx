import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { Paths } from './paths';
import { Login } from './pages/login/Login';
import { Register } from './pages/register/Register';
import { ConfigProvider, theme } from 'antd';
import { Auth } from './features/auth/auth';
import { Employees } from './pages/employees/Employees';
import { EmployeeAdd } from './pages/employeeAdd/EmployeeAdd';
import { Status } from './pages/status/Status';
import { NotFound } from './pages/404/NotFound';
import { Employee } from './pages/Employee/Employee';
import { EmployeeEdit } from './pages/employeeEdit/EmployeeEdit';

const router = createBrowserRouter([
  {
    path: Paths.home,
    element: <Employees />,
  },
  {
    path: Paths.employeeAdd,
    element: <EmployeeAdd />,
  },
  {
    path: Paths.login,
    element: <Login />,
  },
  {
    path: Paths.register,
    element: <Register />,
  },
  {
    path: `${Paths.status}/:status`,
    element: <Status />,
  },
  {
    path: `${Paths.employee}/:id`,
    element: <Employee />,
  },
  {
    path: `${Paths.employeeUpdate}/:id`,
    element: <EmployeeEdit />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
  <StrictMode>
    <Provider store={store}>
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
        }}
      >
        <Auth>
          <RouterProvider router={router} />
        </Auth>
      </ConfigProvider>
    </Provider>
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
