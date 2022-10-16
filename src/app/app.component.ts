import { Component } from '@angular/core'
import { LeaderboardItem } from './models/leaderboardItem'
import { GoogleDriveProvider } from './services/GoogleSheetsService'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ddr-leaderboard'
  leaderboard : LeaderboardItem[] = []
  page = 1
  buttonPressed = false
  isLoading = false
  errorFound = false

  constructor(private googleSheets: GoogleDriveProvider) { }

  async fetchData(ddrEvent : string) {
    let data : LeaderboardItem[] = []

    this.errorFound = false
    this.isLoading = true
    // fetch from data source and set leaderboard to data retrieved
    this.googleSheets.getSheetData(ddrEvent).subscribe(res => {
      console.log(res); 
      this.leaderboard = res.sort((x : LeaderboardItem, y : LeaderboardItem) => y.score - x.score)
      this.buttonPressed = true
      this.isLoading = false
    },
    err => {
      if (err.error instanceof Error) {
        //A client-side or network error occurred.
        console.log('An error occurred:', err.error.message);
      } else {
          //Backend returns unsuccessful response codes such as 404, 500 etc.
          console.log('Backend returned status code: ', err.status);
          console.log('Response body:', err.error);
      }

      this.errorFound = true
    })

    this.leaderboard = data
  }
}
