import ICreateClientDTO from '@modules/users/dtos/ICreateClientDTO'
import IClientsRepository from '@modules/users/repositories/IClientsRepository'
import {getRepository,Repository,} from 'typeorm'
import Clients from '../entities/Clients'

export default class ClientsRepository implements IClientsRepository{

    private clientsRepository:Repository<Clients>
    
    constructor(){
        this.clientsRepository = getRepository(Clients)
    }

    public async create({nome,email,cpf,sexo}:ICreateClientDTO):Promise<Clients | undefined>{
        const client = this.clientsRepository.create({nome,email,cpf,sexo})
        await this.clientsRepository.save(client)
        return client
    }

    public async save(client:Clients):Promise<Clients>{
        return this.clientsRepository.save(client)
    }

    public async findById(id:string):Promise<Clients | undefined>{
        const client = this.clientsRepository.findOne(id)
        return client
    }

    public async findAll():Promise<Clients[]>{
        const clients = this.clientsRepository.find()
        return clients
    }

    public async deleteById(id:string):Promise<Clients | undefined>{
        const client = await this.clientsRepository.findOne(id)
       
        if(client){
            await this.clientsRepository.delete({id:client.id})
        }

        return client
    }
}