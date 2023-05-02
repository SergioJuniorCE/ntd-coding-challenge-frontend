import { useEffect, useState } from "react"
import { UserService } from "../lib/services/UserService"

function RegisterPage() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

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
    }
  }, [email, password, confirmPassword])

  const handleRegister = () => {
    userService.register(email, password)
      .then(() => {
        userService.login(email, password)
          .then(() => {
            window.location.href = '/'
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