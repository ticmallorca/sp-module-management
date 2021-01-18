/**
 * ticmManagement - controller
 * Copyright(c) 2019 Alejandro Villén
 * MIT Licensed
 */

// Core modules
import { entityInstance } from "./Entity";
import { moduleInstance } from "./Module";
import { userInstance } from "./User";

class Controller {

	// Core modules
	public user = userInstance;
	public entity = entityInstance;
	public module = moduleInstance;

	constructor () { }
}

export let controllerInstance = new Controller();
