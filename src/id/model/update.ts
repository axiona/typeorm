import {EntityManager, ObjectType} from 'typeorm';
import Id from '../id.js';
import StandardUpdate from '../../entity/update.js';


export default function Update<Entity extends Required<Id>>(
    manager : EntityManager,
    data : Entity,
    entity ?: ObjectType<Entity>,
    detaches : (keyof Entity)[] = []
) : Promise<Entity> {

    return StandardUpdate(manager, data, 'id', entity, detaches);
}
