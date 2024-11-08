"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gps = void 0;
const typeorm_1 = require("typeorm");
let Gps = class Gps extends typeorm_1.BaseEntity {
};
exports.Gps = Gps;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Gps.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 9, scale: 6 }),
    __metadata("design:type", Number)
], Gps.prototype, "latitude", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 9, scale: 6 }),
    __metadata("design:type", Number)
], Gps.prototype, "longitude", void 0);
__decorate([
    (0, typeorm_1.Column)('char', { length: 60 }),
    __metadata("design:type", String)
], Gps.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp'),
    __metadata("design:type", Date)
], Gps.prototype, "searchDate", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Gps.prototype, "createAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Gps.prototype, "updateAt", void 0);
exports.Gps = Gps = __decorate([
    (0, typeorm_1.Entity)('gps')
], Gps);
