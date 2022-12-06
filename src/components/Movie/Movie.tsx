import React, {useRef} from 'react'
import { IMovieDetails } from '../../interfaces/interfaces'
import { useNavigate } from 'react-router-dom'
import './Movie.scss'


const Movie: React.FC<IMovieDetails> = ({id, title, poster_path, vote_average}) => {
  const imgURL = `${process.env.REACT_APP_IMG_URL}${poster_path}`
  const history = useNavigate()
  const ref = useRef()

  // link to the detail page 
  const linkHandle = (): void => {
    history(`/movie/detail/${id}`)
  }
  
  return (
      <div className='movie__content' onClick={linkHandle}>
        <div className='movie__img'>
            <img src={imgURL} alt="movie-pic" />
        </div>
        <div className="movie__info">
            <h2 className='movie__title'>{title}</h2>
            <div className='movie__rating'>
                <span className="movie__ratingTitle">{vote_average}</span>
            </div>
        </div>
      </div>
    
  )
}

export default Movie