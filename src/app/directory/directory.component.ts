import {
    Component,
    OnInit
} from '@angular/core';
import {
    Router
} from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {
    AuthService
} from '../auth.service';
@Component({
    selector: 'app-directory',
    templateUrl: './directory.component.html',
    styleUrls: ['./directory.component.css']
})
export class DirectoryComponent implements OnInit {

    constructor(private router: Router,
        private auth: AuthService) {}

    goToPage(pageName: string) {
        this.router.navigate([`${pageName}`]);
    }
    showInstructions() {

        Swal.fire({
                title: "How To!",
                html: "<img src ='/assets/logohor.png'> <br> Choose what your friends are doing!",
                showCancelButton: true,
                footer: '<a href = "https://noyoupick.io/privacy">Privacy Policy</a>',
                cancelButtonText: "Show more instructions",

            })
            .then((result) => {

                if (result.isDismissed) {
                    this.router.navigate([`about`]);
                }
            });
    }

    createRoomAlert() {

        var url = this.router.url;
        Swal.fire({
            title: "Name",
            text: "What would you like your name to be? Ignore for a random name.",
            input: 'text',
            inputLabel: 'Name',

            showCancelButton: true,
            inputValidator: (value) => {

                this.auth.anonymousLogin(0, 0, value, url)
            }
        });

    }

    ngOnInit(): void {}

}