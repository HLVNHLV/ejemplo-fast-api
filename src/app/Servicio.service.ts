import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { servicio } from './Servicio';
import { lastValueFrom } from 'rxjs';

const API_URL = 'http://0.0.0.0:8000/servicio';

@Injectable({
  providedIn: 'root'
})
export class servicioService {

  constructor(private http: HttpClient) { }

  getServicios(): Promise<servicio[]> {
    return lastValueFrom(this.http.get<servicio[]>(API_URL));
  }

  getServicioById(id: string): Promise<servicio> {
    return lastValueFrom(this.http.get<servicio>(`${API_URL}/${id}`));
  }

  addServicio(servicio: servicio): Promise<string> {
    return lastValueFrom(this.http.post<string>(API_URL, servicio));
  }

  updateServicio(id: string, servicio: servicio): Promise<void> {
    return lastValueFrom(this.http.put<void>(`${API_URL}/${id}`, servicio))
  }

  deleteServicio(id: string): Promise<void> {
    return lastValueFrom(this.http.delete<void>(`${API_URL}/${id}`));
  }
}
