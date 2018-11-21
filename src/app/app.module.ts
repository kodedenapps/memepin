import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AmplifyAngularModule, AmplifyService } from 'aws-amplify-angular';
import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { AuthComponent } from './components/auth/auth.component';
import { HeaderComponent } from './components/header/header.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';


@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    AuthComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AmplifyAngularModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCXc2nqJCGIH_ftRXD-O6QH4-iUshopiCo\n'
    })
  ],
  providers: [AmplifyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
