import Table from '../table';
import Infer from '../entity/infer';

/**
 * Describe column data
 */
export default interface Column<
    TableType extends Table = Table,
    Key extends (keyof InstanceType<Infer<TableType>>) & string = (keyof InstanceType<Infer<TableType>>) & string
> {

    /**
     * Table data
     */
    readonly table: TableType;
    /**
     * column name on specified table, always without prefix
     */
    readonly key : Key;
    /**
     * final column name
     */
    readonly column: string;
}
