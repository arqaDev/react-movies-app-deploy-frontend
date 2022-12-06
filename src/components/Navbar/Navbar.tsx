import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { getAll } from '../../http/wishlistApi'
import { Context } from '../../index'
import './Navbar.scss'
import { AiOutlineStar, AiOutlineClose } from 'react-icons/ai'
import { FiLogOut } from 'react-icons/fi'
import { BiCameraMovie, BiMenu } from 'react-icons/bi'


const Navbar: React.FC = observer(() => {
  const { user, movies } = useContext(Context)
  const [fixed, setFixed] = useState<boolean>(false)
  const [isOpenedMenu, setIsOpenedMenu] = useState<boolean>(false)
  const history = useNavigate()
  const navRef:any = useRef(null)

  // get wishlist id and make a request to the DB, then get quantity of wishlist and render to the navbar
  useEffect(() => {
    const wishlistId = movies.LS
    getAll(wishlistId).then(resp => movies.setWishlistQuantity(resp.count))
  }, [])

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler)
    
    return function () {
        document.removeEventListener('scroll', scrollHandler)
    }
  }, [])

  // if navbar is not in the visible aria, then navbar becomes fixed
  const scrollHandler = (e: any) => {
      const scroll = e.target.documentElement.scrollTop - (navRef.current.clientHeight + navRef.current.offsetTop)
      if (scroll > 0) {
        setFixed(true)
      } else {
        setFixed(false)
      }
  }

  // handle for logout
  const logoutHandle = (e: React.MouseEvent<HTMLLIElement | HTMLButtonElement>): void => {
    user.setUser({})
    user.setAuth(false)
    setIsOpenedMenu(false)
  }

  // receive url, where will be redirect and hide menu
  const redirect = (url: string) => {
    history(url)
    setIsOpenedMenu(false)
  }

  // render navbar for auth users
  const getAuthMenu = () => {
    if (isOpenedMenu) {
      return (
        <>
          <li className="navbar__icon">
            <button className="toggleIcon navbar__toggleWishlist" onClick={() => redirect('/wishlist')}>Wish list</button>
          </li>
          <li className="navbar__icon">
            <button className="toggleIcon navbar__toggleLogout" onClick={logoutHandle}>logout</button>
          </li>
        </>
      )
    } else {
      return (
        <>
          <li className='navbar__icon'>
            <Link to={'/wishlist'} ><AiOutlineStar className='navbar__wishlist'/></Link>
            {movies.wishlistQuantity > 0 && <div className="navbar__quantity"><span>{movies.wishlistQuantity}</span></div>}
          </li>
          <li className='navbar__icon' onClick={logoutHandle}><FiLogOut className='navbar__logout'/></li>
        </>
      )
    }
  }

  // render navbar for unregistered users
  const getGuestMenu = () => {
    if (isOpenedMenu) {
      return (
        <>
          <button className="toggleIcon navbar__toggleLogin" onClick={() => redirect('/login')}>Sign In</button>
          <button className="toggleIcon navbar__toggleRegistration" onClick={() => redirect('/registration')}>Sign Up</button>
        </>
      )
    } else {
      return (
        <>
          <button className='navbar__login' onClick={() => history('/login')}>Sign In</button>
          <button className='navbar__registration' onClick={() => history('/registration')}>Sign Up</button>
        </>
      )
    }
  }

  return (
    <nav className={fixed ? 'navbar fixed' : 'navbar'} ref={navRef}>
        <div>
          <Link to={'/'} className="navbar__link">
            <BiCameraMovie className="navbar__logo"/>
            <h1 className='navbar__title'>Movie City</h1>
          </Link>
        </div>
        <div>
            {user.isAuth ? 
              <ul className={isOpenedMenu ? "navbar__toggleMenu" : "navbar__icons"}>
                {getAuthMenu()}
              </ul>
              : <div className={isOpenedMenu ? "navbar__toggleBtns" : "navbar__btns"}>
                  {getGuestMenu()}
                </div>
            }
            {isOpenedMenu &&
              <button className="navbar__closeMenu"><AiOutlineClose onClick={() => setIsOpenedMenu(false)} style={{fontSize: '1.5rem'}}/></button>
            }
        </div>
        <button className="navbar__openMenu" onClick={() => setIsOpenedMenu(true)}><BiMenu className="navbar__menuIcon"/></button>
    </nav>
  )
})

export default Navbar