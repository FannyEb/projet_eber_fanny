import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Client } from 'src/app/model/client';
import { ClientService } from 'src/app/service/client/client.service';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent implements OnInit {

  client!: Client;
  constructor(private clientService: ClientService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.clientService.get(this.route.snapshot.params.id).subscribe(
      (response) => {
        this.client = response;
        console.log(this.client);
      }
    );
  }

}
