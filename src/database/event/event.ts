import Database from '../database.js';

export default interface Event {

    connectingError(database : Database, error : Error);
    connecting(database : Database);
    connected(database : Database);
    disconnecting(database : Database);
    disconnected(database : Database);
    disconnectionError(database : Database, error : Error);
}