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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddVaccinationComponent } from './components/administer-vaccinations/add-vaccination/add-vaccination.component';
import { VaccinationCardsComponent } from './components/administer-vaccinations/vaccination-cards/vaccination-cards.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    RegisterUserComponent,
    AdministerVaccinationsComponent,
    CursorStyleDirective,
    AddVaccinationComponent,
    VaccinationCardsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(APP_ROUTES)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
