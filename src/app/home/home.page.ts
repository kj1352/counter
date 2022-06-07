import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

type ICounter = {
	name: string;
	startDate: Date;
	isArchived?: boolean;
};

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage {
	showAddModal = false;
	newCounter: ICounter;
	showArchived = false;

	allCounters: Array<ICounter> = [];

	constructor(
		public alertController: AlertController
	) {
		this.allCounters = JSON.parse(localStorage.getItem('counter'));

		if (!this.allCounters) {
			this.allCounters = [];
		}
	}

	getArchivedCount() {
		return this.allCounters.filter(counter => counter.isArchived).length;
	}

	openModal() {
		this.showAddModal = true;

		this.newCounter = {
			name: undefined,
			startDate: new Date()
		};
	}

	getDays(date: Date) {
		return ((new Date().getTime() - new Date(date).getTime()) / (1000 * 3600 * 24)).toFixed();
	}

	addCounter() {
		this.allCounters.push(this.newCounter);
		localStorage.setItem('counter', JSON.stringify(this.allCounters));
		this.showAddModal = false;
	}

	relapse(index: number) {
		this.allCounters[index].startDate = new Date();
		localStorage.setItem('counter', JSON.stringify(this.allCounters));
	}

	deleteCounter(index: number) {
		this.allCounters[index].isArchived = true;
		localStorage.setItem('counter', JSON.stringify(this.allCounters));
	}

	retrieveCounter(index: number) {
		this.allCounters[index].isArchived = false;
		localStorage.setItem('counter', JSON.stringify(this.allCounters));
	}

	async presentAlertConfirm(index: number) {
		const alert = await this.alertController.create({
			message: 'Would you like to Relapse or Delete?',
			buttons: [
				{
					text: 'Relapse',
					handler: () => {
						console.log('Relapse clicked');
						this.relapse(index);
					}
				}, {
					text: 'Delete',
					handler: () => {
						console.log('Delete clicked');
						this.deleteCounter(index);
					}
				}
			]
		});

		await alert.present();
	}
}
