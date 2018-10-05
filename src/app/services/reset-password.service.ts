import { Injectable } from '@angular/core';
import { ConfigService } from "./config.service";
import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
  public headers = new HttpHeaders();
  public formData: FormData = new FormData();
  public responseData: any;
  private URL;
  constructor(public http: HttpClient, private configService: ConfigService) {
    this.headers.set('Access-Control-Allow-Origin ', '*');
    this.headers.set('Content-Type', 'application/json; charset=utf-8');
  }

  public updatePassword(data: any) {
    this.formData = new FormData();
    this.URL = this.configService.url + 'user_module/api/users_api/updatepassword';

    this.formData.append('id', data.user_id);
    this.formData.append('password', data.password);
    this.formData.append('passconf', data.passconf);

    return this.http.post(this.URL,
      this.formData,
      {
        headers: this.headers,
      }
    );
  }
  
}
