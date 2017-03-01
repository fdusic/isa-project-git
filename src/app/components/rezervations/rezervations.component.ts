import { Component, OnInit } from '@angular/core';
import {RezervationService} from "../../services/rezervation.service";
import {Rezervation} from "../../beans/rezervation";
declare let swal : any;

@Component({
  selector: 'app-rezervations',
  templateUrl: './rezervations.component.html',
  styleUrls: ['./rezervations.component.css']
})
export class RezervationsComponent implements OnInit {

  private rezervations : Rezervation[] = [];
  private showDialog = false;
  private selectedRezervation = new Rezervation();
  private showDialogMore = false;
  private rateService = 0;
  private rateOrder = 0;

  constructor(private httpService : RezervationService) { }

  ngOnInit() {
    this.httpService.getRezervations().subscribe(
      data => {
        this.rezervations = JSON.parse(data['_body']);
        console.log(data['_body'] + 'aaaa');
      }
    );
  }

  friends(r){
    this.showDialog = true;
    this.selectedRezervation = r;
  }

  onCloseModalFriends(){
    this.showDialog = false;
  }

  more(r){
    this.showDialogMore = true;
    this.selectedRezervation = r;
  }

  onCloseModalMore(){
    this.showDialogMore = false;
  }

  onStarRate(rating: number) {
    this.rateOrder = rating;
    if(rating == 1) this.onStarOneOver();
    else if(rating == 2) this.onStarTwoOver();
    else if(rating == 3) this.onStarThreeOver();
    else if(rating == 4) this.onStarFourOver();
    else this.onStarFiveOver();
  }

  onStarOneOver() {
    document.getElementById("starOne").style.color = "#cc1b1f";
    document.getElementById("starTwo").style.removeProperty('color');
    document.getElementById("starThree").style.removeProperty('color');
    document.getElementById("starFour").style.removeProperty('color');
    document.getElementById("starFive").style.removeProperty('color');
  }

  onStarTwoOver() {
    document.getElementById("starOne").style.color = "#cc1b1f";
    document.getElementById("starTwo").style.color = "#f8c21e";
    document.getElementById("starThree").style.removeProperty('color');
    document.getElementById("starFour").style.removeProperty('color');
    document.getElementById("starFive").style.removeProperty('color');
  }

  onStarThreeOver() {
    document.getElementById("starOne").style.color = "#cc1b1f";
    document.getElementById("starTwo").style.color = "#f8c21e";
    document.getElementById("starThree").style.color = "#4ae3f8";
    document.getElementById("starFour").style.removeProperty('color');
    document.getElementById("starFive").style.removeProperty('color');
  }

  onStarFourOver() {
    document.getElementById("starOne").style.color = "#cc1b1f";
    document.getElementById("starTwo").style.color = "#f8c21e";
    document.getElementById("starThree").style.color = "#4ae3f8";
    document.getElementById("starFour").style.color = "#465ef8";
    document.getElementById("starFive").style.removeProperty('color');
  }

  onStarFiveOver() {
    document.getElementById("starOne").style.color = "#cc1b1f";
    document.getElementById("starTwo").style.color = "#f8c21e";
    document.getElementById("starThree").style.color = "#4ae3f8";
    document.getElementById("starFour").style.color = "#465ef8";
    document.getElementById("starFive").style.color = "#3da71a";
  }

  onStarRate2(rating: number) {
    this.rateService = rating;
    if(rating == 1) this.onStarOneOver2();
    else if(rating == 2) this.onStarTwoOver2();
    else if(rating == 3) this.onStarThreeOver2();
    else if(rating == 4) this.onStarFourOver2();
    else this.onStarFiveOver2();
  }

  onStarOneOver2() {
    document.getElementById("starOne2").style.color = "#cc1b1f";
    document.getElementById("starTwo2").style.removeProperty('color');
    document.getElementById("starThree2").style.removeProperty('color');
    document.getElementById("starFour2").style.removeProperty('color');
    document.getElementById("starFive2").style.removeProperty('color');
  }

  onStarTwoOver2() {
    document.getElementById("starOne2").style.color = "#cc1b1f";
    document.getElementById("starTwo2").style.color = "#f8c21e";
    document.getElementById("starThree2").style.removeProperty('color');
    document.getElementById("starFour2").style.removeProperty('color');
    document.getElementById("starFive2").style.removeProperty('color');
  }

  onStarThreeOver2() {
    document.getElementById("starOne2").style.color = "#cc1b1f";
    document.getElementById("starTwo2").style.color = "#f8c21e";
    document.getElementById("starThree2").style.color = "#4ae3f8";
    document.getElementById("starFour2").style.removeProperty('color');
    document.getElementById("starFive2").style.removeProperty('color');
  }

  onStarFourOver2() {
    document.getElementById("starOne2").style.color = "#cc1b1f";
    document.getElementById("starTwo2").style.color = "#f8c21e";
    document.getElementById("starThree2").style.color = "#4ae3f8";
    document.getElementById("starFour2").style.color = "#465ef8";
    document.getElementById("starFive2").style.removeProperty('color');
  }

  onStarFiveOver2() {
    document.getElementById("starOne2").style.color = "#cc1b1f";
    document.getElementById("starTwo2").style.color = "#f8c21e";
    document.getElementById("starThree2").style.color = "#4ae3f8";
    document.getElementById("starFour2").style.color = "#465ef8";
    document.getElementById("starFive2").style.color = "#3da71a";
  }

  rate(){
    this.onCloseModalMore();

    console.log(this.rateOrder + ' ' + this.rateService);
    if(this.rateService != 0 || this.rateOrder != 0){
      swal("Success!", "Thanks for rating", "success");
      if(this.rateService != 0) {
        this.selectedRezervation.serviceRate = this.rateService;
        this.rateService = 0;
      }
      if(this.rateOrder != 0){
        this.selectedRezervation.orderRate = this.rateOrder;
        this.rateOrder = 0;
      }
      console.log(this.selectedRezervation.serviceRate + ' ' + this.selectedRezervation.orderRate);
      this.httpService.rateRezervation(this.selectedRezervation).subscribe(
        () => {
          alert('asdas');
        }
      );
    }

  }

}
