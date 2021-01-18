/**
 * api
 * Copyright(c) 2019 Alejandro Villén
 * MIT Licensed
 */
import { Request, Response, Router } from "express";
const api: Router = Router();
import { controllerInstance } from "../controller/Controller";
import { parse } from "dotenv";

/**
 * **********************************
 * ENTITIES
 * **********************************
 */

/**
 * GET
 * @description Return a list of entities
 */
api.get("/entity/list/", async (req: Request, res: Response) => {
	const entities: ResponseDT = await controllerInstance.entity.getEntities();
	return res.json(entities);
});

/**
 * GET
 * @description Return full data of an entity
 * @returns ResponseDT
 */
api.get("/entity/id/:id", async (req: Request, res: Response) => {

	if (req.params.id !== undefined) {
		const id: number = parseInt(req.params.id);
		const entity: ResponseDT = await controllerInstance.entity.getEntity(id);
		return res.json(entity);
	}
	const responseError: ResponseDT = {
		status: false,
		data: [],
		message: "Entity id isn't exist.",
		size: 0,
		time: new Date().toLocaleString()
	};
	return res.json(responseError);
});

/**
 * PUT
 * @description Update entity data
 * @returns ResponseDT Return entity Object
 */
api.put("/entity/id/:id", async (req: Request, res: Response) => {

	// if (req.params.id !== undefined) {
	// 	const entityData: TicmManagementEntityDT = {
	// 		id: parseInt(req.params.id),
	// 		name: req.body.name,
	// 		phone: parseInt(req.body.phone),
	// 		news: req.body.news,
	// 		rss: req.body.rss,
	// 		description: req.body.description,
	// 		status: req.body.status,
	// 		image: req.body.image
	// 	};
	// 	const entity: ResponseDT = await controllerInstance.entity.addEntity(entityData);
	// 	return res.json(entity);
	// }
	// const responseError: ResponseDT = {
	// 	status: false,
	// 	data: [],
	// 	message: "Entity id isn't exist.",
	// 	size: 0,
	// 	time: new Date().toLocaleString()
	// };
	// return res.json(responseError);
	return res.json({
		status: false,
		message: "TO DO: Update entity"
	});
});

/**
 * POST
 * @description add or udpate relations between entity and module
 * @param entity Entity id at body
 * @param module Modulues array at body
 * @returns entity object
 */
api.post("/entity/modules", async (req: Request, res: Response) => {

	const entityId: number = parseInt(req.body.entity);
	const modulesId: any = [];
	for (const i in req.body.module) {
		modulesId.push(parseInt(req.body.module[i]));
	}

	const user: ResponseDT = await controllerInstance.entity.modifyModules(entityId, modulesId);
	return res.json(user);
});

/**
 * GET
 * @description get relations between entity and module
 * @param entity Entity id at params
 * @returns entity object
 */
api.get("/entity/id/:id/modules", async (req: Request, res: Response) => {

	const entityId: number = parseInt(req.params.id);

	const modules: ResponseDT = await controllerInstance.module.getModuleOfEntity(entityId);
	return res.json(modules);
});


/**
 * **********************************
 * MODULES
 * **********************************
 */

/**
 * GET
 * @description Return a list of modules
 */
api.get("/module/list/", async (req: Request, res: Response) => {
	const modules: ResponseDT = await controllerInstance.module.getModules();
	return res.json(modules);
});

/**
 * GET
 * @description Return full data of a module
 * @returns ResponseDT
 */
api.get("/module/id/:id", async (req: Request, res: Response) => {

	if (req.params.id !== undefined) {
		const id: number = parseInt(req.params.id);
		const module: ResponseDT = await controllerInstance.module.getModuleById(id);
		return res.json(module);
	}
	const responseError: ResponseDT = {
		status: false,
		data: [],
		message: "Id not exist.",
		size: 0,
		time: new Date().toLocaleString()
	};
	return res.json(responseError);
});

/**
 * GET
 * @description Return a list of modules filtered by entity id
 */
api.get("/module/entity/:id", async (req: Request, res: Response) => {

	if (req.params.id !== undefined) {
		const id: number = parseInt(req.params.id);
		const modules: ResponseDT = await controllerInstance.module.getModuleOfEntity(id);
		return res.json(modules);
	}
	const responseError: ResponseDT = {
		status: false,
		data: [],
		message: "Entity id not exist.",
		size: 0,
		time: new Date().toLocaleString()
	};
	return res.json(responseError);

});



/**
 * **********************************
 * USERS
 * **********************************
 */

/**
 * GET
 * @description Return full data of an user
 * @param req.param.id
 * @returns ResponseDT
 */
api.get("/user/id/:id", async (req: Request, res: Response) => {

	if (req.params.id !== undefined) {
		const id: number = parseInt(req.params.id);
		const user: ResponseDT = await controllerInstance.user.getUser(id);
		return res.json(user);
	}
	return res.json({
		status: false,
		data: [],
		message: "Id not defined",
		size: 0,
		time: new Date().toLocaleString()
	});
});

/**
 * GET
 * @description Return full data of an user
 * @returns ResponseDT
 */
api.get("/user/mail/:email", async (req: Request, res: Response) => {

	if (req.params.email !== undefined) {
		const email: string = req.params.email;
		const user: ResponseDT = await controllerInstance.user.getUserByEmail(email);
		return res.json(user);
	}
	return res.json({
		status: false,
		data: [],
		message: "Mail not defined",
		size: 0,
		time: new Date().toLocaleString()
	});
});

/**
 * GET
 * @description Return a list of users
 */
api.get("/user/list/", async (req: Request, res: Response) => {

	const users: ResponseDT = await controllerInstance.user.getUsers();
	return res.json(users);
});

/**
 * GET
 * @description Return a list of users
 */
api.get("/user/sync/LDAP", async (req: Request, res: Response) => {

	const users: ResponseDT = await controllerInstance.user.syncUsersFromLDAP();
	return res.json(users);
});

/**
 * POST
 * @description Return if user was added
 */
api.post("/user", async (req: Request, res: Response) => {

	const user: TicmManagementUserDT = {
		name: req.body.name,
		surname: req.body.surname,
		email: req.body.email,
		created: parseInt((new Date().getTime() / 1000).toString()),
		status: false
	};
	const users: ResponseDT = await controllerInstance.user.addUser(user);
	return res.json(users);
});

/**
 * POST
 * @description Return the user object
 */
api.post("/user/entities", async (req: Request, res: Response) => {

	const userId: number = parseInt(req.body.user);
	const entitiesId: any = [];
	for (const i in req.body.entity) {
		entitiesId.push(parseInt(req.body.entity[i]));
	}

	const user: ResponseDT = await controllerInstance.user.modifyEntities(userId, entitiesId);
	return res.json(user);
});

/**
 * POST
 * @description Return the user object
 */
api.post("/user/modules", async (req: Request, res: Response) => {

	const userId: number = parseInt(req.body.user);
	const entityId: number = parseInt(req.body.entity);
	const modulesId: any = [];
	for (const i in req.body.module) {
		modulesId.push(parseInt(req.body.module[i]));
	}

	const user: ResponseDT = await controllerInstance.user.modifyModules(userId, entityId, modulesId);
	return res.json(user);
});


export const ticmManagementController: Router = api;
