/**
 * Copyright(c) 2020 Alejandro Villén
 * MIT Licensed
 */


interface TicmWorkTimeRegisterDT {
	id?: number;
	user: number;
	checkpoint: number;
	type: number;
	latitude?: number;
	longitude?: number;
	platform?: string;
	address?: string;
	created?: number;
	updated?: number;
}

interface TicmWorkTimeHolidayDT {
	id?: number;
	id_user: number;
	type: number;
	day: number;
	hours: number;
	status?: number;
	created?: number;
}