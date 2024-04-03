import {MongoClient} from 'mongodb'
import { dbConfig } from '../config';

export async function createDBconnection() {

    try {
        const client = await MongoClient.connect( dbConfig.uri, dbConfig.options);
        console.log('Db Connected');
        return client.db(dbConfig.uri.split('/').pop());
    } catch (error) {
        console.error('Error ============ ON DB Connection')
        console.log(error);
    }
 
};

 
