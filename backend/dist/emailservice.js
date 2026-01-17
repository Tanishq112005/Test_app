"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionalEmailApi = void 0;
const SibApiV3Sdk = require("sib-api-v3-sdk");
const client = SibApiV3Sdk.ApiClient.instance;
const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.BREVO_API_KEY;
exports.transactionalEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();
