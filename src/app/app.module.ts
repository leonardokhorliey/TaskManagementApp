import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './usable_components/header/header.component';
import { ButtonComponent } from './usable_components/button/button.component';
//import { RegisterComponent } from './components/register/register.component';
import { RegisterListComponent } from './usable_components/register-list/register-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RegFormComponent } from './usable_components/reg-form/reg-form.component';
//import { AboutComponent } from '../usable_components/about/about.component';
//import { FooterComponent } from './components/footer/footer.component';
import { RegisteredComponent } from './usable_components/registered/registered.component';
import { LoginComponent } from './usable_components/login/login.component';
//import { AdminComponent } from './components/admin/admin.component';


const appRoutes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'create-task',component: RegFormComponent },
  { path: 'regList', component: RegisterListComponent },
  { path: 'registered', component: RegisteredComponent },
  { path: 'login', component: LoginComponent }
]



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ButtonComponent,
    //RegisterComponent,
    RegisterListComponent,
    RegFormComponent,
    //AboutComponent,
    //FooterComponent,
    RegisteredComponent,
    LoginComponent
    //AdminComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    RouterModule.forRoot(appRoutes, {enableTracing: true }),
  ],
  providers: [RegisterListComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
