import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AmplifyAngularModule, AmplifyService } from 'aws-amplify-angular';
import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { AuthComponent } from './components/auth/auth.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    AuthComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AmplifyAngularModule
  ],
  providers: [AmplifyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
