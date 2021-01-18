/**
 * Entity
 * Copyright(c) 2019 Alejandro Villén
 * MIT Licensed
 */

import { LDAPClientInstance } from "../../../core/service/LDAPClient/LDAPClient";
import { coreInstance } from "../../../core/Core";

class User {

	constructor () { }

	/**
	 * getUser
	 * @description
	 * @param id
	 * @returns
	 */
	async getUser(id: number): Promise<ResponseDT> {

		const userResponse: ResponseDT = await coreInstance.entity.user.getUserById(id);
		if (userResponse.status && userResponse.size === 1) {
			const userModuleEntityResponse: ResponseDT = await coreInstance.entity.user.getUserModuleEntityById(userResponse.data[0].id);
			const userEntities: any = {};
			if (userModuleEntityResponse.status && userModuleEntityResponse.size > 0) {
				for (const element in userModuleEntityResponse.data) {
					if (userEntities[userModuleEntityResponse.data[element].entityId] === undefined) {
						userEntities[userModuleEntityResponse.data[element].entityId] = {
							id: userModuleEntityResponse.data[element].entityId,
							name: userModuleEntityResponse.data[element].entityName,
							image: userModuleEntityResponse.data[element].entityImage,
							module: {},
						};
					}
					userEntities[userModuleEntityResponse.data[element].entityId].module[userModuleEntityResponse.data[element].moduleId] = {
						id: userModuleEntityResponse.data[element].moduleId,
						name: userModuleEntityResponse.data[element].moduleName,
						roleId: userModuleEntityResponse.data[element].roleId,
						roleName: userModuleEntityResponse.data[element].roleName
					};
				}
				userResponse.data[0]["entity"] = userEntities;
			}
		} else {
			userResponse.message += `Controller: User: getUser: Id=${id} not found.`;
		}
		return userResponse;
	}

	/**
	 * getUserByEmail
	 * @param email
	 * @description Search an user with param like email. This return full user data, relations and roles.
	 * @returns
	 */
	async getUserByEmail(email: string): Promise<ResponseDT> {

		let userResponse: ResponseDT = await coreInstance.entity.user.getUserByEmail(email);
		if (userResponse.status && userResponse.size === 1) {
			userResponse = await this.getUser(userResponse.data[0].id);
		} else {
			userResponse.message += `Controller: User: getUserByEmail: Email=${email} not found.`;
		}
		return userResponse;
	}

	/**
	 * getUsers
	 * @description This a list of users and configuration
	 * @returns
	 */
	async getUsers(): Promise<ResponseDT> {
		const userResponse = await coreInstance.entity.user.getUsers();
		const profile = (await coreInstance.entity.user.getUserModuleEntity()).data;

		const users = JSON.parse(JSON.stringify( userResponse.data));
		const dataUser = [];
		for (const i in users) {
			const user = JSON.parse(JSON.stringify( users[i]));
			user.entity = {};

			for (const j in profile) {
				if (user.id === profile[j].userId) {
					if (user.entity[profile[j].entityId] === undefined) {
						user.entity[profile[j].entityId] = {
							id: profile[j].entityId,
							name: profile[j].entityName,
							module: {}
						};
					}
					user.entity[profile[j].entityId].module[profile[j].moduleId] = {
						id: profile[j].moduleId,
						name: profile[j].moduleName,
						role: {
							id: profile[j].roleName,
							name: profile[j].roleName
						}

					};
				}
			}
			dataUser.push(user);
		}
		userResponse.data = dataUser;
		return userResponse;
	}


	/**
	 * addUser
	 * @description Add an user.
	 * @param user
	 * @returns
	 */
	async addUser(user: TicmManagementUserDT): Promise<ResponseDT> {
		const userDatabaseType: DatabaseUserDT = {
			name: user.name,
			surname: user.surname,
			email: user.email,
			status: user.status,
			created: user.created,
			updated: parseInt((new Date().getTime() / 1000).toString())
		};
		const userResponse: ResponseDT = await coreInstance.entity.user.addUser(userDatabaseType);
		return userResponse;
	}

