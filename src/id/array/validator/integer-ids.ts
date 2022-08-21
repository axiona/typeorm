import { ListAllParameters } from '@alirya/array/validator/list-all';
import { AndParameters } from '@alirya/array/validatable/and';
import InvalidMessageList from '@alirya/array/message/message/list/invalid';
import { ValuePartialParameters } from '@alirya/array/validator/value-partial';
import { ArrayParameters } from '@alirya/array/validator/array';
import Integer from "../../../number/validator/integer";

export default function IntegerIds() {

    return ValuePartialParameters([
            ArrayParameters(),
            ListAllParameters(Integer(), AndParameters, InvalidMessageList)
        ],
        AndParameters,
        InvalidMessageList
    );
}
