import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideMenuComponent } from "../../components/side-menu/side-menu.component";

@Component({
  selector: 'app-dashboard-page',
  imports: [RouterOutlet, SideMenuComponent],
  templateUrl: './dashboard-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
// Se usa el default para luego poder usar lazy loading
export default class DashboardPageComponent { }
