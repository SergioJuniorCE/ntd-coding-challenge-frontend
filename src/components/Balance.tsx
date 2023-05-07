import React, { useEffect } from 'react'
import { UserService } from '../lib/services/UserService';

function Balance({ balance, setBalance }: { balance: number, setBalance: React.Dispatch<React.SetStateAction<number>> }) {
  const [loading, setLoading] = React.useState<boolean>(false)

  const userService = new UserService();

  useEffect(() => {
    userService.getUser()
      .then((res) => {
        setBalance(res.balance)
      })
      .catch(err => console.error(err))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const resetBalance = () => {
    setLoading(true)
    userService.resetBalance()
      .then((res) => {
        setBalance(res)
      })
      .catch((err) => {
        console.error(err)
      })
      .finally(() => {
        setLoading(false)
      });
  }


  return (
    <>
      {loading ? (
        <button className="btn loading">Loading...</button>
      ) : (
        <button
          className="btn"
          onClick={resetBalance}>Balance ${balance}</button >
      )}
    </>
  )
}

export default Balance