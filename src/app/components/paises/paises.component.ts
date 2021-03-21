import { Component, OnInit, ViewChild, Output, Input, EventEmitter } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import {NgForm} from '@angular/forms';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import {UserService} from '../../services/user.service';
import {PaisesService} from '../../services/paises.service';

@Component({
  selector: 'app-paises',
  templateUrl: './paises.component.html',
  styleUrls: ['./paises.component.css']
})
export class PaisesComponent implements OnInit {

  closeResult: string ="";

  public abierto: boolean = false;
  public usuario: string = null;
  public pais: string="";

  public paises = new FormControl();
  forma!: FormGroup;

  lpaises: any[] = [];
  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private paisesService: PaisesService
  ) { 
    //console.log("PAISES constructor");
    this.abierto=false;
  }

  ngOnInit(): void {
    this.paisesService.getPaises().subscribe( (data:any) => {
      this.lpaises = data;
      console.log(this.lpaises);
    })
  }

  ngAfterViewChecked() {
    //console.log("Paises ngAfterViewChecked...");
    this.usuario=this.userService.getUserLoggedIn();
    this.pais=this.paisesService.getPais();
    //console.log("  Usuario: "+this.user);
    if(this.usuario!="" && this.pais=="" && !this.abierto) {
      this.comprueba();
    } 
  }

  comprueba(){
    if(this.usuario=="") this.usuario = this.userService.getUserLoggedIn();
    if(this.pais=="") this.pais = this.paisesService.getPais();
    console.log("Paises Comprueba... Usuario: "+this.usuario+", Pais: "+this.pais);
    
    if(this.usuario!="" && this.pais==""){
      console.log("Ya hay usuario pero no pais");
      this.abierto=true;
      let element: HTMLElement = document.getElementsByClassName('lanzapaises')[0] as HTMLElement;
      element.click();
    }
  }

  changePais(e) {
    this.pais=e.target.value;
    let partes = this.pais.split(":");
    this.pais = partes[1].trim();
    this.paisesService.setPais(this.pais);
    console.log("changePais... Pais: "+this.pais+" ("+e.target.value+")");
  }

  setPais(forma){
    //alert(JSON.stringify(this.forma.value));
    console.log("En setPais... "+this.paisesService.getPais());
    this.abierto=false;

    let element: HTMLElement = document.getElementsByClassName('close')[0] as HTMLElement;
    element.click();
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
