import { useEffect, useState } from 'react';
import { TokenResponse, User } from '../lib/types';
import { useSignIn } from 'react-auth-kit';
import { TokenService } from '../lib/services/TokenService';
import { useNavigate } from "react-router-dom";

function LoginPage({ setUser }: { setUser: React.Dispatch<React.SetStateAction<User | undefined>> }) {

  const signIn = useSignIn()

  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const navigate = useNavigate();

  const tokenService = new TokenService();

  useEffect(() => {
    if (tokenService.doesTokenExist()) {
      window.location.href = '/'
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogin = () => {
    tokenService.getTokens({ username, password })
      .then((res: TokenResponse) => {
        console.log('res :>> ', res);
        signIn({
          token: res.access,
          expiresIn: 3600,
          tokenType: 'Bearer',
          authState: {
            username,
          }
        })
        setUser({ username })
        navigate("/");
        // window.location.href = '/'
      })
      .catch(err => console.error(err))
  }

  const hanndleRegisterRedirect = () => {
    window.location.href = '/register'
  }
  return (
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
  )
}

export default LoginPage;