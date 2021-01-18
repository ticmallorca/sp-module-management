/**
 * SettingsDT
 * Copyright(c) 2019 Alejandro Villén
 * MIT Licensed
 */


// Settings
interface SettingsDT {
	page: SettingsPageDT;
	user: SettingsUserDT;
	module: any;
	currentPanel: SettingsCurrentPanelDT;
}

interface SettingsPageDT {
	lang: string;
	language: any;
	title: string;
	logo: string;
	version: string;
	footer: SettingsFooterDT;
}

interface SettingsFooterDT {
	team: any;
	license: string;
	copy: number;
	company: any;
}
interface SettingsUserDT {
	entity: SettingsUserEntityArrayDT;
	entityActivated: number;
	profile: SettingsUserProfileDT;
}

interface SettingsUserProfileDT {
	id: number;
	name: string;
	surname: string;
	token: string;
	email: string;
	session: string;
	status: number;
	updated: number;
}



// User Entity DT
interface SettingsUserEntityArrayDT {
	[entity: number]: SettingsUserEntityDT;
}
interface SettingsUserEntityDT {
	id: number;
	name: string;
	image: string;
	module: SettingsUserModuleArrayDT;
}

// User Module DT
interface SettingsUserModuleArrayDT {
	[module: number]: SettingsUserModuleDT;
}
interface SettingsUserModuleDT {
	id: number;
	name: string;
	role: SettingsUserRoleArrayDT;
}

// User Role DT
interface SettingsUserRoleArrayDT {
	[role: number]: SettingsUserRoleDT;
}
interface SettingsUserRoleDT {
	id: number;
	name: string;
}

interface SettingsCurrentPanelDT {
	module: string;
	component: string;
}

interface SettingsModuleDT {
	name: string;
	version: string;
	link: string;
	settings: any;
	assets: any;
	language: any;
	component: any;
	dependencies: any;
}
