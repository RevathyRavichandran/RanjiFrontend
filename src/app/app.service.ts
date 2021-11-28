import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AppService {
  dburl = "http://localhost:8080/api/";

  public getAllUsers(): Observable<any> {
    return this.http.get<any>(this.dburl + "users");
  }

  public createUser(user): Observable<any> {
    return this.http.post<any>(this.dburl + "user", user);
  }

  public getUserById(id): Observable<any> {
    return this.http.get<any>(this.dburl + "user/" + id);
  }

  public updateUser(user, id): Observable<any> {
    return this.http.put<any>(this.dburl + "user/" + id, user);
  }

  public deleteUserById(id): Observable<any> {
    return this.http.delete<any>(this.dburl + "user/" + id);
  }

  constructor(private http: HttpClient) {}
}
