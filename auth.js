const axios = require("axios");
const puppeteer = require("puppeteer");
const {
  client_id,
  redirect_uri,
  client_secret,
  base_url,
} = require("./config/config");

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
  await page.waitForNavigation({ waitUntil: "networkidle0" });
  const redirectedURL = page.url();
  const codeForLogin = redirectedURL.split("=")[1];

  console.log("Redirected URL:", redirectedURL, codeForLogin);
  await browser.close();

  dataAuthToken.code = codeForLogin;
  getAccessToken(dataAuthToken);
  return 1;
};

openDialogAndGrantAccess();

const url = `${base_url}/v2/login/authorization/token`;
const headers = {
  accept: "application/json",
  "Content-Type": "application/x-www-form-urlencoded",
};

const getAccessToken = (data) => {
  axios
    .post(url, new URLSearchParams(data), { headers })
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        console.log(response.data);
      }
    })
    .catch((error) => {
      console.error(error?.response?.status);
      console.error(error);
    });
};
