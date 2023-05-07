import React from 'react'
import { UserService } from '../lib/services/UserService';

function Balance({ balance, setBalance }: { balance: number, setBalance: React.Dispatch<React.SetStateAction<number>> }) {
  const [loading, setLoading] = React.useState<boolean>(false)

  const userService = new UserService();

  const resetBalance = () => {
    setLoading(true)
    userService.resetBalance()
      .then(({ balance }) => {
        setBalance(balance)
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