import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TemplateComponent } from 'src/app/shared/template/template.component';
import { HomePageComponent } from 'src/app/components/home-page/home-page.component';
import { UserEditComponent } from 'src/app/user-edit/user-edit.component';
import { UsersComponent } from 'src/app/users/users.component';
import { PartnersComponent } from 'src/app/components/partners/partners.component';
import { PartnerEditComponent } from 'src/app/components/partner-edit/partner-edit.component';
import { FormsModule } from '@angular/forms';
import { ServicesComponent } from 'src/app/components/services/services.component';
import { ServiceEditComponent } from 'src/app/components/service-edit/service-edit.component';
import { ReservationsComponent } from 'src/app/components/reservations/reservations.component';
import { FilterPipe } from 'src/app/pipes/search.pipe';



@NgModule({
  declarations: [
    TemplateComponent,
    HomePageComponent,
    UserEditComponent,
    UsersComponent,
    PartnersComponent,
    PartnerEditComponent,
    ServicesComponent,
    ServiceEditComponent,
    ReservationsComponent,
    FilterPipe],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '', component: TemplateComponent,
        children: [
          { path: '', component: HomePageComponent },
          { path: 'user-list', component: UsersComponent },
          { path: 'user-edit', component: UserEditComponent },
          { path: 'user-partners', component: PartnersComponent },
          { path: 'user-partner-edit', component: PartnerEditComponent },
          { path: 'services/:partnerId', component: ServicesComponent },
          { path: 'service-edit/:partnerId', component: ServiceEditComponent },
          { path: 'reservations', component: ReservationsComponent },
          //   { path: 'profile', component: UserProfileComponent },
          //   { path: 'Dashboard', component: DashboardHomeComponent, },
        ]
      },
    ])
  ]
})
export class DashboardModule { }
