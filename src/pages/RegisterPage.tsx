import { useEffect, useState } from "react"
import { UserService } from "../lib/services/UserService"
import { faker } from '@faker-js/faker';
import { User } from "../lib/types";

function RegisterPage({setUser }: { setUser: React.Dispatch<React.SetStateAction<User | undefined>> }) {
  const pass = faker.internet.password(20);
  const [email, setEmail] = useState(faker.internet.email())
  const [password, setPassword] = useState(pass)
  const [confirmPassword, setConfirmPassword] = useState(pass)

  const [validForm, setValidForm] = useState(false);

  const userService = new UserService();

  useEffect(() => {
    const emailRegex = new RegExp(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/);

    if (
      emailRegex.test(email) &&
      password === confirmPassword &&
      password !== "" &&
      confirmPassword !== ""
    ) {
      setEmail(email.trim());
      setPassword(password.trim());
      setValidForm(true);
    } else {
      setValidForm(false);
      alert("Please enter a valid email and password");
    }
  }, [email, password, confirmPassword])

  const handleRegister = () => {
    userService.register(email, password)
      .then(() => {
        userService.login(email, password)
          .then(({ user }) => {
            window.location.href = '/'
            setUser(user)
          })
          .catch(err => console.error(err))
      })
      .catch(err => console.error(err))
  }

  const hanndleLoginRedirect = () => {
    window.location.href = '/login'
  }


  return (
    <section className='grid place-items-center'>
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Register</h2>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <div className="form-control w-full max-w-xs mb-1">
            <label className="label">
              <span className="label-text">Confirm your password</span>
            </label>
            <input
              type="password"
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
            />
          </div>
          <button className={`btn ${!validForm ? 'btn-disabled' : 'btn-success'}`} onClick={handleRegister} >Register</button>
          <button className="btn" onClick={hanndleLoginRedirect} >Already have an account? Login here</button>
        </div>
      </div>
    </section>
  )
}

export default RegisterPage