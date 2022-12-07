import { makeAutoObservable } from "mobx";
import jwt_decode from "jwt-decode";
import { IMovieDetails } from "../interfaces/interfaces";
import { check } from "../http/userApi";


export default class MoviesStore{
    _wishlistMovies: IMovieDetails[]
    _wishlistQuantity: number

    constructor() {
        this._wishlistMovies = []   
        this._wishlistQuantity = 0
        makeAutoObservable(this)
    }

    setWishlistMovies(movies: IMovieDetails[]): void {
        this._wishlistMovies = movies
    }

    setWishlistQuantity(num: number): void {
        this._wishlistQuantity = num
    }

    get wishlistQuantity(): number {
        return this._wishlistQuantity
    }

    get LS(): number | never {
        const { id }: any = check()
        
        return id
    }

    get wishlistMovies(): IMovieDetails[] {
        return this._wishlistMovies
    }
}