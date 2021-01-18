/**
 * Entity
 * Copyright(c) 2019 Alejandro Villén
 * MIT Licensed
 */

import { coreInstance } from "../../../core/Core";


class Entity {
	constructor () { }

	/**
	 * getEntity
	 * @description Search entity by id param
	 * @param id
	 * @returns An entity object
	 */
	async getEntity(id: number): Promise<ResponseDT> {
		const entityResponse = await coreInstance.entity.entity.getEntity(id);
		if (entityResponse.status && entityResponse.size === 1) {
			const entityModulesResponse: ResponseDT = await coreInstance.entity.module.getModuleOfEntity(entityResponse.data[0].id);
			const entityModules: any = {};
			if (entityModulesResponse.status && entityModulesResponse.size > 0) {
				for (const element in entityModulesResponse.data) {

					entityModules[entityModulesResponse.data[element].id] = {
						id: entityModulesResponse.data[element].id,
						name: entityModulesResponse.data[element].name
					};

				}
				entityResponse.data[0]["module"] = entityModules;
			}
		} else {
			entityResponse.message += `Controller: Entity: getEntity: Id=${id} not found.`;
		}
		return entityResponse;

	}

	/**
	 * getEntities
	 * @description Get all entities object from dao
	 * @returns An array of entities objects
	 */
	async getEntities(): Promise<ResponseDT> {
		return await coreInstance.entity.entity.getEntities();
	}

	/**
	 * getEntitiesByModuleId
	 * @description
	 * @param idcoreInstance
	 * @returns
	 */
	async getEntitiesByModuleId(id: number): Promise<ResponseDT> {
		return await coreInstance.entity.entity.getEntitiesOfModule(id);
	}

	/**
	 * getEntitiesByUserId
	 * @description
	 * @param id
	 * @returns
	 */
	async getEntitiesByUserId(id: number): Promise<ResponseDT> {
		return await coreInstance.entity.entity.getEntitiesOfUser(id);
	}

	/**
	 * addEntity
	 * @description
	 * @param entity
	 * @returns
	 */
	async addEntity(entity: TicmManagementEntityDT): Promise<ResponseDT> {
		return await coreInstance.entity.entity.addEntity(entity);
	}

	/**
	 * addEntityModule
	 * @description
	 * @param entityId
	 * @param moduleId
	 * @returns
	 */
	async addEntityModule(entityId: number, moduleId: number): Promise<ResponseDT> {
		return await coreInstance.entity.entity.addEntityModule(entityId, moduleId);
	}

	/**
	 * deleteEntity
	 * @description
	 * @param id
	 * @returns
	 */
	async deleteEntity(id: number): Promise<ResponseDT> {
		return await coreInstance.entity.entity.deleteEntity(id);
	}

	/**
	 * deleteEntityModule
	 * @description
	 * @param entityId
	 * @param moduleId
	 * @returns
	 */
	async deleteEntityModule(entityId: number, moduleId: number): Promise<ResponseDT> {
		return await coreInstance.entity.entity.deleteEntityModule(entityId, moduleId);
	}

	/**
	 * modifyModules
	 * @description
	 * @param entityId Entity id
	 * @param moduleList An array of modules id
	 * @returns
	 */
	async modifyModules(entityId: number, moduleList: any): Promise<ResponseDT> {
		const response: ResponseDT = {
			status: true,
			data: [],
			message: "",
			size: 0,
			time: new Date().toLocaleString()
		};

		let entity = await this.getEntity(entityId);
		if (entity.status) {
			// If entity hasn't modules assigned, then create empty attribute
			if (entity.data[0].module === undefined) {
				entity.data[0].module = [];
			}
			const entityModules: any = Object.keys(entity.data[0].module);

			if (entityModules.length >= moduleList.length) {
				// Delete modules
				for (const key in entityModules) {
					if (moduleList.indexOf(parseInt(entityModules[key])) === -1) {
						const unsetModules = await coreInstance.entity.entity.deleteEntityModule(entityId, parseInt(entityModules[key]));
						if (!unsetModules.status) {
							response.status = false;
							response.message = `Error: modifyModules: Not deleted entity-module relation, entity = ${entityId}, module id = ${entityModules[key]} ` + response.message;
						} else {
							response.message = `Info: modifyModules: Deleted entity-module relation, entity = ${entityId}, module id = ${entityModules[key]} ` + response.message;
						}
						response.data = unsetModules.data;
					}
				}
			} else {
				// Add modules
				for (const key in moduleList) {
					const setModules = await coreInstance.entity.entity.addEntityModule(entityId, parseInt(moduleList[key]));
					if (!setModules.status) {
						response.status = false;
						response.message = `Error: modifyModules: Not added entity-module relation, entity = ${entityId}, module id = ${entityModules[key]} ` + response.message;
					} else {
						response.message = `Info: modifyModules: Added entity-module relation, entity = ${entityId}, module id = ${entityModules[key]} ` + response.message;
					}
					response.data = setModules.data;
				}
			}
			entity = await this.getEntity(entityId);
			response.data = entity.data;
		} else {
			response.status = false;
			response.message = `Error: modifyModules: Entity id=${entityId} has problems, probably don't exist the id. ` + entity.message;
		}
		return response;
	}


	/**
	 * getConfig
	 * @description
	 * @param params
	 * @returns
	 */
	async getConfig(params: API_GET_ConfigDT) {
		const response = await coreInstance.entity.entity.getEntityConfiguration(params.token, params.entityId);
		if (response.status && response.data.length > 0) {
			const data: EntityDT = {
				id: -1,
				name: "",
				description: "",
				image: {
					name: "NO IMAGE",
					data: "",
					format: "",
					width: 0,
					height: 0
				},
				news: "",
				phone: -1,
				rss: "",
				category: []
			};

			for (const ele in response.data) {
				const element = response.data[ele];

				data.id = parseInt(element.id);
				data.name = element.name;
				data.description = element.description;
				data.rss = element.rss;
				data.news = element.news;
				data.phone = parseInt(element.phone);

				const cat: CategoryDT = {
					id: element.categoryId,
					title: element.categoryName,
					description: element.categoryDescription,
					image: {
						name: "NO IMAGE",
						data: "",
						format: "",
						width: 0,
						height: 0
					}
				};
				data.category.push(cat);
			}
			response.data = [];
			response.data.push(data);
			response.size = response.data.length;
		}
		return response;
	}
}

export let entityInstance = new Entity();