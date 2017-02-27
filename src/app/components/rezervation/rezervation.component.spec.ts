/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RezervationComponent } from './rezervation.component';

describe('RezervationComponent', () => {
  let component: RezervationComponent;
  let fixture: ComponentFixture<RezervationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RezervationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RezervationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
