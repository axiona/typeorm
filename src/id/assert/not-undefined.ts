import Guard from '../boolean/not-undefined';
import Callback from '@alirya/function/assert/callback-parameters';
import NotUndefinedError from './throwable/not-undefined';
import {Required} from 'utility-types';
import Id from '../id';

export default function NotUndefined(
    entity : Id,
    error : (entity:object)=>Error = NotUndefinedError
) : asserts entity is Required<Id, 'id'> {

    Callback(entity, Guard, error);
}
