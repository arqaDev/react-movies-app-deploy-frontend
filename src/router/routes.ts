import Auth from '../pages/AuthPage/AuthPage'
import Wishlist from '../pages/WishlistPage/WishlistPage'
import Home from '../pages/HomePage'
import DetailPage from '../pages/DetailPage/DetailPage'


export const publicRoutes = [
    {
        path: '/',
        Component: Home
    },
    {
        path: '/login',
        Component: Auth
    },
    {
        path: '/registration',
        Component: Auth
    },
    {
        path: '/movie/detail/:id',
        Component: DetailPage
    },
]

export const authRoutes = [
    {
        path: '/wishlist',
        Component: Wishlist
    },
]
