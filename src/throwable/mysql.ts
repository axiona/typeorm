import QueryError from './query-error';

export default interface Mysql extends QueryError {

    code: string;
    errno: number;
    sqlMessage:string;
    sqlState: string;
    index: number;
    sql:string;
}
