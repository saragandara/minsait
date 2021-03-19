import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  hoy: Date = new Date();
  anno: number = 0;
  constructor() { }

  ngOnInit(): void {
    this.anno = this.hoy.getFullYear();
  }

}
