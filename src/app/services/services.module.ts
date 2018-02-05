import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuoteService } from './quote.service';
import { ProjectService } from './project.service';

@NgModule()
export class ServicesModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ServicesModule,
      providers: [
        QuoteService,
        ProjectService
      ]
    }
  }
}
