/**
 * module
 * Copyright(c) 2019 Alejandro Villén
 * MIT Licensed
 */

import { coreInstance } from "../../core/Core";
import settings from "./settings.json";
export class Module {

	private configuration: SettingsModuleDT;
	constructor () {
		console.log("* Module TicM Management Instantiated at " + new Date().toLocaleString() + " *");
	}
	public async init(user: SettingsUserDT) {
		this.configuration = JSON.parse(JSON.stringify(settings));

		const assetStorage = await coreInstance.service.assetStorage.init(this.configuration);
		if (!assetStorage.status) {
			console.error(`Error: init module. Module: ${this.configuration.name} Message: ${assetStorage.message}`);
		}

		const entities = await coreInstance.entity.entity.getEntities();
		const modules = await coreInstance.entity.module.getModules();

		for (const i in this.configuration.language) {
			const lang = await require("./language/" + i + ".json");
			this.configuration.language[i] = lang;
		}
		if (entities.status) this.configuration.settings.entity = entities.data;
		if (modules.status) this.configuration.settings.module = modules.data;

	}
	public getSettings() {
		return this.configuration;
	}
}
