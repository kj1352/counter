import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

type ICounter = {
	name: string;
	startDate: string;
	relapseCount: number;
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
		public alertController: AlertController,
		public toastController: ToastController
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
			relapseCount: 0,
			startDate: undefined
		};
	}

	getDays(date: string) {
		return ((new Date().getTime() - new Date(date).getTime()) / (1000 * 3600 * 24)).toFixed();
	}

	addCounter() {
		if (this.newCounter.name && this.newCounter.name.trim() && this.newCounter.startDate) {
			this.allCounters.push(this.newCounter);
			localStorage.setItem('counter', JSON.stringify(this.allCounters));
			this.showAddModal = false;
		} else {
			this.presentToast('Missing input data');
		}
	}

	relapse(index: number) {
		this.allCounters[index].startDate = new Date().toString();
		this.allCounters[index].relapseCount += 1;
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

	async presentAlertToConfirmRelapse(index: number) {
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

	async presentToast(message: string) {
		const toast = await this.toastController.create({
			header: 'Error!',
			icon: 'bug-outline',
			message,
			color: 'danger',
			duration: 3000
		});
		toast.present();
	}
}
