import Config from "./config";
import {EntitySchema} from "typeorm/entity-schema/EntitySchema";
import Class from "@alirya/class/class";
import {DataSourceOptions} from "typeorm/data-source/DataSourceOptions";
import IsMap from "@alirya/map/boolean/map";

export default function Create(config : Partial<Config>|DataSourceOptions) : Config {

    if(!config.entities || !IsMap(config.entities)) {

        const entities = new Map<Function | string | EntitySchema | Class, string>();

        return Object.assign(config, {entities}) as Config;
    }

    return config as Config;

}