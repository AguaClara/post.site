import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { LoginComponent } from './login/login.component';
import { PlantComponent } from './plant/plant.component';
import { AboutComponent } from './about/about.component';
import { InstallationComponent } from './installation/installation.component';
import { PlantselectorComponent } from './plantselector/plantselector.component';
import { SubscribedComponent } from './subscribed/subscribed.component';

const router: Routes = [
  { path: '', redirectTo: 'app-plant', pathMatch: 'full' },
  { path: 'app-login', component: LoginComponent },
  { path: 'app-plant', component: PlantComponent },
  { path: 'app-about', component: AboutComponent },
  { path: 'app-installation', component: InstallationComponent },
  { path: 'app-plantselector', component: PlantselectorComponent},
  { path: 'app-subscribed', component:SubscribedComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(router)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
