import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatGridListModule,
  MatCardModule,
  MatMenuModule,
  MatInputModule,
  MatSelectModule,
  MatRadioModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatIconRegistry
} from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  declarations: [],
  exports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule]
})
export class SharedModule {
  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
    matIconRegistry.addSvgIcon('plus', domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/plus.svg'));
  }
}