	/**
	 * updateUser
	 * @description Change status of an user.
	 * @param user
	 * @param status
	 * @returns
	 */
	async updateUser(user: TicmManagementUserDT): Promise<ResponseDT> {
		const userDatabase: DatabaseUserDT = {
			name: user.name,
			surname: user.surname,
			email: user.email,
			status: user.status,
			created: user.created,
			updated: parseInt((new Date().getTime() / 1000).toString())
		};
		const userResponse: ResponseDT = await coreInstance.entity.user.addUser(userDatabase);
		return userResponse;
	}


	async syncUsersFromLDAP(): Promise<ResponseDT> {

		// Update or create all users from LDAP to local database
		const updatedUsers: ResponseDT = await this.updateUsersFromLDAP();

		// From LDAP user's list match to local database user's list. If local user doesn't exist in LDAP list, then disable this.
		const ldapUsers: ResponseDT = await LDAPClientInstance.getUsers();
		const localUsers: ResponseDT = await userInstance.getUsers();
		if (localUsers.status && ldapUsers.status) {
			for (const local in localUsers.data) {
				let userExistInLdap = false;
				for (const ldap in ldapUsers.data) {
					if (ldapUsers.data[ldap].mail === localUsers.data[local].email) {
						userExistInLdap = true;
						break;
					}
				}
				if (!userExistInLdap) {
					const userToModify: TicmManagementUserDT = localUsers.data[local];
					if (userToModify.status) {
						userToModify.status = false;
						await this.updateUser(userToModify);
					}
				}
			}
		}

		return updatedUsers;

	}




	/**
	 * updateUsersFromLDAP
	 * @description Get LDAP users list and update or create local users list
	 * @returns
	 */
	private async updateUsersFromLDAP(): Promise<ResponseDT> {
		const response: ResponseDT = {
			status: false,
			data: [],
			message: "",
			size: 0,
			time: new Date().toLocaleString()
		};

		const ldapUsers: ResponseDT = await LDAPClientInstance.getUsers();

		if (ldapUsers.status && ldapUsers.size > 0) {
			// Add or update users
			let element: LDAPClientUser;

			// Search user by email, if not exist then will be create.
			for (const key in ldapUsers.data) {

				element = ldapUsers.data[key];
				const localUser: ResponseDT = await userInstance.getUserByEmail(element.mail);
				let userMostBeModified = false;
				const user: TicmManagementUserDT = {
					name: element.cn,
					surname: element.sn,
					email: element.mail,
					created: parseInt((new Date().getTime() / 1000).toString()),
					status: false
				};

				if (!localUser.status) {
					// User not found then will be created
					userMostBeModified = true;
					user.status = true;
				} else {
					// User found
					if (localUser.data[0].name !== element.cn || localUser.data[0].surname !== element.sn || localUser.data[0].email !== element.mail) {
						userMostBeModified = true;
					}
					user.created = localUser.data[0].created;
					user.status = localUser.data[0].status;
				}

				if (userMostBeModified) {
					const addUserResponse: ResponseDT = await userInstance.addUser(user);
					if (addUserResponse.status) {
						response.data.push(user);
					}
				}

			}
			if (response.data.length > 0) {
				response.status = true;
				response.message = "ticManagement: Controller: updateUsersFromLDAP: Updated users.";
			} else {
				response.status = false;
				response.message = "ticManagement: Controller: updateUsersFromLDAP: No users to import.";
			}
			response.size = response.data.length;
			response.time = new Date().toLocaleString();
		}

		return response;
	}


