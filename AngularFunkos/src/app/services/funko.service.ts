import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root',
})
export class FunkoService {
  constructor(private http: HttpClient) {}

  getFunkos() {
    return this.http.get<Funko[]>('http://localhost:3000/api/funko')
  }
}
