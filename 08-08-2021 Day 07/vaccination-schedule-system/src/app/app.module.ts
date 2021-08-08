import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { APP_ROUTES } from './app.routes';
import { HomeComponent } from './components/home/home.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { AdministerVaccinationsComponent } from './components/administer-vaccinations/administer-vaccinations.component';
import { CursorStyleDirective } from './directives/cursor-style.directive';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    RegisterUserComponent,
    AdministerVaccinationsComponent,
    CursorStyleDirective
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(APP_ROUTES)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
