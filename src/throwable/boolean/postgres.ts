import TypeObject from '@axiona/object/boolean/object.js';
import TypeString from '@axiona/string/boolean/string.js';
import TypeNumber from '@axiona/number/boolean/number.js';
import PostgresError from '../postgres.js';
import TypeArray from '@axiona/array/boolean/array.js';

export default function Postgres(value : any) : value is PostgresError;
export default function Postgres(value : PostgresError) : value is PostgresError;
export default function Postgres(value : PostgresError) : value is PostgresError {

    if(!TypeObject(value)) {
        return false;
    }

    if(!TypeString(value.table)) {
        return false;
    }


    if(!TypeString(value.line)) {
        return false;
    }

    if(!TypeString(value.routine)) {
        return false;
    }

    if(!TypeString(value.detail)) {
        return false;
    }

    if(!TypeString(value.constraint)) {
        return false;
    }

    if(!TypeNumber(value.length)) {
        return false;
    }

    if(!TypeString(value.name)) {
        return false;
    }

    if(!TypeString(value.message)) {
        return false;
    }

    if(!TypeString(value.code)) {
        return false;
    }

    if(!TypeString(value.schema)) {
        return false;
    }

    if(!TypeString(value.severity)) {
        return false;
    }

    if(!TypeString(value.file)) {
        return false;
    }

    if(!TypeString(value.query)) {
        return false;
    }

    if(!TypeArray(value.parameters)) {
        return false;
    }

    return true;
}
