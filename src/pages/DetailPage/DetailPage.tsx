import React, {useEffect, useState, useContext} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Context } from '../../index'
import { addMovie, destroy, getAll } from '../../http/wishlistApi'
import { IMovieDetails } from '../../interfaces/interfaces'
import './DetailPage.scss'
import { AiOutlineCheck } from 'react-icons/ai'
import { observer } from 'mobx-react-lite'


async function fetchData(url: string) {
  const data = await axios.get(url).then(data => data.data)
  const {
    id,
    budget,
    genres,
    title,
    overview,
    release_date,
    status,
    vote_average,
    poster_path,
    production_countries
  } = data
  const img = `${process.env.REACT_APP_IMG_URL}${poster_path}`
  const rating = Math.round(vote_average * 10) / 10

  return {id, budget, genres, title, overview, release_date, status, vote_average: rating, img, production_countries}
}

const DetailPage = observer(() => {
  const { id } = useParams()
  const [movie, setMovie] = useState<IMovieDetails>({})
  const { user, movies } = useContext(Context)
  const history = useNavigate()
  const wishlistId = movies.LS
  const isAdded = movies.wishlistMovies.find(item => item.id === movie.id)
  const movieDetailURL = `${process.env.REACT_APP_MOVIE_URL}/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}`
  
  // get movie info and render to the detail page
  useEffect(() => {
    async function getMovie() {
      const data = fetchData(movieDetailURL)
      data.then(resp => {
        setMovie(resp)
      })
    }
    getMovie()
  }, [])

  // handler, which add movie to the wishlist or destroy movie from the wishlist
  const addToWishlist = (): void => {
    if (user.isAuth) {
      if (isAdded) {
        destroy(movie.id!)
        movies.setWishlistMovies(movies.wishlistMovies.filter(it => it.id !== movie.id))
        movies.setWishlistQuantity(movies.wishlistQuantity - 1) 
      } else {
        const data = fetchData(movieDetailURL)
        data.then(resp => {
          addMovie({...resp, wishlistId})
          movies.setWishlistMovies([...movies.wishlistMovies, resp])
          movies.setWishlistQuantity(movies.wishlistQuantity + 1) 
        })
      }
    } else {
      history('/login')
    }
  }
  

  return (
    <div className="currentMovie__container">
      <div className="currentMovie__content">
        <div className="currentMovie__mainInfo">
          <h1 className="currentMovie__title">{movie.title}</h1>
          <div className="currentMovie__img">
            <img src={movie.img} alt="movie_poster" />
          </div>
        </div>
        <div className="currentMovie__details">
          <h2 className="currentMovie__detailsHeader">About Movie</h2>
          <div className="currentMovie__detailsInfo">
            <span className="currentMovie__detailsTitle">Genres</span>
            <ul className="currentMovie__genres">
              {movie.genres?.map(genre => <li className="detailsBody currentMovie__genre" key={genre.id}>{genre.name}</li>)}
            </ul>
          </div>
          <div className="currentMovie__detailsInfo">
            <span className="currentMovie__detailsTitle">Countries</span>
            <ul className="currentMovie__countries">
              {movie.production_countries?.map((country, index) =>
                <li className="detailsBody currentMovie__country" key={index}>{country.name}</li>
              )}
            </ul>
          </div>
          <div className="currentMovie__detailsInfo">
            <span className="currentMovie__detailsTitle">Release date</span>
            <span className="detailsBody">{movie.release_date}</span>
          </div>
            <div className="currentMovie__detailsInfo">
              <span className="currentMovie__detailsTitle">Status</span>
              <span className="detailsBody">{movie.status}</span>
            </div>
            <div className="currentMovie__detailsInfo">
              <span className="currentMovie__detailsTitle">Rating</span>
              <span className="detailsBody">{movie.vote_average}</span>
            </div>
            <div className="currentMovie__overview">
              <h2 className="currentMovie__overviewTitle">Overview</h2>
              <p className="currentMovie__overviewText">{movie.overview}</p>
            </div>
            {user.isAuth ?
              isAdded ? 
                <button className="currentMovie__added" onClick={addToWishlist}><AiOutlineCheck className="currentMovie__addedIcon"/></button>
                : <button className="currentMovie__favBtn" onClick={addToWishlist}>+ add to wishlist</button>
              : false
            }
        </div>
      </div>
    </div>
  )
})

export default DetailPage