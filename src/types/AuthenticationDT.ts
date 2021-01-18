/**
 * Copyright(c) 2019 Alejandro Villén
 * MIT Licensed
 */

interface AuthenticationStrategy {
	login(user: string, password: string): Promise<AuthenticationUser>;
	setPassword(user: string, password: string): Promise<ResponseDT>;
	print(): string;
}

interface AuthenticationUser {
	status: boolean;
	email?: string;
	name?: string;
	surname?: string;
	data?: any;
	message?: string;
}

interface AuthenticationLogin {
	status: boolean;
	id?: number;
	email?: string;
}

interface AuthenticationIsRegistered {
	status: boolean;
}

interface AuthenticationCheckRecover {
	status: boolean;
	id?: number;
	token?: string;
}