	/**
	 * modifyEntities
	 * @description
	 * @param id User id
	 * @param entityList An array of entities id
	 * @returns
	 */
	async modifyEntities(id: number, entityList: any): Promise<ResponseDT> {
		const response: ResponseDT = {
			status: true,
			data: [],
			message: "",
			size: 0,
			time: new Date().toLocaleString()
		};

		let user = await this.getUser(id);
		if (user.status) {
			// If user hasn't entities assigned, then create empty attribute
			if (user.data[0].entity === undefined) {
				user.data[0].entity = [];
			}
			const userEntities: any = Object.keys(user.data[0].entity);

			if (userEntities.length >= entityList.length) {
				// Delete entities
				for (const key in userEntities) {
					if (entityList.indexOf(parseInt(userEntities[key])) === -1) {
						const unsetEntities = await coreInstance.entity.user.unsetUserEntity(id, parseInt(userEntities[key]));
						if (!unsetEntities.status) {
							response.status = false;
							response.message = `Error: modifyEntities: Not deleted user-entity relation, user id = ${id}, entity id = ${userEntities[key]} ` + response.message;
						} else {
							response.message = `Info: modifyEntities: Deleted user-entity relation, user id = ${id}, entity id = ${userEntities[key]} ` + response.message;
						}
						response.data = unsetEntities.data;
					}
				}
			} else {
				// Add entities
				for (const key in entityList) {
					const setEntities = await coreInstance.entity.user.setUserEntity(id, parseInt(entityList[key]));
					if (!setEntities.status) {
						response.status = false;
						response.message = `Error: modifyEntities: Not added user-entity relation, user id = ${id}, entity id = ${userEntities[key]} ` + response.message;
					} else {
						response.message = `Info: modifyEntities: Added user-entity relation, user id = ${id}, entity id = ${userEntities[key]} ` + response.message;
					}
					response.data = setEntities.data;
				}
			}
			user = await this.getUser(id);
			response.data = user.data;
		} else {
			response.status = false;
			response.message = `Error: modifyEntities: User id=${id} has problems, probably don't exist the id. ` + user.message;
		}
		return response;
	}

	/**
	 * modifyModules
	 * @description
	 * @param userId User id
	 * @param entityId Entity id
	 * @param moduleList An array of modules id
	 * @returns
	 */
	async modifyModules(userId: number, entityId: number, moduleList: any): Promise<ResponseDT> {
		const response: ResponseDT = {
			status: true,
			data: [],
			message: "",
			size: 0,
			time: new Date().toLocaleString()
		};

		let user = await this.getUser(userId);
		if (user.status) {
			// If user hasn't modules assigned, then create empty attribute
			if (user.data[0].entity[entityId] === undefined) {
				user.data[0].entity[entityId] = [];
			}
			if (user.data[0].entity[entityId].module === undefined) {
				user.data[0].entity[entityId].module = [];
			}
			const userModules: any = Object.keys(user.data[0].entity[entityId].module);

			if (userModules.length >= moduleList.length) {
				// Delete modules
				for (const key in userModules) {
					if (moduleList.indexOf(parseInt(userModules[key])) === -1) {
						const unsetModules = await coreInstance.entity.user.unsetUserEntityModule(userId, entityId, parseInt(userModules[key]));
						if (!unsetModules.status) {
							response.status = false;
							response.message = `Error: modifyModules: Not deleted user-entity-module relation, user id = ${userId}, entity = ${entityId}, module id = ${userModules[key]} ` + response.message;
						} else {
							response.message = `Info: modifyModules: Deleted user-entity-module relation, user id = ${userId}, entity = ${entityId}, module id = ${userModules[key]} ` + response.message;
						}
						response.data = unsetModules.data;
					}
				}
			} else {
				// Add modules
				for (const key in moduleList) {
					const setModules = await coreInstance.entity.user.setUserEntityModule(userId, entityId, parseInt(moduleList[key]));
					if (!setModules.status) {
						response.status = false;
						response.message = `Error: modifyModules: Not added user-entity-module relation, user id = ${userId}, entity = ${entityId}, module id = ${userModules[key]} ` + response.message;
					} else {
						response.message = `Info: modifyModules: Added user-entity-module relation, user id = ${userId}, entity = ${entityId}, module id = ${userModules[key]} ` + response.message;
					}
					response.data = setModules.data;
				}
			}
			user = await this.getUser(userId);
			response.data = user.data;
		} else {
			response.status = false;
			response.message = `Error: modifyModules: User id=${userId} has problems, probably don't exist the id. ` + user.message;
		}
		return response;
	}
}

export let userInstance = new User();