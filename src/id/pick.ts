import Id from './id.js';
import {PickParameters} from '@axiona/object/pick.js';

export default function Pick<IdType extends Id>(object : IdType) : Pick<IdType, 'id'> {

    return PickParameters(object, 'id');
}
