import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsListComponent } from './tabs-list.component';

describe('TabsListComponent', () => {
  let component: TabsListComponent;
  let fixture: ComponentFixture<TabsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TabsListComponent]
    });
    fixture = TestBed.createComponent(TabsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
