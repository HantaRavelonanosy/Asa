/** port the app listens on */
export const PORT = process.env.ASA_UI_PORT || 4000;

/** mongodb connection url */
export const MONGO_URL =
  process.env.ASA_UI_MONGO_URL || "mongodb://localhost:27017/asa";

/** Clickhouse connection options */
export const CLICKHOUSE_CONFIG = {
  HOST: process.env.ASA_UI_CLICKHOUSE_HOST || "localhost",
  PORT: Number(process.env.ASA_UI_CLICKHOUSE_PORT) || 9004,
  USER: process.env.ASA_UI_CLICKHOUSE_USER || "default",
  PASSWORD: process.env.ASA_UI_CLICKHOUSE_PASSWORD,
};
