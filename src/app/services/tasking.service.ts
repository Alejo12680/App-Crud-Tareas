import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskingService {

  // Variable donde esta la ruta del backend
  URL = environment.urlApi

  constructor(private http: HttpClient) { }

  crearUsuario(body: any) {
    let query = `${this.URL}/register`
    return this.http.post(query, body)
  }

  login(body: any) {
    let query = `${this.URL}/login`
    return this.http.post(query, body)
  }

  autenticacion(token: string) {
    let query = `${this.URL}/verificarToken`
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.get(query, { headers })
  }
}
