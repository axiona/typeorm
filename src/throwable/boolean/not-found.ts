import {EntityNotFoundError} from 'typeorm/error/EntityNotFoundError';
import Name from "@alirya/object/string/name";

export default function NotFound(value : object) : value is EntityNotFoundError {

    if(value instanceof EntityNotFoundError) {

        return true;
    }

    if(Name(value) === 'EntityNotFoundError') {

        return true;
    }

    return false;
}
