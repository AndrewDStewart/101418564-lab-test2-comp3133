import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mission } from '../models/mission';

@Injectable({
  providedIn: 'root'
})
export class SpacexService {
  private apiUrl = 'https://api.spacexdata.com/v3';

  constructor(private http: HttpClient) { }

  // Get all launches
  getAllMissions(): Observable<Mission[]> {
    return this.http.get<Mission[]>(`${this.apiUrl}/launches`);
  }

  // Get mission by flight number
  getMissionByFlightNumber(flightNumber: number): Observable<Mission> {
    return this.http.get<Mission>(`${this.apiUrl}/launches/${flightNumber}`);
  }

  // Filter missions by launch year
  getMissionsByYear(year: string): Observable<Mission[]> {
    return this.http.get<Mission[]>(`${this.apiUrl}/launches?launch_year=${year}`);
  }
}