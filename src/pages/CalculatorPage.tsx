import { useEffect } from 'react'
import Calculator from '../components/Calculator'
import { User } from '../lib/types'
import { UserService } from '../lib/services/UserService';

function CalculatorPage({
  user,
  setUser,
  setBalance,
  setAlert
}: {
  user: User | undefined,
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>,
  setBalance: React.Dispatch<React.SetStateAction<number>>,
  setAlert: React.Dispatch<React.SetStateAction<string>>
}) {

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
          <Calculator
            user={user}
            setUser={setUser}
            setBalance={setBalance}
            setAlert={setAlert}
          />
        </>
      )}
    </>
  )
}

export default CalculatorPage