import { Component, OnInit, ViewChild, Output, Input, EventEmitter } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import {NgForm} from '@angular/forms';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  closeResult: string ="";

  public error: string = "";
  public hayerror: boolean = false;

  private lanzado: boolean = false;

  public username = new FormControl();
  public password = new FormControl();
  forma!: FormGroup;

  @Output() public usuario: string ="";

  constructor(
      private modalService: NgbModal,
      private formBuilder: FormBuilder,
      private userService: UserService,
    ) { 
      this.usuario = this.userService.getUserLoggedIn();

      this.crearFormulario();
      //console.log("Usuario logado: "+this.usuario);
    }

  ngOnInit(): void {
    this.comprueba();
  }

  /*ngAfterViewChecked(){
    if(!this.lanzado) {
      this.comprueba();
      this.lanzado=true;
    }
  }*/

  getUsuarioLogado(){
    let resp = localStorage.getItem('currentUser');
    if(resp==null) return "";
    return resp;
  }

  crearFormulario(){
    this.forma = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', Validators.required],
      proceso: ['login']
    });
  }

  get usernameInvalid(){
    return this.forma.get('username').invalid && this.forma.get('username').touched
  }

  get passwordInvalid(){
    return this.forma.get('password').invalid && this.forma.get('password').touched
  }

  comprueba(){
    console.log("Login Comprueba... USUARIO: "+this.usuario);
    this.usuario = this.getUsuarioLogado();
    if(this.usuario==""){
      console.log("No hay usuario");
      let element: HTMLElement = document.getElementsByClassName('lanzalogin')[0] as HTMLElement;
      element.click();
    }
  }

  logIn(){
    console.log("Formulario enviado");

    if(this.forma.invalid){
      return Object.values( this.forma.controls ).forEach(control => {
        control.markAsTouched();
      });
    } else {
      let usuario = this.forma.get("username").value;
      let pass = this.forma.get("password").value;
      console.log("logIn. Usuario: "+usuario+", pass: "+pass);
      if(usuario=="sara@minsait.com" && pass=="1234"){
        this.hayerror=false;
        this.error="";
        this.usuario=usuario;
        
        this.userService.setUserLoggedIn(usuario);

        let element: HTMLElement = document.getElementsByClassName('close')[0] as HTMLElement;
        element.click();
      }else{
        this.hayerror=true;
        if(usuario=="sara@minsait.com") this.error="Contraseña incorrecta";
        else if(pass=="1234") this.error="Usuario incorrecto";
        else this.error="Usuario y contraseña incorrectos"
      }
    }

  }

  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log("Cerrado por... "+this.closeResult);      
      this.comprueba();
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log("Cerrado por... "+this.closeResult);      
      this.comprueba();
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
