/**
 * public
 * Copyright(c) 2019 Alejandro Villén
 * MIT Licensed
 */
import { Request, Response, Router } from "express";
const api: Router = Router();
import { settingsInstance } from "../../../core/Settings";

api.get("/entities", async (req: Request, res: Response) => {
	settingsInstance.setPageTitle(req, "TicmManagement - Entities Section");
	const currentPanel: SettingsCurrentPanelDT = {
		module: "ticmManagement",
		component: "entities"
	};
	settingsInstance.setCurrentPanel(req, currentPanel);
	return res.render("pages/base", await settingsInstance.getSettings(req));
});

api.get("/users", async (req: Request, res: Response) => {
	settingsInstance.setPageTitle(req, "TicmManagement - User Section");
	const currentPanel: SettingsCurrentPanelDT = {
		module: "ticmManagement",
		component: "users"
	};
	settingsInstance.setCurrentPanel(req, currentPanel);
	return res.render("pages/base", await settingsInstance.getSettings(req));
});

export const ticmManagementController: Router = api;