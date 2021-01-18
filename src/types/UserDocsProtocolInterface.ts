/**
 * UserDocsProtocolInterface
 * Copyright(c) 2020 Alejandro Villén
 * MIT Licensed
 */


interface UserDocsProtocolInterfaceDT {
	list(settings: UserDocsSettingsDT, user: UserDocsProfileDT): Promise<ResponseDT>;
	content(settings: UserDocsSettingsDT, path: string): Promise<ResponseDT>;
	get(settings: UserDocsSettingsDT, user: UserDocsProfileDT, path: string, file: string): Promise<ResponseDT>;
}