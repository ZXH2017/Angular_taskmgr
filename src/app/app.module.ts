import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MdSidenavModule } from '@angular/material';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { LoginModule } from './login/login.module';
import { ProjectModule } from './project/project.module';
import { TaskModule } from './task/task.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MdSidenavModule,
    CoreModule,
    LoginModule,
    ProjectModule,
    TaskModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
