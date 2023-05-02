import { User } from "../lib/types"
import Balance from "./Balance"
import Logout from "./Logout"

function Navbar({ user, setUser, balance, setBalance }: { user: User | undefined, setUser: React.Dispatch<React.SetStateAction<User | undefined>>, balance: number, setBalance: React.Dispatch<React.SetStateAction<number>> }) {
  // Create a navbar using tailwind ui with the user balance to the right

  return (
    <div className="navbar bg-transparent text-primary-content">
      <div className="navbar-start">
        <a href="/" className="btn btn-ghost normal-case text-xl">Calculator</a>
        <a href="/records" className="btn btn-ghost normal-case text-xl">Records</a>
      </div>
      <div className="navbar-end">
        {user !== undefined && (
          <div className="grid grid-cols-2 gap-2 tooltip tooltip-bottom" data-tip="Set balance to $20">
            <Balance user={user} setUser={setUser} balance={balance} setBalance={setBalance}/>
            <Logout />
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar