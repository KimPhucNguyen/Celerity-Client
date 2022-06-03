import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpServerServiceService } from './http-server-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  constructor(private router: Router, private httpServer: HttpServerServiceService) { }

  public login(payload: any): void {
    this.httpServer.login(payload).subscribe(
      response => {
        if (response.token) {
          this.loggedIn.next(true);
          this.router.navigate(['/agreement']);
        }
      }
    );
  }

  public logout(): void {
    this.loggedIn.next(false);
    this.router.navigate(['/']);
  }

  public isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }
}
