"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config_1 = __importDefault(require("config"));
const logger_1 = __importDefault(require("./utils/logger"));
const server_1 = __importDefault(require("./utils/server"));
const connectDB_1 = __importDefault(require("./utils/connectDB"));
const port = config_1.default.get('port') || process.env.PORT;
const app = (0, server_1.default)();
function main() {
    app.listen(port, () => __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`app running on port: ${port}`);
        yield (0, connectDB_1.default)();
    }));
}
main();
//# sourceMappingURL=app.js.map