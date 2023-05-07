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
import { useEffect, useState } from 'react';
import { User } from './lib/types';
import { UserService } from './lib/services/UserService';
import Navbar from './components/Navbar';
import Alert from './components/Alert';
import Footer from './components/Footer';

const queryClient = new QueryClient()

function App() {
  const [alert, setAlert] = useState<string>("");
  const [user, setUser] = useState<User | undefined>();
  const [balance, setBalance] = useState<number>(0);

  const userService = new UserService();


  useEffect(() => {
    userService.getUser()
      .then((user: User) => {
        console.log('user :>> ', user);
        setUser(user)
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .catch((err: any) => {
        console.error(err)
        setUser(undefined)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <QueryClientProvider client={queryClient} >
      <main className='pt-3 w-screen h-auto bg-gradient-to-r from-primary to-secondary animate-gradient'>
        <AuthProvider
          authType='cookie'
          authName='_auth'
          cookieDomain={window.location.hostname}
          cookieSecure={window.location.protocol === 'https:'}
        >
          <BrowserRouter>
            <Navbar user={user} setUser={setUser} balance={balance} setBalance={setBalance} />
            {alert !== "" && (
              <div className="content-center max-w-2xl">
                <Alert alert={alert} setAlert={setAlert} />
              </div>
            )}
            <Routes>
              <Route
                path="/"
                element={
                  <RequireAuth loginPath='/login'>
                    <CalculatorPage
                      user={user}
                      setUser={setUser}
                      setBalance={setBalance}
                      setAlert={setAlert}
                    />
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
                element={<LoginPage setUser={setUser}/>}
                errorElement={<ErrorPage />}
              />
              <Route
                path="/register"
                element={<RegisterPage setUser={setUser}/>}
                errorElement={<ErrorPage />}
              />
            </Routes>
          </BrowserRouter>
          <div className="mt-4">
            <Footer />
          </div>
        </AuthProvider>
      </main>
    </QueryClientProvider>
  )
}

export default App
