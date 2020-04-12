import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// // import { CoreModule } from '../core/core.module';
//
import { ClarityModule } from "@clr/angular";//"clarity-angular";
import { ClarityIcons } from "@clr/icons";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { DownloadsComponent } from './downloads/downloads.component';
import { GraphComponent } from './graph/graph.component';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav/nav.component';
import { PlantComponent } from './plant/plant.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SubscribedComponent } from './subscribed/subscribed.component';
import { TableComponent } from './table/table.component';
import { InstallationComponent } from './installation/installation.component';
import { PlantselectorComponent } from './plantselector/plantselector.component';
import { routes } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


// import { CommonModule } from '@angular/common';
//
// import * as PlotlyJS from 'plotly.js/dist/plotly.js';
// import { PlotlyModule } from 'angular-plotly.js';
// PlotlyModule.plotlyjs = PlotlyJS;

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    DownloadsComponent,
    GraphComponent,
    LoginComponent,
    NavComponent,
    PlantComponent,
    SidenavComponent,
    SubscribedComponent,
    TableComponent,
    InstallationComponent,
    PlantselectorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    // CommonModule,
    // PlotlyModule,
    BrowserAnimationsModule//,
    // ClarityModule.forRoot(),
    // FormsModule,
    // //AppRoutingModule,////////////////////////////////////
    // // HttpModule,
    // AngularFireModule.initializeApp(firebaseConfig),
    // CoreModule,
    // routes
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
