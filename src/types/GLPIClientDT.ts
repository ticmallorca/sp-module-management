/**
 * Copyright(c) 2019 Alejandro Villén
 * MIT Licensed
 */


interface GLPIClientTicket {
	entityId: number;
	entityName: string;
	name: string;
	surname: string;
	email: string;
	category: string;
	description: string;
}


interface GLPIClientGetUser {
	status: boolean;
	id: number;
	email: string;
}

interface GLPIClientGetUserTickets {
	totalcount: number;
	count: number;
	sort: number;
	order: string;
	data: [];
	content_range: string;
}