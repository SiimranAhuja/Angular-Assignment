import { Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { ViewComponent } from './view/view.component';
import { CreateComponent } from './create/create.component';
import { PreviewComponent } from './preview/preview.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './auth-guard.guard';
import { LoginGuard } from './login.guard';

export const routes: Routes = [
    {
        path: '', component: HomeComponent
    },
    {
        path: 'authenticate/:type', component: AuthenticationComponent
    },
    {
        path: 'view/:id', component: ViewComponent, canActivate: [LoginGuard]
    },
    {
        path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]
    },
    {
        path: 'preview', component: PreviewComponent
    },
    {
        path: 'create', component: CreateComponent
    }
];
