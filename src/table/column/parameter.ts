import Table from '../table';
import Infer from '../entity/infer';
import BaseParameter from '@alirya/function/parameter/parameter';
import Class from '@alirya/class/class';
import Column from './column';
import Callable from '@alirya/function/callable';
import String from '@alirya/string/boolean/string';
import PickAlpha from '@alirya/string/pick-alpha';

export default function Parameter<
    TableType extends Table<Class<object, unknown[]>> = Table<Class<object, unknown[]>>,
    Key extends (keyof InstanceType<Infer<TableType>>) & string = (keyof InstanceType<Infer<TableType>>) & string
> (
    column : Column<TableType, Key>,
    parameter ?: string|Callable<[string, Column<TableType, Key>], string>
) : Column<TableType, Key> & BaseParameter {

    if(!String(parameter)) {

        const auto = column.column.replace('.', '');

        parameter = parameter ? parameter(auto, column) : auto;
    }

    parameter = PickAlpha(parameter);

    return Object.assign({parameter}, column);
}
