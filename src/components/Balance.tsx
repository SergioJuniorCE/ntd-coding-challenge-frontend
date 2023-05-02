import React from 'react'
import { UserService } from '../lib/services/UserService';
import { User } from '../lib/types';

function Balance({ user, setUser }: { user: User | undefined, setUser: React.Dispatch<React.SetStateAction<User | undefined>> }) {
  const [loading, setLoading] = React.useState<boolean>(false)

  const userService = new UserService();

  const resetBalance = () => {
    setLoading(true)
    userService.resetBalance()
      .then(({ balance }) => {
        setUser({
          ...user,
          balance
        } as User)
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
          onClick={resetBalance}>Balance ${user?.balance ?? '?'}</button >
      )}
    </>
  )
}

export default Balance