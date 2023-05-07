import './App.css'
import 'gridjs/dist/theme/mermaid.min.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";

import { AuthProvider, RequireAuth } from 'react-auth-kit';
import CalculatorPage from './pages/CalculatorPage';
import LoginPage from './pages/LoginPage';
import UserRecordsPage from './pages/UserRecordsPage';
import RegisterPage from './pages/RegisterPage';
import ErrorPage from './pages/ErrorPage';
import Layout from './components/Layout';

const queryClient = new QueryClient()

function App() {

  return (
    <QueryClientProvider client={queryClient} >
      <Layout>
        <AuthProvider
          authType='cookie'
          authName='_auth'
          cookieDomain={window.location.hostname}
          cookieSecure={window.location.protocol === 'https:'}
        >
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  <RequireAuth loginPath='/login'>
                    <CalculatorPage />
                  </RequireAuth>
                }
                errorElement={<ErrorPage />}
              />
              <Route
                path="/records"
                element={
                  <RequireAuth loginPath='/login'>
                    <UserRecordsPage />
                  </RequireAuth>
                }
              />
              <Route
                path="/login"
                element={<LoginPage />}
                errorElement={<ErrorPage />}
              />
              <Route
                path="/register"
                element={<RegisterPage />}
                errorElement={<ErrorPage />}
              />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </Layout>
    </QueryClientProvider>
  )
}

export default App
