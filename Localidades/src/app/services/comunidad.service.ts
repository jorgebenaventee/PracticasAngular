import {Injectable} from '@angular/core';
import {Community} from "../index";
import {HttpClient} from "@angular/common/http";
import {map, of, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ComunidadService {

  private communities: Community[] = []

  constructor(private http: HttpClient) {
  }


  getCommunities() {
    if (this.communities.length > 0) {
      return of(this.communities)
    }
    return this.http.get<Community[]>('/assets/provincias.json').pipe(
      tap(communities => this.communities = communities)
    )
  }

  getProvinces(code: string) {
    return this.getCommunities().pipe(
      map(communities => {
        const community = communities.find(community => community.code === code)
        return community ? community.provinces : []
      })
    )
  }

  getTowns(code: string, provinceCode: string) {
    return this.getCommunities().pipe(
      map(communities => {
        const community = communities.find(community => community.code === code)
        if (!community) {
          return []
        }
        const province = community.provinces.find(province => province.code === provinceCode)
        return province ? province.towns : []
      })
    )
  }
}
