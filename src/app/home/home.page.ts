import { Component } from '@angular/core';

type ICounter = {
	name: string;
	startDate: Date;
};

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage {
	showAddModal = false;
	newCounter: ICounter;

	allCounters: Array<ICounter> = [];

	constructor() { }

	openModal() {
		this.showAddModal = true;

		this.newCounter = {
			name: undefined,
			startDate: new Date()
		};
	}

	getDays(date: Date) {
		return (new Date().getTime() - new Date(date).getTime()) / (1000 * 3600 * 24);
	}

	addCounter() {
		this.allCounters.push(this.newCounter);
		this.showAddModal = false;
	}

	relapse(index: number) {
		this.allCounters[index].startDate = new Date();
	}
}
