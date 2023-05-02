import { useEffect, useState } from 'react'

import './App.css'
import 'gridjs/dist/theme/mermaid.min.css';
import Navbar from './components/Navbar'
import { QueryClient, QueryClientProvider } from 'react-query';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";


import Alert from './components/Alert';
import { User } from './lib/types';
import Footer from './components/Footer';
import CalculatorPage from './pages/CalculatorPage';
import LoginPage from './pages/LoginPage';
import UserRecordsPage from './pages/UserRecordsPage';
import RegisterPage from './pages/RegisterPage';
import ErrorPage from './pages/ErrorPage';
import { UserService } from './lib/services/UserService';

const queryClient = new QueryClient()

function App() {
  const [alert, setAlert] = useState<string>("");
  const [user, setUser] = useState<User | undefined>();
  const [balance, setBalance] = useState<number>(0);


  const router = createBrowserRouter([
    {
      path: "/",
      element: <CalculatorPage setAlert={setAlert} setBalance={setBalance} />,
      errorElement: <ErrorPage />,
    },
    {
      path: '/login',
      element: <LoginPage />,
    },
    {
      path: '/register',
      element: <RegisterPage />,
    },
    {
      path: '/records',
      element: <UserRecordsPage />,
    }
  ], {
    basename: "/",
  });

  const userService = new UserService();


  useEffect(() => {
    userService.getUser()
      .then((user: User) => {
        setUser(user)
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .catch((err: any) => {
        setUser(undefined)
        console.error(err)
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <QueryClientProvider client={queryClient} >
      <main className='pt-3 w-screen h-auto bg-gradient-to-r from-primary to-secondary animate-gradient'>
        <Navbar user={user} setUser={setUser} balance={balance} setBalance={setBalance}/>
        {alert !== "" && (
          <div className="content-center max-w-2xl">
            <Alert alert={alert} setAlert={setAlert} />
          </div>
        )}
        <RouterProvider router={router} />
        <div className="mt-4">
          <Footer />
        </div>
      </main>
    </QueryClientProvider>
  )
}

export default App
