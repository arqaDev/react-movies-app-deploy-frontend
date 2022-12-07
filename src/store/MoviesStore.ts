import { makeAutoObservable } from "mobx";
import jwt_decode from "jwt-decode";
import { IMovieDetails } from "../interfaces/interfaces";
import { check } from "../http/userApi";


export default class MoviesStore{
    _wishlistMovies: IMovieDetails[]
    _wishlistQuantity: number
    _LS: number | never

    constructor() {
        this._wishlistMovies = []   
        this._wishlistQuantity = 0
        this._LS = 0
        makeAutoObservable(this)
    }

    setWishlistMovies(movies: IMovieDetails[]): void {
        this._wishlistMovies = movies
    }

    setWishlistQuantity(num: number): void {
        this._wishlistQuantity = num
    }

    setLS(id: number): void {
        this._LS = id
    }

    get wishlistQuantity(): number {
        return this._wishlistQuantity
    }

    get LS(): number | never {
        const { id }:any = check()
        // try {
            // const jwt = localStorage.getItem('token')
            // const decodedToken: any = jwt_decode(jwt!)
            // const wishlistId = decodedToken.id
            // return wishlistId
            return id
        // } catch (e) {
        //     throw Error('you are not logged in')
        // }    
    }

    get wishlistMovies(): IMovieDetails[] {
        return this._wishlistMovies
    }
}