import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { SpacexService } from '../../services/spacex.service';
import { Mission } from '../../models/mission';

// Angular Material imports
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-mission-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './mission-details.component.html',
  styleUrls: ['./mission-details.component.scss']
})
export class MissionDetailsComponent implements OnInit {
  @Input() mission: Mission | null = null;
  loading = false;
  error = false;

  constructor(
    private route: ActivatedRoute,
    private spacexService: SpacexService
  ) { }

  ngOnInit(): void {
    // If we're on the details route, fetch the mission by flight number
    this.route.paramMap.subscribe(params => {
      const flightNumber = params.get('flightNumber');
      if (flightNumber && !this.mission) {
        this.loadMissionDetails(parseInt(flightNumber, 10));
      }
    });
  }

  loadMissionDetails(flightNumber: number): void {
    this.loading = true;
    this.spacexService.getMissionByFlightNumber(flightNumber).subscribe({
      next: (data) => {
        this.mission = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching mission details:', err);
        this.error = true;
        this.loading = false;
      }
    });
  }
}
