import CodeFromQuery from './code-from-query.js';
import PublicMigrationGenerateCommand from '../../migration-generate-command/public-migration-generate-command.js';
import {Query} from "typeorm/driver/Query.js";

export default function ClassFromQueries(
    name: string,
    timestamp : number,
    queryUp: Query,
    queryDown: Query,
) : string {

    const up = CodeFromQuery(queryUp);
    const down = CodeFromQuery(queryDown);

    return  PublicMigrationGenerateCommand.getTemplate(name, timestamp, [up], [down]);
}
