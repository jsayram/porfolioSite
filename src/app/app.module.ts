import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from '../angular-bootstrap-md'; // this is not from Node_Modules , Since I had to modify navbar

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeaderComponent } from './components/header/header.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { SmoothScrollToDirective, SmoothScrollDirective } from "../../node_modules/ng2-smooth-scroll";
import { FooterComponent } from './components/footer/footer.component';
import { ContactComponent } from './components/contact/contact.component';

//Google Maps Module
import { AgmCoreModule } from '@agm/core';
import { MapComponent } from './components/map/map.component';


//data service for mongodb
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { DataService} from './services/data.service';

//for the form module
import { FormsModule } from '@angular/forms';


//for flash-messages
import { FlashMessagesModule } from 'angular2-flash-messages';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeaderComponent,
    ProjectsComponent,
    SmoothScrollDirective,
    SmoothScrollToDirective,
    FooterComponent,
    ContactComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDZjllB6NtE4FdR0xzWg2ATx_0oSfSNWeI'
    }),
    HttpClientModule,
    FormsModule,
    FlashMessagesModule.forRoot()
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [DataService, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
