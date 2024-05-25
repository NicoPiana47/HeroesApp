import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { HeroPageComponent } from './pages/hero-page/hero-page.component';

//Es muy importante el orden. Angular lee de arriba para abajo. Las rutas más especificas van al comienzo. Las más generales al final.
//Si tuvieramos :id al principio, cualquier cosa que le siguiera a 'heroes/' entraría ahí, esquivando 'new-hero', 'search', etc, ya que las toma de parámetro 'ID'

//Luego, para mostrar el layout y el hijo A LA VEZ, utilizamos "<router-outlet></router-outlet>" dentro del html del layout.
const routes: Routes = [
  {
    // localhost:4200/heroes/
    path: '',
    component: LayoutPageComponent,
    children: [ //Antes, para los hijos del app-routing, cargábamos módulos. Acá también lo podríamos hacer, pero definimos las rutas hijas dentro del mismo módulo.
      {path: 'new-hero', component: NewPageComponent},
      {path: 'search', component: SearchPageComponent},
      {path: 'edit/:id', component: NewPageComponent},
      {path: 'list', component: ListPageComponent},
      {path: ':id', component: HeroPageComponent},
      {path: '**', redirectTo: 'list'}, //Cuando entre a 'localhost:4200/heroes/', irá al layout y, como el children '' de layout no está definido, entrará acá, yendo al listado
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroesRoutingModule { }
