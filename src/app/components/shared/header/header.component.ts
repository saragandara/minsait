import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import {LoginComponent} from '../../login/login.component';
import {PaisesComponent} from '../../paises/paises.component';

import {UserService} from '../../../services/user.service';
import {PaisesService} from '../../../services/paises.service';

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
  
  @ViewChild(LoginComponent) mlogin: LoginComponent;
  @ViewChild(PaisesComponent) mpaises: PaisesComponent;

  constructor(
    private router: Router, 
    private userService: UserService,
    private paisesService: PaisesService
  ) { }

  ngOnInit(): void {
    
  }

  ngAfterViewChecked() {
    console.log("Header ngAfterViewChecked...");
    this.user=this.userService.getUserLoggedIn();
    //console.log("  Usuerio: "+this.user);
    if(this.user!="") this.logged=true;
    else this.logged=false;

    console.log("  1 Nombre pais: "+this.nombrepais);
    if(this.nombrepais=="" || this.nombrepais==null) {
      this.nombrepais = this.paisesService.getNombrePais();
      console.log("  2 Nombre pais: "+this.nombrepais)
      this.haypais=false;
      if(this.nombrepais!="") this.haypais=true;
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

}
