import {__decorate, __metadata} from "tslib";
import {PrimaryColumn} from "typeorm";
import Id from './id.js';


export default function ComposeInteger<Type>(entity : { new (...args: any[]):  Type }) : { new (...args: any[]):  Type } & { new () : Id<number|string> }
export default function ComposeInteger<Type>(entity : { new (...args: any[]):  Type }, type : 'int') : { new (...args: any[]):  Type } & { new () : Id<number> }
export default function ComposeInteger<Type>(entity : { new (...args: any[]):  Type }, type : 'bigint') : { new (...args: any[]):  Type } & { new () : Id<number|string> }
export default function ComposeInteger<Type>(
    entity : { new (...args: any[]):  Type },
    type : 'bigint'|'int' = 'bigint'
) : { new (...args: any[]):  Type } & { new () : Id<number|string> } {


    switch (type) {

        case "int":
            __decorate([
                PrimaryColumn({ nullable: false, type, unsigned: true }),
                __metadata("design:type", Object)
            ], entity.prototype, "id", void 0);
        break;

        case "bigint":
            __decorate([
                PrimaryColumn({ nullable: false, type, unsigned: true }),
                __metadata("design:type", Number)
            ], entity.prototype, "id", void 0);
        break;
    }

    return entity as { new (...args: any[]):  Type } & { new () : Id<number|string> };
}