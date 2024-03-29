import {EntityManager, ObjectType} from 'typeorm';
import {Required} from 'utility-types';
import Undefined from '@axiona/undefined/assert/undefined.js';
import {DataSource} from "typeorm";
/**
 * basic bulk insert operation
 *
 */
export default function Inserts<
    Entity extends object,
    PrimaryKey extends keyof Entity
>(
    connection : DataSource|EntityManager,
    entities : Entity[],
    primaryKey : PrimaryKey,
    entity ?: ObjectType<Entity>
) : Promise<Required<Entity, PrimaryKey>[]> {

    if(entities.length === 0) {

        return Promise.resolve([]);
    }

    entities.forEach((entity)=>Undefined(entity[primaryKey]));

    if(!entity) {

        entity = entities[0].constructor;
    }

    return <Promise<Required<Entity, PrimaryKey>[]>> connection.getRepository(entity).save(entities);

}
