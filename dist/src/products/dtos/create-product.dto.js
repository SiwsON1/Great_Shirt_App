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
exports.ProductDTO = void 0;
const class_validator_1 = require("class-validator");
const class_validator_2 = require("class-validator");
const class_validator_3 = require("class-validator");
class ProductDTO {
}
exports.ProductDTO = ProductDTO;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_2.IsString)(),
    (0, class_validator_2.IsUUID)(),
    __metadata("design:type", String)
], ProductDTO.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_2.IsString)(),
    (0, class_validator_2.Length)(5, 25),
    __metadata("design:type", String)
], ProductDTO.prototype, "name", void 0);
__decorate([
    (0, class_validator_2.IsInt)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_3.Min)(0),
    (0, class_validator_3.Max)(999),
    __metadata("design:type", Number)
], ProductDTO.prototype, "price", void 0);
__decorate([
    (0, class_validator_2.IsInt)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_3.Min)(1),
    (0, class_validator_3.Max)(5),
    __metadata("design:type", Number)
], ProductDTO.prototype, "rate", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_2.IsString)(),
    __metadata("design:type", String)
], ProductDTO.prototype, "image", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_2.IsString)(),
    (0, class_validator_2.Length)(0, 350),
    __metadata("design:type", String)
], ProductDTO.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_2.IsString)(),
    (0, class_validator_2.Length)(0, 20),
    __metadata("design:type", String)
], ProductDTO.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_2.IsString)(),
    (0, class_validator_2.Length)(0, 20),
    __metadata("design:type", String)
], ProductDTO.prototype, "color", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_2.IsString)(),
    (0, class_validator_2.Length)(0, 30),
    __metadata("design:type", String)
], ProductDTO.prototype, "material", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_2.IsString)(),
    (0, class_validator_2.Length)(0, 30),
    __metadata("design:type", String)
], ProductDTO.prototype, "brand", void 0);
//# sourceMappingURL=create-product.dto.js.map