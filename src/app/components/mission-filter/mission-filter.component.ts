import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-mission-filter',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './mission-filter.component.html',
  styleUrls: ['./mission-filter.component.scss']
})
export class MissionFilterComponent implements OnInit {
  @Output() yearSelected = new EventEmitter<string>();
  
  years: string[] = [];
  selectedYear: string = '';

  constructor() { }

  ngOnInit(): void {
    // Generate years from 2006 (first SpaceX launch) to current year
    const currentYear = new Date().getFullYear();
    for (let year = 2006; year <= currentYear; year++) {
      this.years.push(year.toString());
    }
    // Sort in descending order (newest first)
    this.years.sort((a, b) => parseInt(b) - parseInt(a));
  }

  onYearChange(): void {
    this.yearSelected.emit(this.selectedYear);
  }

  clearFilter(): void {
    this.selectedYear = '';
    this.yearSelected.emit('');
  }
}
