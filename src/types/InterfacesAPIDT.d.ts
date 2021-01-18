/**
 * InterfacesAPIDT
 * Copyright(c) 2019 Alejandro Villén
 * MIT Licensed
 */

// API DT
// Auth
interface API_POST_AccessDT {
    phrase: string;
    instance: string;
    device: DeviceDT;
}

// Entities
interface API_GET_EntityDT {
    token: string;
}

interface API_GET_ConfigDT {
    token: string;
    entityId: number;
}

// Issues
interface API_GET_IssueDT {
    token: string;
    entityId: number;
    limit: number;
}

interface API_GET_IssueIdDT {
    token: string;
    entityId: number;
    id: number;
}

interface API_POST_IssueDT {
    token: string;
    entityId: number;
    issue: IssueDT;
}
