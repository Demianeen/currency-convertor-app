export { }

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_CURRENCY_URL: string;
      REACT_APP_CURRENCY_APIKEY: string;
    }
  }
}
