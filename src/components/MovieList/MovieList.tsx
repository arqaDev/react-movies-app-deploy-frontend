import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Movie from '../Movie/Movie'
import { IMovieDetails } from '../../interfaces/interfaces'
import './MovieList.scss'


const MovieList: React.FC = () => {
    const [movies, setMovies] = useState<IMovieDetails[]>([])
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [fetching, setFetching] = useState<boolean>(true)
    const fetchURL = `${process.env.REACT_APP_MOVIE_URL}/discover/movie?sort_by=popularity.desc&api_key=${process.env.REACT_APP_API_KEY}&page=${currentPage}`

    useEffect(() => {

        // when page is at the bottom, render next movies
        if (fetching) {
            try {

                // get movie list, then render to the home page
                axios.get(fetchURL)
                .then(data => {
                    setMovies([...movies, ...data.data.results])
                    setCurrentPage(currentPage + 1)
                }).finally(() => setFetching(false))
            } catch (e) {
                console.log(e)
            }   
        } 
    }, [fetching])

    useEffect(() => {

        // create scroll event listener for getting data with movies  
        document.addEventListener('scroll', scrollHandler)
        
        return function () {
            document.removeEventListener('scroll', scrollHandler)
        }
    }, [])

    // handler for scrolling, if difference between top and bottom is less than 100 px, then load next movies
    const scrollHandler = (e: any) => {
        const scroll = e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight)

        if (scroll < 100) {
            setFetching(true)
        }
    }
    
    return (
        <div className='movies__container'>
            {movies.map(movie => 
                <Movie key={movie.id} id={movie.id} title={movie.title} poster_path={movie.poster_path} vote_average={movie.vote_average}/>
            )}
        </div>
    )
}

export default MovieList