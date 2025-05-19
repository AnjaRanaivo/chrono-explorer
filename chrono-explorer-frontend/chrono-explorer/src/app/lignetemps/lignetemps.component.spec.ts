import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LignetempsComponent } from './lignetemps.component';

describe('LignetempsComponent', () => {
  let component: LignetempsComponent;
  let fixture: ComponentFixture<LignetempsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LignetempsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LignetempsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
