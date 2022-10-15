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

  constructor(private googleSheets: GoogleDriveProvider) { }

  async fetchData(ddrEvent : string) {
    let data : LeaderboardItem[] = []

    this.isLoading = true
    // fetch from data source and set leaderboard to data retrieved
    this.googleSheets.getSheetData(ddrEvent).subscribe(res => {
      console.log(res); 
      this.leaderboard = res.sort((x : LeaderboardItem, y : LeaderboardItem) => y.score - x.score)
      this.buttonPressed = true
      this.isLoading = false
    })

    this.leaderboard = data
  }
}
