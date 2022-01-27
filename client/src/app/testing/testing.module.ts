import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Imports all dependencies needed for test execution
@NgModule({
  declarations: [],
  exports: [
    CommonModule,
    RouterTestingModule,
    ApolloTestingModule,
    BrowserAnimationsModule,
  ],
  providers: [HttpClient],
})
export class TestingModule {}
