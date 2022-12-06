import React, { useEffect, useContext } from 'react'
import { getAll, destroy } from '../../http/wishlistApi'
import { IMovieDetails } from '../../interfaces/interfaces'
import { Context } from '../../index'
import './WishlistPage.scss'
import { AiOutlineClose } from 'react-icons/ai'
import { observer } from 'mobx-react-lite'
import { Link } from 'react-router-dom'


const WishlistPage: React.FC = observer(() => {
  const { movies } = useContext(Context)

  // get wishlist from DB
  useEffect(() => {
    const wishlistId = movies.LS
    const data = getAll(wishlistId)
    data.then(resp => {
      movies.setWishlistMovies(resp.rows)
    })
  }, [])

  //handler, which remove movie from wishlist 
  const removeMovie = (id: number) => {
    destroy(id)
    movies.setWishlistMovies(movies.wishlistMovies.filter(item => item.id !== id))
    movies.setWishlistQuantity(movies.wishlistQuantity - 1)
  }

  const getMovie = (item: IMovieDetails) => {
    const genres = item.genres?.map(genre => {
      try {
        return JSON.parse(genre)
      } catch (e) {
        return genre
      }   
    })
    
    return (
      <div key={item.id} className="wishlist__container">
        <div className="wishlist__content">
          <div className="wishlist__poster">
            <img src={item.img} alt={item.title} />
          </div>
          <div className="wishlist__info">
            <h1 className="wishlist__title">{item.title}</h1>
            <ul className="wishlist__genres">
              {genres?.map(genre => <li className="wishlist__genre" key={genre.id}>{genre.name}</li>)}
            </ul>
            <h2 className="wishlist__overviewTitle">Overview</h2>
            <p className="wishlist__overview">{item.overview}</p>
            <div className="wishlist__rating">
              <span>{item.vote_average}</span>
            </div>
          </div>
          <AiOutlineClose className="wishlist__remove" onClick={() => removeMovie(item.id!)}/>
        </div>
      </div>
    ) 
  }

  return (
    <div className="wishlist">
      {movies.wishlistMovies.length > 0 ? 
        movies.wishlistMovies.map(movie => getMovie(movie))
        : (
            <div className="wishlist__empty">
              <div className="wishlist__emptyContent">
                <h1 className="wishlist__emptyTitle">Your wishlist is empty!</h1>
                <span>Back to the <Link to={'/'} className="wishlist__homeLink">home page</Link></span>
              </div>
            </div>   
          )
      }
    </div>
  )
})

export default WishlistPage