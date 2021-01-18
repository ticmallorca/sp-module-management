/**
 * UserDocs
 * Copyright(c) 2020 Alejandro Villén
 * MIT Licensed
 */


interface UserDocsSettingsDT {
	entity: number;
	name: string;
	host: string;
	port?: number;
	resource: string;
	protocol: string;
	domain: string;
	user: string;
	password: string;
	created: number;
	folder: any;
}

interface UserDocsProfileDT {
	id: number;
	name: string;
	email: string;
	dni: string;
}

interface UserDocsFileDT {
	file: string;
	path: string;
	fullPath: string;
	created: number;
}

interface UserDocsFolderDT {
	type: string;
	content: string;
	filter: string;
}