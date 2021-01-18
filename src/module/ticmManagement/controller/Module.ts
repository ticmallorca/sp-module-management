/**
 * Module
 * Copyright(c) 2019 Alejandro Villén
 * MIT Licensed
 */

import { coreInstance } from "../../../core/Core";


class Module {
	constructor () { }


	/**
	 * getModuleById
	 * @description
	 * @param id
	 * @returns
	 */
	async getModuleById(id: number): Promise<ResponseDT> {
		return await coreInstance.entity.module.getModuleById(id);
	}

	/**
	 * getModuleName
	 * @description
	 * @param name
	 * @returns
	 */
	async getModuleName(name: string): Promise<ResponseDT> {
		return await coreInstance.entity.module.getModuleByName(name);
	}

	/**
	 * getModules
	 * @description
	 * @returns
	 */
	async getModules(): Promise<ResponseDT> {
		return await coreInstance.entity.module.getModules();
	}

	/**
	 * getModuleOfEntity
	 * @description
	 * @param id
	 * @returns
	 */
	async getModuleOfEntity(id: number): Promise<ResponseDT> {
		return await coreInstance.entity.module.getModuleOfEntity(id);
	}


}

export let moduleInstance = new Module();