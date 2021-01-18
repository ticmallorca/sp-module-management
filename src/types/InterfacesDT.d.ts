/**
 * InterfacesDT
 * Copyright(c) 2019 Alejandro Villén
 * MIT Licensed
 */


// Entity
interface EntitiesDT {
    id: string;
    name: string;
}

interface EntityDT {
    id: number;
    name: string;
    description: string;
    image: ImageDT;
    rss: string;
    news: string;
    category: CategoryDT[];
    phone: number;

}


// Issue
interface IssueDT {
    category: number;
    description: string;
    location: LocationDT;
    image: ImageDT[];
}

interface IssueStatusDT {
    id: number;
    status: number;
}

// Token
interface TokenDT {
    token: string,
    expire: string
}

// Device
interface DeviceDT {
    platform: string,
    version: string,
    manufacturer: string,
    network: string
}

// Categories
interface CategoryDT {
    id: number;
    title: string;
    description: string;
    image: ImageDT;
}


// Basic DT
interface LocationDT {
    latitude: number;
    longitude: number;
    altitude: number;
}

interface ImageDT {
    name: string;
    format: string;
    height: number;
    width: number;
    data: string;
}

interface reportDT {
    issueId: number,
    entityId: number,
    categoryId: number,
    statusId: number,
    userId: number
    report: string,
    feedback: number,
    created: number
}