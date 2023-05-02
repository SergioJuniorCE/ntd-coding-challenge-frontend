import { useEffect, useState } from 'react'
import { UserService } from '../lib/services/UserService';
import { User } from '../lib/types';

function LoginPage() {

  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const [user] = useState<User | undefined>();

  const userService = new UserService();

  useEffect(() => {
    userService.getUser()
      .then(() => {
        window.location.href = '/'
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogin = () => {
    userService.login(username, password)
      .then(() => {
        window.location.href = '/'
      })
      .catch(err => console.error(err))
  }

  const hanndleRegisterRedirect = () => {
    window.location.href = '/register'
  }
  return (
    <>
      {user === undefined && (
        <section className='grid place-items-center'>
          <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Login</h2>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  className="input input-bordered w-full max-w-xs"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">password</span>
                </label>
                <input
                  type="password"
                  className="input input-bordered w-full max-w-xs"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button className="btn btn-success" onClick={handleLogin} >Login</button>
              <button className="btn" onClick={hanndleRegisterRedirect} >Dont have an account? Register here</button>
            </div>
          </div>
        </section>
      )}
    </>

  )
}

export default LoginPage;