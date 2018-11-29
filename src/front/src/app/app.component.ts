import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'front';
  showLoadingIndicator = true;
  showMenu = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe((routerEvent: Event) => {

      if (routerEvent instanceof NavigationStart) {
        this.showLoadingIndicator = true;
      }

      if (routerEvent instanceof NavigationEnd ||
        routerEvent instanceof NavigationCancel) {
        this.showLoadingIndicator = false;
        // console.log(this.router.url);
        this.showMenu = !(this.router.url.startsWith('/sign/in') || this.router.url.startsWith('/sign/up'));
      }

      if (routerEvent instanceof NavigationError) {
        this.showLoadingIndicator = false;
        console.log('Erro na rota');
        const erro = routerEvent.error;
        if (erro !== null && erro.status === 404) {
          this.router.navigate(['/404']);
        }
        this.showMenu = !(this.router.url.startsWith('/sign/in') || this.router.url.startsWith('/sign/up'));
        // this.showMenu = this.router.url !== '/sign/in';
      }

    });
  }
}
