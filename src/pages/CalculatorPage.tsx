import React, { useEffect, useState } from 'react'
import Calculator from '../components/Calculator'
import { User } from '../lib/types'
import { UserService } from '../lib/services/UserService';

function CalculatorPage({ setAlert, setBalance }: { setAlert: React.Dispatch<React.SetStateAction<string>>, setBalance: React.Dispatch<React.SetStateAction<number>> }) {
  const [user, setUser] = useState<User | undefined>();

  const userService = new UserService();
  useEffect(() => {
    userService.getUser()
      .then(user => {
        setUser(user)
      })
      .catch(() => {
        window.location.href = '/login'
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {user && (
        <>
          <h1 className='text-center text-4xl text-white'>Cost Ineffective Calculator</h1>
          <Calculator user={user} setUser={setUser} setAlert={setAlert} setBalance={setBalance}  />
        </>
      )}
    </>
  )
}

export default CalculatorPage