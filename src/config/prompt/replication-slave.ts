import Prompts from "prompts";
import RegisterSlave from './questions/register-slave.js';
import FromQuestion from "@axiona/prompt/prompt-object/array/from-question.js";
import {merge} from "lodash";
import {PostgresConnectionOptions} from "typeorm/driver/postgres/PostgresConnectionOptions.js";
import {O} from "ts-toolbelt";

export default async function ReplicationSlave<Type extends PostgresConnectionOptions>(
    config: Type,
    prompt : (connection: Type)=>Promise<Type>
) : Promise<Type> {

    let slaves : Type[] = [];

    if(!config.replication) {

        (config as O.Writable<Type>).replication = {
            master : {},
            slaves : slaves
        }

    } else {

        slaves = config.replication.slaves as Type[];
    }

    for (const slave of slaves) {

        merge(slave, await prompt(slave));
    }


    while (true) {

        const option = await Prompts(FromQuestion(new RegisterSlave()));

        if(option.register) {

            slaves.push(await prompt({} as Type));

        } else {

            break;
        }

    }

    return config;
}
