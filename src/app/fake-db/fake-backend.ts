import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const users: any[] = JSON.parse(localStorage.getItem('users')) || [];

    return of(null)
      .pipe(
        mergeMap(() => {
          if (
            request.url.endsWith('/authenticate') &&
            request.method === 'POST'
          ) {
            const filteredUsers = users.filter(user => {
              return (
                (user.userName === request.body.userName ||
                  user.email === request.body.userName ||
                  user.mobile === request.body.userName) &&
                user.password === request.body.password
              );
            });

            if (filteredUsers.length) {
              const user = filteredUsers[0];
              const body = {
                id: user.id,
                userName: user.userName,
                name: user.name,
                email: user.email,
                mobile: user.mobile,
                role: user.role,
                address: user.address,
                token: 'fake-jwt-token'
              };

              return of(new HttpResponse({ status: 200, body: body }));
            } else {
              return throwError({
                error: { message: 'Username or password is incorrect' }
              });
            }
          }

          // get users
          if (request.url.endsWith('/users') && request.method === 'GET') {
            if (
              request.headers.get('Authorization') === 'Bearer fake-jwt-token'
            ) {
              return of(new HttpResponse({ status: 200, body: users }));
            } else {
              return throwError({ error: { message: 'Unauthorised' } });
            }
          }

          // get user by id
          if (request.url.match(/\/users\/\d+$/) && request.method === 'GET') {
            if (
              request.headers.get('Authorization') === 'Bearer fake-jwt-token'
            ) {
              const urlParts = request.url.split('/');
              const id = parseInt(urlParts[urlParts.length - 1]);
              const matchedUsers = users.filter(user => {
                return user.id === id;
              });
              const user = matchedUsers.length ? matchedUsers[0] : null;

              return of(new HttpResponse({ status: 200, body: user }));
            } else {
              return throwError({ error: { message: 'Unauthorised' } });
            }
          }

          if (request.url.endsWith('/register') && request.method === 'POST') {
            // get new user object from post body
            const newUser = request.body;

            // validation
            const duplicateUser = users.filter(user => {
              return user.userName === newUser.userName;
            }).length;
            if (duplicateUser) {
              return throwError({
                error: {
                  message:
                    'Username "' + newUser.userName + '" is already taken'
                }
              });
            }
            const duplicateEmail = users.filter(user => {
              return user.email === newUser.email;
            }).length;
            if (duplicateEmail) {
              return throwError({
                error: {
                  message: 'Email "' + newUser.email + '" is already registered'
                }
              });
            }

            const duplicateMobile = users.filter(user => {
              return user.mobile === newUser.mobile;
            }).length;
            if (duplicateMobile) {
              return throwError({
                error: {
                  message:
                    'Mobile "' + newUser.mobile + '" is already registered'
                }
              });
            }

            newUser.id = users.length + 1;
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));

            return of(
              new HttpResponse({
                status: 200,
                body: {
                  message: 'User registered sucessfully'
                }
              })
            );
          }

          return next.handle(request);
        })
      )
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());
  }
}
