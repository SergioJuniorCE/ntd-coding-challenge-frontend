import { useEffect, useState } from 'react'

import './App.css'
import 'gridjs/dist/theme/mermaid.min.css';
import Navbar from './components/Navbar'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


import Alert from './components/Alert';
import { User } from './lib/types';
import Footer from './components/Footer';
import CalculatorPage from './pages/CalculatorPage';
import LoginPage from './pages/LoginPage';
import UserRecordsPage from './pages/UserRecordsPage';
import RegisterPage from './pages/RegisterPage';
import { UserService } from './lib/services/UserService';
import { Provider } from 'react-redux';
import { store } from './store';

function App() {
  const [alert, setAlert] = useState<string>("");
  const [user, setUser] = useState<User | undefined>();
  const [balance, setBalance] = useState<number>(0);


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
    <Provider store={store}>
      <main className='pt-3 w-screen h-auto bg-gradient-to-r from-primary to-secondary animate-gradient'>
        <Router>
          <Navbar user={user} setUser={setUser} balance={balance} setBalance={setBalance} />
          {alert !== "" && (
            <div className="content-center max-w-2xl">
              <Alert alert={alert} setAlert={setAlert} />
            </div>
          )}
          <Routes>
            <Route path='/' element={
              <CalculatorPage
                setAlert={setAlert}
                setBalance={setBalance}
              />
            }
            />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/records' element={<UserRecordsPage />} />
          </Routes>
        </Router>
        <div className="mt-4">
          <Footer />
        </div>
      </main>
    </Provider>
    // <QueryClientProvider client={queryClient} >
    // </QueryClientProvider>
  )
}

export default App
