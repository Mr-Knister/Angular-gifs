import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { CardComponent } from './componentes/card/card.component';
import { CardListComponent } from './componentes/card-list/card-list.component';
import { HomePageComponent } from './pages/home/home.component';
import { SearchBoxComponent } from './componentes/search-box/search-box.component';



@NgModule({
  declarations: [
    CardComponent,
    CardListComponent,
    HomePageComponent,
    SearchBoxComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
      HomePageComponent
  ]
})
export class GifsModule { }
