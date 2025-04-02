import { Routes } from '@angular/router';
import { MissionListComponent } from './components/mission-list/mission-list.component';
import { MissionDetailsComponent } from './components/mission-details/mission-details.component';

export const routes: Routes = [
  { path: '', redirectTo: '/missions', pathMatch: 'full' },
  { path: 'missions', component: MissionListComponent },
  { path: 'mission/:flightNumber', component: MissionDetailsComponent },
  { path: '**', redirectTo: '/missions' }
];