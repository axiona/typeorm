import Id from './id.js';

export default interface Required<Type extends number|string> extends globalThis.Required<Id<Type>> {

}
