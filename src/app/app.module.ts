import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

import { Enviroment } from './enviroment/config'

import { AngularFireModule } from '@angular/fire'

import { UsersComponent } from './users/users.component'
import { UsersListComponent } from './users-list/users-list.component'
import { UsersService } from './services/users.service'

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UsersListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(Enviroment.firebaseConfig)
  ],
  providers: [
    UsersService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
