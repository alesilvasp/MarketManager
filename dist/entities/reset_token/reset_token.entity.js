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
exports.ResetToken = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../user/user.entity");
let ResetToken = class ResetToken {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ResetToken.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ResetToken.prototype, "token", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ResetToken.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.OneToOne)((type) => user_entity_1.User, {
        eager: true
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", user_entity_1.User)
], ResetToken.prototype, "user", void 0);
ResetToken = __decorate([
    (0, typeorm_1.Entity)()
], ResetToken);
exports.ResetToken = ResetToken;
