import { makeAutoObservable } from "mobx";


export default class UserStore {
    _isAuth: boolean;
    _user: Object

    constructor() {
        this._isAuth = false
        this._user = {}
        makeAutoObservable(this)
    }

    setAuth(bool: boolean): void {
        this._isAuth = bool
    }

    setUser(user: Object): void {
        this._user = user
    }

    get isAuth(): boolean {
        return this._isAuth
    }

    get user(): Object {
        return this._user
    }
}