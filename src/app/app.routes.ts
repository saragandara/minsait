import {RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { EquiposComponent } from './components/equipos/equipos.component';
import { EventosComponent } from './components/eventos/eventos.component';

const APP_ROUTES: Routes = [
    { path: 'home', component: HomeComponent},
    { path: 'equipos', component: EquiposComponent},
    /*{ path: 'equipo/:id', component: EquiposComponent},*/
    { path: 'eventos', component: EventosComponent},
    { path: '**', pathMatch: 'full', redirectTo: 'home'}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);