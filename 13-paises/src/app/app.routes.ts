import { Routes } from '@angular/router';
import { PaisesComponent } from './pages/paises/paises.component';

export const routes: Routes = [
  { path: '', component: PaisesComponent },
  { path: 'pais/:id', component: PaisesComponent },
  { path: '**', component: PaisesComponent },
];
