/**
 * Copyright(c) 2019 Alejandro Villén
 * MIT Licensed
 */

interface AuthenticationStrategyLDAP {
	filter: string;
	scope: string;
	sizeLimit: number;
}
