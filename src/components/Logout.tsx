import { useSignOut } from 'react-auth-kit';
import { UserService } from '../lib/services/UserService';
import { useNavigate } from 'react-router-dom';
import { User } from '../lib/types';

function Logout({ setUser }: { setUser: React.Dispatch<React.SetStateAction<User | undefined>> }) {
  const userService = new UserService();
  const signOut = useSignOut();
  const navigate = useNavigate();
  return (
    <button
      className="btn"
      onClick={() => {
        signOut()
        userService.logout()
          .then(() => {
            navigate('/login')
            setUser(undefined)
          })
          .catch(err => console.error(err))
        window.location.reload()
      }}
    >Logout</button>
  )
}

export default Logout