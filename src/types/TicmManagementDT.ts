/**
 * ticmManagement DataType
 * Copyright(c) 2019 Alejandro Villén
 * MIT Licensed
 */

interface TicmManagementEntityDT {
	id: number;
	name: string;
	image: string;
	description: string;
	rss: string;
	news: string;
	phone: number;
	status: boolean;
}

interface TicmManagementUserDT {
	name: string;
	surname: string;
	email: string;
	created: number;
	updated?: number;
	status: boolean;
}

interface TicmManagementModuleDT {
	name: string;
	type: number;
}


interface TicmManagementRoleDT {
	name: string;
}
