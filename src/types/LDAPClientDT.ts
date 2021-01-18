/**
 * LDAPClient DataType
 * Copyright(c) 2019 Alejandro Villén
 * MIT Licensed
 */

interface LDAPClientUser {
	uid: string;
	employeeNumber: string;
	displayName: string;
	cn: string;
	sn: string;
	dn: string;
	mail: string;
	description: string;
	memberOf: Array<string>;
}

