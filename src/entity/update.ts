import {EntityManager, ObjectType, UpdateResult} from 'typeorm';
import Updated from './boolean/updated.js';
import Unique from '@alirya/array/unique-parameters.js';
import OmitUndefined from '@alirya/object/omit-undefined.js';
import Extract from '@alirya/object/extract.js';
import NotEmpty from '@alirya/object/boolean/not-empty.js';
import NotFound from '../throwable/not-found.js';
import Name from '@alirya/object/string/name.js';
import PrimaryKeyRequired from './assert/not-undefined.js';
import {QueryDeepPartialEntity} from 'typeorm/query-builder/QueryPartialEntity.js';

export default function Update<Entity extends object>(
    manager : EntityManager,
    data : Entity,
    key : keyof Entity,
    entity ?: ObjectType<Entity>,
    detaches : (keyof Entity)[] = []
) : Promise<Entity> {

    PrimaryKeyRequired<Entity, keyof Entity>(data, key);

    OmitUndefined(data);

    const primary = data[key];

    const detach : boolean = detaches.length !== 0;

    let extract : Extract<Entity, (keyof Entity)[]>|undefined;

    if(detach) {

        detaches.push(key);
        detaches = Unique(detaches);

        extract = new Extract(data, detaches);
    }

    let promise : Promise<Entity>;

    const valid = NotEmpty(data);

    if(!valid) {

        promise = Promise.resolve(data);

    } else {

        promise = manager.getRepository(entity || data.constructor).update(primary, data as QueryDeepPartialEntity<Entity>).then((result : UpdateResult)=>{

            if(!Updated(result, 1)) {

                throw new NotFound(`${primary} is not found for ${Name(data)}`);
            }

            return data;

        });
    }

    if(extract) {

        return promise.finally(()=>{

            Object.assign(data, (extract as Extract<Entity, (keyof Entity)[]>).return);
        });

    } else {

        return promise;
    }


}
