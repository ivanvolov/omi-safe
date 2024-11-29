const fs = require("fs");
const dotenv = require("dotenv");
const path = require("path");

let envFileName;
if (process.env.ENV === "LOCAL") {
    envFileName = "local.env";
} else if (process.env.ENV === "PROD") {
    envFileName = ".env";
} else {
    console.error('Invalid ENV value. Must be "local" or "PROD".');
    process.exit(1);
}

// Construct the environment file path
const envDir = path.join(__dirname, "../..", envFileName);
const env = dotenv.parse(fs.readFileSync(envDir));

// console.log(env);
module.exports = env;
