import Config from '../config/config.js';
import {DataSource} from "typeorm";
import Standard from './standard.js';
import Event from './event/event.js';
import Null from './event/null.js';

export default class Listenable extends Standard {

    constructor(
        config : Config,
        private event : Event = new Null()
    ) {
        super(config);
    }

    connect() : Promise<DataSource> {

        this.event.connecting(this);

        return super.connect().then((connection : DataSource) => {

            this.event.connected(this);
            return connection;

        }).catch(error=>{

            this.event.connectingError(this, error);
            throw error;
        });
    }


    disconnect() : Promise<void> {

        this.event.disconnecting(this);

        return super.disconnect().then(()=>{

            this.event.disconnected(this);

            return undefined;

        }).catch(error=>{

            this.event.disconnectionError(this, error);

            throw error;
        });

    }
}

