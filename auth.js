const axios = require("axios");
const puppeteer = require("puppeteer");
const {
  client_id,
  redirect_uri,
  client_secret,
  base_url,
} = require("./config/config");
const logger = require("./utils/logger");
const { setToken } = require("./utils/tokenStore");

const startURL = `https://api.upstox.com/v2/login/authorization/dialog?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}`;

const dataAuthToken = {
  code: "",
  client_id: client_id,
  client_secret: client_secret,
  redirect_uri: redirect_uri,
  grant_type: "authorization_code",
};

const openDialogAndGrantAccess = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(startURL);
  logger.info("Opening dialog for granting access...");
  await page.waitForNavigation({ waitUntil: "networkidle0" });
  logger.info("Dialog opened");
  const redirectedURL = page.url();
  logger.info("Redirected URL:", redirectedURL);
  const codeForLogin = redirectedURL.split("=")[1];
  await browser.close();
  logger.info("Code for login:", codeForLogin);

  dataAuthToken.code = codeForLogin;
  getAccessToken(dataAuthToken);
  return 1;
};

const url = `${base_url}/v2/login/authorization/token`;
const headers = {
  accept: "application/json",
  "Content-Type": "application/x-www-form-urlencoded",
};

const getAccessToken = (data) => {
  logger.info("Getting access token...");
  axios
    .post(url, new URLSearchParams(data), { headers })
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        setToken(response.data.access_token);
        logger.info("Access token set successfully");
      }
    })
    .catch((error) => {
      logger.error(error);
    });
};

module.exports = { openDialogAndGrantAccess };