import { Routes } from "@angular/router";
import { AdministerVaccinationsComponent } from "./components/administer-vaccinations/administer-vaccinations.component";
import { HomeComponent } from "./components/home/home.component";
import { RegisterUserComponent } from "./components/register-user/register-user.component";

export const APP_ROUTES: Routes = [
    {
        path: "home",
        component: HomeComponent
    },
    {
        path:"register-user",
        component:RegisterUserComponent
    },
    {
        path: "administer-vaccinations",
        component: AdministerVaccinationsComponent
    },
    {
        path: "**",
        redirectTo: "home",
        pathMatch: "full"
    }
];