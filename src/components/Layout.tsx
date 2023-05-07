import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { User } from '../lib/types';
import { UserService } from '../lib/services/UserService';
import Alert from './Alert';
import Footer from './Footer';

function Layout({ children }: { children: React.ReactNode }) {


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
    <main className='pt-3 w-screen h-auto bg-gradient-to-r from-primary to-secondary animate-gradient'>
      <Navbar user={user} setUser={setUser} balance={balance} setBalance={setBalance} />
      {alert !== "" && (
        <div className="content-center max-w-2xl">
          <Alert alert={alert} setAlert={setAlert} />
        </div>
      )}
      {children}
      <div className="mt-4">
        <Footer />
      </div>
    </main>
  )
}

export default Layout