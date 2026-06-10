import { Component, signal, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet, RouterLink, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  private router = inject(Router)

  ngOnInit(): void {
    const last_route = localStorage.getItem(LOCALSTORAGE_LAST_VISIT_ROUTE_KEY)

    if(last_route && last_route !== '/'){
      this.router.navigateByUrl(last_route)
    }

    this.router.events.pipe(
      filter(
        (event): event is NavigationEnd =>  event instanceof NavigationEnd
      )
    )
    .subscribe(
      (event: NavigationEnd) => {
        localStorage.setItem(LOCALSTORAGE_LAST_VISIT_ROUTE_KEY, event.urlAfterRedirects)
      }
    )
  }
}

const LOCALSTORAGE_LAST_VISIT_ROUTE_KEY = 'lastVisitedRoute'
