import { $authHost } from "./index";
import { IDBWishlist, IMovieDetails } from "../interfaces/interfaces";


export const addMovie = async ({
    id,
    title,
    budget,
    genres,
    overview,
    release_date,
    status, 
    vote_average,
    img,
    production_countries,
    wishlistId}: IMovieDetails) => {
    const { data } = await $authHost.post(
        'api/wishlist/movie/add',
        {id, title, budget, genres, overview, release_date, status, vote_average, img, production_countries, wishlistId}
    )
        return data
    }

export const getAll = async (wishlistId: number): Promise<IDBWishlist> => {
    const { data } = await $authHost.post('api/wishlist/movies', {wishlistId})
    return data
}

export const destroy = async (id: number): Promise<IMovieDetails> => {
    const { data } = await $authHost.delete('api/wishlist/movie/delete/' + id.toString())
    return data
}