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
    const apiKey = '<INSERT API KEY HERE>'

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/'${sheetName}'!A2:D?key=${apiKey}`
    return this.http.get(url).pipe(
        map((res: any) => {
          const data = res.values
          const returnArray: Array<LeaderboardItem> = [];

          if (data && data.length > 0) {
            data.forEach( (entry:any, i:number) => {
              if (entry[0] && entry[1]) {
                const obj : any = {
                  id: i,
                  name: entry[0],
                  score: entry[1]
                };
  
                returnArray.push(obj);
              }
            });
          }

          return returnArray;
        })
      );
  }
}