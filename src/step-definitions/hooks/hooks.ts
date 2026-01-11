import { AfterAll, BeforeAll, Before, After, Status } from "@cucumber/cucumber";
import { Browser, BrowserType, chromium, firefox, webkit } from "playwright/test";
import { pageFixture } from "./browserContextFixture";
import { setGlobalSettings } from "../../utils/playwright-timeouts";

//load env variables from .env file
import { config as loadEnv } from "dotenv";
const env = loadEnv({ path: './env/.env' });

//create a configuration object for easy access to env variables
const config = {
    headless: env.parsed?.HEADLESS === 'true',
    browser: env.parsed?.UI_AUTOMATION_BROWSER || 'chromium',
    fullScreen: env.parsed?.FULL_SCREEN === 'true',
};

// create dictionary mapping browser name to their launch func
const browsers: { [key: string]: BrowserType } = {
    'chromium': chromium,
    'firefox': firefox,
    'webkit': webkit
};

// func to initialize browser context
let browserInstance: Browser | null = null;

async function initalizeBrowserContext(selectedBrowser: string): Promise<Browser> {
    const launchBrowser = browsers[selectedBrowser];
    if (!launchBrowser) {
        throw new Error(`Invalid browser selected: ${selectedBrowser}`);
    }

    return await launchBrowser.launch({
        headless: config.headless,
        args: config.fullScreen ? ['--start-maximized'] : []
    });
}


async function initializePage(): Promise<void> {
    if (!browserInstance) {
        throw new Error('Browser instance is null 💣💥');
    }

    pageFixture.context = await browserInstance.newContext({
        ignoreHTTPSErrors: true,
        viewport: config.fullScreen ? null : { width: 1280, height: 720 }
    });

    pageFixture.page = await pageFixture.context.newPage();
    setGlobalSettings(pageFixture.page);
}


//Runs before All scenarios
BeforeAll(async () => {
    console.log("\n Executing test suite..");
});

//Runs after All scenarios
AfterAll(async () => {
    console.log("\n Finished Executing test suite..");
});

//before each scenario
Before(async () => {
    try {
        browserInstance = await initalizeBrowserContext(config.browser);
        console.log(`Browser context initialized for: ${config.browser}`)
        await initializePage();
    } catch (error) {
        console.error('💣💥Browser context initialization failed : ', error);
    }
});

//Runs after each scenario
After(async function ({ pickle, result }) {
    if (result?.status === Status.FAILED) {
        if (pageFixture.page) {
            const screeshotPath = `./reports/screenshots/${pickle.name}-${Date.now()}.png`;
            const image = await pageFixture.page.screenshot({
                path: screeshotPath,
                type: 'png',
                // timeout:30000
            });
            await this.attach(image, 'image/png');
        } else {
            console.error('pageFixture.page is undefined 💣💥');
        }
    };

    if (browserInstance) {
        await pageFixture.page?.close();
        await browserInstance.close();
    }

});