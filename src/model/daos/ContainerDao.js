import { MongoClient } from 'mongodb';
import logger from '../../logger.js'
import CustomError from '../../errores/CustomError.js'

let mongo_url = process.env.MONGO_URL //config production o developement en .env
const base = process.env.MONGO_BASE

if (process.env.NODE_ENV === "developement"){
    mongo_url = process.env.MONGO_URL_DEVELOPEMENT
}

const client = new MongoClient(mongo_url, { serverSelectionTimeOutMS: 5000 });
await client.connect();

export default class ContainerDao {

    constructor(collection) {
        this.collectionName = collection
        this.collection = client.db(base).collection(collection)
        logger.info(`Mongo Base:${base} collection: ${collection} instanciada`)
    }

    async getAll() {
        try {
            return await this.collection.find().toArray()
        }
        catch (err) {
            logger.error(err)
            throw new CustomError(500, `Error getting all records in collection ${this.collectionName}`, err)
        }
    }

    async getById(query) {
        let respuesta       
        try {
            respuesta = await this.collection.findOne(query);
        }
        catch (err) {
            logger.error(err)
            throw new CustomError(500, `Error when obtaining a Document by id in the collection ${this.collectionName}`, err)
        }

        if (!respuesta) {
            throw new CustomError(404, `Document not found in the collection ${this.collectionName} with that ${JSON.stringify(query)}`)
        }
        return respuesta
    }

    async add(data) {
        try {
            const { insertedId } = await this.collection.insertOne(data)
            return insertedId;
        }
        catch (err) {
            logger.error(err)
            throw new CustomError(500, `Error adding mongo document to collection ${this.collectionName}`, err)
        }
    }
   
    async deleteById(query) {

        try {
            return await this.collection.deleteOne(query)
        }
        catch (err) {
            logger.error(err)
            throw new CustomError(500, `Error when delete a documents in collection ${this.collectionName}`, err)
        }
    }

    async listByQuery(query){
        try {
            return await this.collection.find(query).toArray()
        }
        catch (err) {
            logger.error(err)
            throw new CustomError(500, `error getting all records in collection ${this.collectionName}`, err)
        }

    }

}
