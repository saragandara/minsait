import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import {LoginComponent} from '../../login/login.component';
import {PaisesComponent} from '../../paises/paises.component';

import {UserService} from '../../../services/user.service';
import {PaisesService} from '../../../services/paises.service';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public logged: boolean = false;
  public user: string = null;
  public nombrepais: string = null;
  public haypais: boolean = false;
  public pais: string = "";
  
  @ViewChild(LoginComponent) mlogin: LoginComponent;
  @ViewChild(PaisesComponent) mpaises: PaisesComponent;

  constructor(
    private router: Router, 
    private userService: UserService,
    private paisesService: PaisesService
  ) { 
    this.haypais=false;
  }

  ngOnInit(): void {
    
  }

  ngAfterViewChecked() {
    //console.log("Header ngAfterViewChecked...");
    this.user=this.userService.getUserLoggedIn();
    if(this.user!="") this.logged=true;
    else this.logged=false;

    //No se puede cambiar el pais
    if(this.haypais==false) {
      this.pais = this.paisesService.getPais();
      if(this.pais==null) this.pais="";
      if(this.pais!="") {
        this.nombrepais = this.paisesService.getNombrePais();
        if(this.nombrepais==null) this.nombrepais="";
        if(this.nombrepais!="") this.haypais=true;
      }
    }
  }

  login(usuario: string) {
    this.user = usuario;
    this.logged = true;
    this.router.navigate(['/home']);
  }

  logout() {
    console.log("Logout!");
    this.logged = false;
    this.user = null;
    
    localStorage.clear();
    this.router.navigate(['/home']);
  }

  cambiaPais(){
    this.paisesService.removePais();
  }

}
