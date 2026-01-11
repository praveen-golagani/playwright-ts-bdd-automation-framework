import { Page } from "@playwright/test";

//load env variables from .env file
import { config as loadEnv } from "dotenv";
export const env = loadEnv({ path: './env/.env' });

export function setGlobalSettings(page:Page){

    const navigationTimeout = parseInt(env.parsed?.UI_AUTOMATION_NAVIGATION_TIMEOUT || '50000');
    const commandTimeout = parseInt(env.parsed?.UI_AUTOMATION_COMMAND_TIMEOUT || '30000');
    //set global nav timeout
    page.setDefaultNavigationTimeout(navigationTimeout); 

    //set global command timeout
    page.setDefaultTimeout(commandTimeout);

}