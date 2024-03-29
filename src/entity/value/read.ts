import {Union} from 'ts-toolbelt';
import {EntityManager, ObjectType} from 'typeorm';
import {FindOneOptions} from 'typeorm/find-options/FindOneOptions.js';
import ObjectNotEmpty from '@axiona/object/boolean/not-empty.js';
import ArrayNotEmpty from '@axiona/array/boolean/not-empty.js';
import Value from '@axiona/value/value.js';
import {JoinOptions} from 'typeorm/find-options/JoinOptions.js';
import Segment from '@axiona/set/segment.js';

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
    public withDeleted  = false;
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
        // TODO FIX ANY TYPE
        return this.manager.getRepository(this.entity).findOneOrFail(this.option as any) as Promise<Entity> ;
    }
}
