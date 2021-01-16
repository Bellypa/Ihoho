import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TemplateComponent } from 'src/app/shared/template/template.component';
import { HomePageComponent } from 'src/app/components/home-page/home-page.component';
import { UserEditComponent } from 'src/app/user-edit/user-edit.component';
import { UsersComponent } from 'src/app/users/users.component';
import { PartnersComponent } from 'src/app/partners/partners.component';
import { PartnerEditComponent } from 'src/app/partner-edit/partner-edit.component';



@NgModule({
  declarations: [TemplateComponent,HomePageComponent, UserEditComponent, UsersComponent
  ,PartnersComponent, PartnerEditComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '', component: TemplateComponent,
        children: [
          { path: '', component: HomePageComponent },
          { path: 'user-list', component: UsersComponent },
          { path: 'user-edit', component: UserEditComponent},
          { path: 'user-partners', component: PartnersComponent },
          { path: 'user-partner-edit', component: PartnerEditComponent },
        //   { path: 'profile', component: UserProfileComponent },
        //   { path: 'Dashboard', component: DashboardHomeComponent, },
        ]
      },
    ])
  ]
})
export class DashboardModule { }
