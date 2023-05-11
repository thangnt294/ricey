import * as dotenv from "dotenv";

dotenv.config();

export const FB_PAGE_ACCESS_TOKEN = process.env.FB_PAGE_ACCESS_TOKEN;
export const FB_VERIFY_TOKEN = process.env.FB_VERIFY_TOKEN;
export const FB_API_VERSION = process.env.FB_API_VERSION;
export const OPENAI_ORG_ID = process.env.OPENAI_ORG_ID;
export const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
export const PORT = process.env.PORT || 1337;
