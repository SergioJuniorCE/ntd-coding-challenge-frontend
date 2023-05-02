import { UserService } from '../lib/services/UserService';

function Logout() {
  const userService = new UserService();
  return (
    <button
      className="btn"
      onClick={() => {
        userService.logout()
          .then(() => window.location.reload())
          .catch(err => console.error(err))
      }}
    >Logout</button>
  )
}

export default Logout