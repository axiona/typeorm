import {Union} from 'ts-toolbelt';
import {EntityManager, ObjectType} from 'typeorm';
import {FindOneOptions} from 'typeorm/find-options/FindOneOptions';
import ObjectNotEmpty from '@alirya/object/boolean/not-empty';
import ArrayNotEmpty from '@alirya/array/boolean/not-empty';
import Value from '@alirya/value/value';
import {JoinOptions} from 'typeorm/find-options/JoinOptions';
import Segment from '@alirya/set/segment';

/**
 * @deprecated
 */
export default class Read<Entity> implements Readonly<Value<Promise<Entity>>>, FindOneOptions<Entity> {

    public relations : string[] = [];
    public select : (keyof Entity)[] = [];
    // @ts-ignore
    public where : Union.Exclude<FindOneOptions<Entity>['where'], string|undefined> = {};
    public cache : FindOneOptions<Entity>['cache'] = undefined;
    public order : FindOneOptions<Entity>['order'] = {};
    public lock : FindOneOptions<Entity>['lock'];
    public withDeleted : boolean = false;
    public join?: JoinOptions;

    public loadRelationIds?: boolean | {
        relations?: string[];
        disableMixedMap?: boolean;
    };
    loadEagerRelations?: boolean;

    constructor(
        public manager : EntityManager,
        public entity : ObjectType<Entity>,
    ) {
    }

    get option() : FindOneOptions<Entity> {

        return {
            cache : this.cache || undefined,
            relations : ArrayNotEmpty(this.relations) ? [...new Segment('.', this.relations)] : undefined,
            select : ArrayNotEmpty(this.select) ? this.select : undefined,
            where : ObjectNotEmpty(this.where as object) ? this.where : undefined,
            order : ObjectNotEmpty(<object>this.order) ? this.order : undefined,
            lock : ObjectNotEmpty(<object>this.lock) ? this.lock : undefined,
            withDeleted : this.withDeleted,
            loadRelationIds : this.loadRelationIds,
            loadEagerRelations : this.loadEagerRelations,
        };
    }

    lockOptimistic(version : number | Date) {
        this.lock = {
            mode:'optimistic',
            version : version
        };
    }

    lockDirtyRead() {
        this.lock = {mode:'dirty_read'};
    }

    lockPessimistic(mode : 'read' | 'write'  | 'partial_write' | 'write_or_fail') {

        this.lock = <FindOneOptions<Entity>['lock']>{mode:'pessimistic_' + mode};
    }


    get value() : Promise<Entity> {

        return this.manager.getRepository(this.entity).findOneOrFail(this.option);
    }
}
