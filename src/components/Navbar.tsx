import { NavLink } from "react-router-dom"
import { User } from "../lib/types"
import Balance from "./Balance"
import Logout from "./Logout"
import { useAppSelector } from "../hooks";

function Navbar({ user, setUser, balance, setBalance }: { user: User | undefined, setUser: React.Dispatch<React.SetStateAction<User | undefined>>, balance: number, setBalance: React.Dispatch<React.SetStateAction<number>> }) {

  const { isAuthenticated } = useAppSelector((state) => state.user);

  const authLinks = (
    <div className="navbar-end">
      <div className="grid grid-cols-2 gap-2 tooltip tooltip-bottom" data-tip="Set balance to $20">
        <Balance user={user} setUser={setUser} balance={balance} setBalance={setBalance} />
        <Logout />
      </div>
    </div>
  )

  return (
    <div className="navbar bg-transparent text-primary-content">
      <div className="navbar-start">
        <NavLink to="/" className="btn btn-ghost normal-case text-xl">Calculator</NavLink>
        <NavLink to="/records" className="btn btn-ghost normal-case text-xl">Records</NavLink>
      </div>
      <div className="navbar-end">
        {isAuthenticated && authLinks}
      </div>
    </div>
  )
}

export default Navbar