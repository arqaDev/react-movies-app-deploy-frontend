interface ICountries {
    [key: string]: string;
    name: string
}

interface IGenres {
    id: number,
    name: string,
}

export interface IMovieDetails {
    id?: number;
    img?: string;
    poster_path?: string;
    budget?: number;
    genres?: IGenres[] | Array<any>;
    title?: string;
    overview?: string;
    release_date?: string;
    status?: string;
    vote_average?: number;
    production_countries?: ICountries[],
    wishlistId?: number
}

export interface IError {
    backgroundColor: string;
    color: string;
    message: string;
}

export interface IPassword {
    firstPassword: string;
    secondPassword: string;
    requiredLength?: number
}

export interface IValid {
    title: string;
    isValid: boolean
}

export interface IDBWishlist {
    count: number,
    rows: IMovieDetails[]
}