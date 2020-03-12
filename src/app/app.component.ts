import { Component } from '@angular/core';
import { Message } from './message.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private http: HttpClient) { }

  title = 'dialogflow-ui';
  textMessage = "";
  messages = [];
  isGettingResponse = false;
  //TODO: change the URL if required, move to environment file.
  API_URL = 'http://localhost:3000';

  sendMessage(event) {
    this.isGettingResponse = true;
    this.messages.push(new Message(this.textMessage, "User"));
    this.getBotResponse(this.textMessage)
      .subscribe((data: any) => {
        console.log(data);
        this.isGettingResponse = false;
        let text_response = decodeURIComponent(JSON.parse(data).bot_response);
        this.messages.push(new Message(text_response, "Bot"));
      }, error => {
        console.log(error);
      });
    this.textMessage = "";
  }

  getBotResponse(message) {
    let url = this.API_URL + "/manage_bot/query?text=" + message;
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8').set('session-id', '1bed4c94-6dc8-4427-8a43-8ba91d6d9f4e').set('Access-Control-Allow-Origin', '*');
    return this.http.get(url, { headers, responseType: 'text' });
  }
}
