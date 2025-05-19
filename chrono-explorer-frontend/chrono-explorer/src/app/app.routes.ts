import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LignetempsComponent } from './lignetemps/lignetemps.component';
import { RechercheComponent } from './recherche/recherche.component';
import { DetailsComponent } from './details/details.component';
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './signin/signin.component';
import { AdminCommentComponent } from './admin-comment/admin-comment.component';
import { FavorisComponent } from './favoris/favoris.component';

export const routes: Routes = [
    {
        path: '',
        component : HomeComponent
    },
    {
        path: 'lignetemps',
        component: LignetempsComponent
    },
    {
        path: 'recherche',
        component: RechercheComponent
    },
    {
        path: 'details/:id',
        component: DetailsComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'signin',
        component: SigninComponent
    },
    {
        path: 'adminComment',
        component: AdminCommentComponent
    },
    {
        path: 'favoris',
        component: FavorisComponent
    }
];
