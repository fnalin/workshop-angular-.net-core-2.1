import { Component, Input } from '@angular/core';

@Component({
    templateUrl: 'loading.component.html',
    styleUrls: ['loading.component.css'],
    selector: 'app-loading'
})
export class LoadingComponent {

    @Input() showLoadingIndicator: boolean;
    @Input() texto: string;

}
