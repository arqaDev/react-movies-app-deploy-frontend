import React, { useContext, useEffect, useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Context } from './index'
import { check } from './http/userApi'
import './App.scss'
import Navbar from './components/Navbar/Navbar'
import AppRoutes from './components/AppRoutes'
import { observer } from 'mobx-react-lite'

const App = observer(() => {
  const { user } = useContext(Context)
  const [isLoading, setIsLoading] = useState(true)

  // check token
  useEffect(() => {
    check().then((data) => {
      user.setUser(true)
      user.setAuth(true)
    }).finally(() => setIsLoading(false))
  }, [])

  return (
    <Router>
      <header>
        <Navbar />
      </header>
      <main>
        {isLoading
          ? <h1 className="main-loading">Loading...</h1>
          : <AppRoutes />
        }
      </main>
    </Router>
  )
})

export default App
