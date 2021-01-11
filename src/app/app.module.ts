import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';

import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


// import {
//   MatAutocompleteModule,
//   MatButtonToggle,
//   MatButtonToggleModule,
//   MatTabsModule,
//   MatToolbarModule,
//   MatTooltipModule,
// } from '@angular/material';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCheckboxModule} from '@angular/material/checkbox';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './System-administration/login/login.component';
import { ChangePasswordComponent } from './System-administration/change-password/change-password.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import 'hammerjs';
import { AppConfig } from './app.config';

import * as $ from 'jquery';
import { WelcomeComponent } from './welcome/welcome.component';
import { ClientsComponent } from './clients/clients.component';
import { PartnersComponent } from './partners/partners.component';
import { UsersComponent } from './users/users.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { ClientEditComponent } from './client-edit/client-edit.component';
import { PartnerEditComponent } from './partner-edit/partner-edit.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChangePasswordComponent,
    HeaderComponent,
    FooterComponent,
    WelcomeComponent,
    ClientsComponent,
    PartnersComponent,
    UsersComponent,
    UserEditComponent,
    ClientEditComponent,
    PartnerEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatTableModule,
    MatTableModule,
    MatFormFieldModule,
    MatFormFieldModule,
    MatInputModule,
    MatInputModule,
    MatPaginatorModule,
    MatButtonModule,
    MatDatepickerModule,
    MatSelectModule,
    MatNativeDateModule,
    MatRadioModule,
    MatProgressBarModule,
    MatMenuModule,
    MatExpansionModule,
    MatGridListModule,
    MatCheckboxModule
  ],
  providers: [AppConfig, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
