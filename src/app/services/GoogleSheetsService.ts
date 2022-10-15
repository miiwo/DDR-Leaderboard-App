import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LeaderboardItem } from '../models/leaderboardItem';


@Injectable({providedIn: 'root'})
export class GoogleDriveProvider {
  constructor(public http: HttpClient) { }

  public getSheetData(sheetName : string): Observable<any> {
    const sheetId = '1V3ml0teqoIkuJ4RnQv6mhPGb8yL2QgM2YD5wsGXtL_k'
    const apiKey = 'AIzaSyBLP1G1B5Z-Vl-d_Qoy91tyK7lMeWc9Nhg'

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/'${sheetName}'!A2:D?key=${apiKey}`
    return this.http.get(url).pipe(
        map((res: any) => {
          const data = res.values
          const returnArray: Array<LeaderboardItem> = [];

          if (data && data.length > 0) {
            data.forEach( (entry:any, i:number) => {
              const obj : any = {
                id: i,
                name: entry[0],
                score: entry[1]
              };

              returnArray.push(obj);
            });
          }

          return returnArray;
        })
      );
  }
}