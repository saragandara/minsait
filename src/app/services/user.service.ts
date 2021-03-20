import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

    private isUserLoggedIn;

    constructor() { 
        this.isUserLoggedIn = false;
    }

    setUserLoggedIn(user:string) {
        this.isUserLoggedIn = true;
        localStorage.setItem('currentUser', user);
    }

    checkLogin(){
        let user = this.getUserLoggedIn();
        if ( user == null ) this.goToLogin();
    }

    getUserLoggedIn() {
        let resp = localStorage.getItem('currentUser');
        //console.log("User Service getUserLoggedIn... Usuario: "+resp);
        if(resp==null) return resp="";
        return resp;
    }

    removeUserLoggedIn() {
        localStorage.clear();
    }

    goToLogin(){
        this.removeUserLoggedIn();
    }
}