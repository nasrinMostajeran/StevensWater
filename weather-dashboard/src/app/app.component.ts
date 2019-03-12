import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Constants } from './constants';
import { Chart } from 'chart.js';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

	rainChart : any;
	heatingChart : any;

	data: any;
	currentConditionMap: any;
	dailyMap: any;
	hourlyMap: any;
	states = {
		'LOADING': 0,
		'ERROR': 1,
		'READY': 2,
	}
	currentState: number
	errorMessage: any;

	constructor(private http: HttpClient) {
		this.currentState = this.states.LOADING;
		this.currentConditionMap = {};
		this.dailyMap = {};
	}

	ngOnInit(){
		let sub = this.http.get(`http://api-c.pogoturfpro.com/weather/data/development?name=${Constants.name}&email=${Constants.email}`, {});
		sub.subscribe( (response) => {
			this.data = response;
			this.data.current.map(x => this.currentConditionMap[x.channel_name] = x );
			this.data.daily.map(y => this.dailyMap[y.heating_degree_days] = y );

			// Get Daily data
			let allDatesDaily= response['daily'].map(response => response.timestamp);
			let allRainDaily= response['daily'].map(response => response.rain);
			let allGrowingDaily= response['daily'].map(response => response.growing_degree_days);
			let allHeatingDaily= response['daily'].map(response => response.heating_degree_days);
		
			let weatherDates = [];
			allDatesDaily.forEach((response) => {
				response = response.split(' ');
				weatherDates.push(response[0]);	
			});

			let weatherRain = [];
			allRainDaily.forEach((response) => {
				weatherRain.push(response);	
			});

			let weatherGrowing = [];
			allGrowingDaily.forEach((response) => {
				weatherGrowing.push(response);	
			});

			let weatherHeating = [];
			allHeatingDaily.forEach((response) => {
				weatherHeating.push(response);	
			});
			
			this.currentState = this.states.READY;

			console.log(response);

			// Rain Chart:
			this.rainChart = new Chart('RainChart', {
				type: 'line',
				data: {
					labels: weatherDates,
					datasets: [{
						label: "Rain",
						fill: true,
						backgroundColor: "transparent",
						borderColor: "#47BAC1",
						data: weatherRain
					},{
						label: "Growing Degree",
						fill: true,
						backgroundColor: "transparent",
						borderColor: "#ffc107",
						data: weatherGrowing
					}
				]
				},
				options: {
					title:{
						text:"Rain & Growing degree Chart",
						display:true
					},
					scales: {
						yAxes: [{
							ticks: {
								beginAtZero:true
							}
						}]
					}
				}
			});
			/* end Rain Chart */

			// Growing Chart:
			this.heatingChart = new Chart('HeatingChart', {
				type: 'bar',
				data: {
					labels: weatherDates,
					datasets: [{
						label: "Heating Degree",
						fill: true,
						backgroundColor: [
							'rgba(255, 99, 132, 0.2)',
							'rgba(54, 162, 235, 0.2)',
							'rgba(255, 206, 86, 0.2)',
							'rgba(75, 192, 192, 0.2)',
							'rgba(153, 102, 255, 0.2)',
							'rgba(255, 159, 64, 0.2)'
						],
						borderColor: "#47BAC1",
						data: weatherHeating
					}]
				},
				options: {
					title:{
						text:"Heating Degree Days Chart",
						display:true
					},
					scales: {
						yAxes: [{
							ticks: {
								beginAtZero:true
							}
						}]
					}
				}
			});
			/* end Growing Chart */

			

		

		}, (error) => {
			this.currentState = this.states.ERROR;
			this.errorMessage = error.error.message;
		});


		
		


	}
}
