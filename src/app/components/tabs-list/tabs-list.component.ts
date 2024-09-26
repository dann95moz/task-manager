import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
@Component({
  selector: 'app-tabs-list',
  standalone: true,
  imports: [CommonModule,
    MatTabsModule],
  templateUrl: './tabs-list.component.html',
  styleUrls: ['./tabs-list.component.scss']
})
export class TabsListComponent {

}
