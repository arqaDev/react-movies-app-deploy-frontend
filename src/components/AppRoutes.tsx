import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Context } from '../index'
import { authRoutes, publicRoutes } from '../router/routes'


const AppRoutes: React.FC = observer(() => {
    const { user } = useContext(Context)

    return (
        <Routes>
            {user.isAuth && authRoutes.map(({path, Component}) => <Route key={path} path={path} element={<Component />}/>)}
            {publicRoutes.map(({path, Component}) => <Route key={path} path={path} element={<Component />}/>)}
            <Route path="/*" element={<Navigate to={'/'}/>}/>
        </Routes>
    )
})

export default AppRoutes