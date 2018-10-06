import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';



@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'rarau';
    isUpdate: boolean = false;
    constructor(public swUpdate: SwUpdate) {
        this.swUpdate.available.subscribe(event => {
            this.isUpdate = true;
            this.swUpdate.activateUpdate().then(() => document.location.reload());
        });
    }

}
