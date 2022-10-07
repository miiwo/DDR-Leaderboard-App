import { Component } from '@angular/core';
import { ACC_LEADERBOARD } from './models/mockAccRevLeaderboard';
import { EX_LEADERBOARD } from './models/mockEXathonLeaderboard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ddr-leaderboard';
  accLB = ACC_LEADERBOARD.sort((a, b) => b.score - a.score);
  exLB = EX_LEADERBOARD.sort((a, b) => b.score - a.score);
  leaderboard = this.accLB;
  page = 1;
}
