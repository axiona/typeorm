import Pagination from '../pagination.js';
import Positive from '@axiona/number/ensure/positive.js';

export default function SkipTake(pagination: Pagination) : {take:number, skip:number} {

    const page = Positive(pagination.page);
    const take = Positive(pagination.limit);

    const skip = (page - 1) * take;

    if(skip > 0) {

        return {skip, take};
    }

    return {skip: 0, take};

}
