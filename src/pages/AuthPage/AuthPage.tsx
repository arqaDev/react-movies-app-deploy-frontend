import React, { useContext, useState, useRef, useEffect } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { AxiosError } from 'axios'
import { observer } from 'mobx-react-lite'
import { IPassword } from '../../interfaces/interfaces'
import { usePasswordValidation } from '../../hooks/usePasswordValidation'
import { Context } from '../../index'
import { login, registration } from '../../http/userApi'
import ErrorMessage from '../../components/ErrorMessage'
import MyInput from '../../components/UI/MyInput'
import './AuthPage.scss'
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai'


const AuthPage = observer(() => {
  const { user } = useContext(Context)
  const [email, setEmail] = useState<string>('')
  const [error, setError] = useState<string>('')
  const location = useLocation()
  const history = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)
  const isLogin = location.pathname === '/login'
  const [password, setPassword] = useState<IPassword>({
    firstPassword: "",
    secondPassword: "",
  })

  // create focus on email and when the page change location, the password field is cleared
  useEffect(() => {
    inputRef.current?.focus()
    setEmail('')
    setPassword({firstPassword: '', secondPassword: ''})
    setError('')
  }, [location])

  // get validation fields from password hook
  const validation = usePasswordValidation({
    firstPassword: password.firstPassword,
    secondPassword: password.secondPassword,
  })
  const allValid = validation.every(item => item.isValid)

  // change password fields, when input it
  const setFirst = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword({ ...password, firstPassword: e.target.value })
  }
  const setSecond = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword({ ...password, secondPassword: e.target.value })
  }

  function getValidationRules (item: any) {

    return (
      <li className="auth__validationItem" key={item.title}>
        {item.isValid ? <AiOutlineCheck style={{color: '#06c755'}}/> : <AiOutlineClose style={{color: '#ef5350'}}/>}
        <span style={{marginLeft: '1rem'}}>{item.title}</span>
      </li>
    )
  }

  // handler, which send login form or registration form 
  const click = async (e: React.MouseEvent<HTMLButtonElement>) => { 
    try{
      
      // if it's login page, then add user to userStore and token to localstorage
      if (isLogin) {
        await login(email, password.firstPassword)
        user.setUser(user)
        user.setAuth(true)
        history('/')
      } else {

        // if all password conditions are completed and email field includes "@", then send registration form, else return error 
        if (allValid && email.includes('@')) {
          await registration(email, password.firstPassword)
          user.setUser(user)
          user.setAuth(true)
          history('/')
        } else if (!allValid || !email.includes('@')) {
          setError('email или пароль введен некорректно')
          setPassword({firstPassword: '', secondPassword: ''})
        }
      }
    } catch(err) { 
      if (err instanceof AxiosError) {
        if (err.response?.status === 404 && isLogin) {
          setError('Такого пользователя не существует')
          setPassword({firstPassword: "", secondPassword: ""})
        } else if (err.response?.status === 404 && !isLogin) {
          setError('Такой пользователь уже существует')
          setPassword({firstPassword: "", secondPassword: ""})
        }
      }
    }
  }

  return (
    <div className='auth__container'>
      <div className='auth__content'>
        {isLogin ?
          <h1 className='auth__title'>Sign In</h1>
          : <h1 className='auth__title'>Sign Up</h1>
        }
        <form className='auth__form' onSubmit={(e: React.SyntheticEvent) => e.preventDefault()}> 
          {error && <ErrorMessage backgroundColor='#ffcdd2' color='#ef5350' message={error} />}
          <MyInput
            className="auth__email"
            ref={inputRef}
            type="email"
            placeholder='email'
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          />
          <MyInput
            className="auth__password"
            type="password"
            placeholder='password'
            value={password.firstPassword}
            onChange={setFirst}
          />
          {!isLogin &&
            <>
              <MyInput
              className="auth__password"
              type="password"
              placeholder='repeat password'
              value={password.secondPassword}
              onChange={setSecond}
              />
              <ul className="auth__validation">
                {validation.map(item => 
                  getValidationRules(item)
                )}
              </ul>
            </>
          }
          {isLogin ?
              <div className='auth__btns'>
                <button className='auth__btn' onClick={click}>Sign In</button>
                <span className="auth__accountMessage">Have you not an account? <Link className="auth__registrationLink" to={'/registration'}>Sign Up</Link></span>
              </div>
              : <div className='auth__btns'>
                  <button className='auth__btn' onClick={click}>Sign Up</button>
                </div>
          }
        </form>
      </div>
    </div>
  )
})

export default AuthPage