import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SpacexService } from '../../services/spacex.service';
import { Mission } from '../../models/mission';
import { MissionFilterComponent } from '../mission-filter/mission-filter.component';
import { MissionDetailsComponent } from '../mission-details/mission-details.component';

// Angular Material imports
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-mission-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MissionFilterComponent,
    MissionDetailsComponent,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './mission-list.component.html',
  styleUrls: ['./mission-list.component.scss']
})
export class MissionListComponent implements OnInit {
  missions: Mission[] = [];
  loading = true;
  error = false;
  selectedMission: Mission | null = null;

  constructor(private spacexService: SpacexService) { }

  ngOnInit(): void {
    this.loadMissions();
  }

  loadMissions(): void {
    this.loading = true;
    this.spacexService.getAllMissions().subscribe({
      next: (data) => {
        this.missions = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching missions:', err);
        this.error = true;
        this.loading = false;
      }
    });
  }

  selectMission(mission: Mission): void {
    this.selectedMission = mission;
  }

  filterMissionsByYear(year: string): void {
    this.loading = true;
    if (year === '') {
      this.loadMissions();
      return;
    }
    
    this.spacexService.getMissionsByYear(year).subscribe({
      next: (data) => {
        this.missions = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error filtering missions:', err);
        this.error = true;
        this.loading = false;
      }
    });
  }
}