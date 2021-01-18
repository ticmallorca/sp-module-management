/**
 * AssetDT
 * Copyright(c) 2020 Alejandro Villén
 * MIT Licensed
 */

interface AssetDT {
	// UNIQUE
	module: number;
	entity: number;
	title: string;
	file: string;
	description: string;
	path: string;
	origin: number;
	category: string;
	shared: number;
	createdBy: number;
	modifiedBy: number;
	createdAt: number;
	modifiedAt: number;
	deletedAt: number;
	status: number;
}

