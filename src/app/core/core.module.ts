import { NgModule, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { MdToolbarModule, MdIconModule, MdButtonModule } from '@angular/material';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MdIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { loadSvgResources } from '../utils/svg.util';
@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    MdToolbarModule,
    MdIconModule,
    MdButtonModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent
  ]
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
