import AssertUndefined from '../assert/undefined';
import UndefinedError from '../assert/throwable/undefined';
import {Optional} from 'utility-types';

export default function Undefined<
    Entity extends object,
    PrimaryKey extends keyof Entity
>(
    entity : Optional<Entity, PrimaryKey>,
    key : PrimaryKey,
    error : (entity:object, primaryKey : PropertyKey)=>Error = UndefinedError
) : Optional<Entity, PrimaryKey>  {

    AssertUndefined(entity, key, error);

    return entity;
}
