import { NgModule, SkipSelf, Optional } from '@angular/core';
import { HttpModule } from '@angular/http';
import { MdIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '../app-routing.module';
import { ServicesModule } from '../services/services.module';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { loadSvgResources } from '../utils/svg.util';

import 'hammerjs';
import 'rxjs/add/operator/take';
import '../utils/debug.util';

@NgModule({
  imports: [
    HttpModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule,
    ServicesModule.forRoot()
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    AppRoutingModule
  ],
  providers: [
    {
      provide: 'BASE_CONFIG',
      useValue: {
        uri: 'http://localhost:3000'
      }
    }
  ],
})
export class CoreModule {
  //@SkipSelf() 去系统找依赖，避免无限循环
  //@Optional() 依赖可选
  constructor(
    @Optional() @SkipSelf() parent: CoreModule,
    ir: MdIconRegistry,
    ds: DomSanitizer
  ) {
    if (parent) {
      throw new Error("模块已经存在，不能再次加载！");
    }
    loadSvgResources(ir, ds);
  }
}
