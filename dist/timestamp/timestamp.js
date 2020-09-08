var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "typeorm", "ts-mixer"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const typeorm_1 = require("typeorm");
    const ts_mixer_1 = require("ts-mixer");
    class Timestamp {
    }
    __decorate([
        ts_mixer_1.decorate(typeorm_1.Column({ default: () => "CURRENT_TIMESTAMP" })),
        __metadata("design:type", Date)
    ], Timestamp.prototype, "created", void 0);
    __decorate([
        ts_mixer_1.decorate(typeorm_1.Column({ default: () => 'CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()' })),
        __metadata("design:type", Date)
    ], Timestamp.prototype, "updated", void 0);
    exports.default = Timestamp;
});
//# sourceMappingURL=timestamp.js.map