/**
 * DatabaseDT
 * Copyright(c) 2019 Alejandro Villén
 * MIT Licensed
 */

interface DatabaseUserDT {
	name: string;
	surname: string;
	email: string;
	status: boolean;
	created: number;
	updated: number;
}

interface DatabaseModuleDT {
	name: string;
}

interface DatabaseEntityDT {
	name: string;
	image: string;
	description: string;
	rss: string;
	news: string;
	phone: number;
	status: boolean;
}

interface DatabaseRoleDT {
	name: string;
}

interface DatabaseChargeDT {
	name: string;
	description: string;
	created?: number;
	updated?: number;
}

interface DatabaseGroupDT {
	name: string;
	description: string;
	created?: number;
	updated?: number;
}

interface DatabaseGroupDT {
	group: number;
	charge: number;
	level: number;
	description: string;
	created?: number;
}
