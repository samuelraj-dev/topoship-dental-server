"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    jwtKeys: {
        accessTokenPublicKey: "ACCESS_TOKEN_PUBLIC_KEY",
        accessTokenPrivateKey: "ACCESS_TOKEN_PRIVATE_KEY",
        refreshTokenPublicKey: "REFRESH_TOKEN_PUBLIC_KEY",
        refreshTokenPrivateKey: "REFRESH_TOKEN_PRIVATE_KEY",
    },
    dbCred: {
        host: "MYSQL_HOST",
        userName: "MYSQL_USER",
        password: "MYSQL_PASSWORD",
        dbName: "MYSQL_DATABASE"
    },
    port: "PORT",
    origin: "ORIGIN",
    smtp: {
        user: "SMTP_USER",
        pass: "SMTP_PASSWORD",
        host: "SMTP_HOST",
        port: "SMTP_PORT",
        secure: "SMTP_SECURE",
    },
    logLevel: "LOG_LEVEL",
    saltWorkFactor: "SALT_WORK_FACTOR",
    accessTokenTtl: "ACCESS_TOKEN_TTL",
    refreshTokenTtl: "REFRESH_TOKEN_TTL",
};
//# sourceMappingURL=custom-environment-variables.js.map