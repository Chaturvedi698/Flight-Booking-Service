// const { response } = require('express');
const { StatusCodes } = require('http-status-codes');
const { Logger} = require('../config');
const AppError = require('../utils/errors/app-error');

class CrudRepository{
    constructor(model){
        // console.log(model);
        this.model = model;
    }

    async create(data){
     
            // console.log(data);
                const response = await this.model.create(data);
                // console.log("rsponse is ",response)
                return response;
            
    }

    async destroy(data){
    
           const response = await this.model.destroy({
            where : {
                id : data
            }
        });
        if(!response){
            throw new AppError('Not able to find the resources',StatusCodes.NOT_FOUND)
         }
        return response;

    }
    async get(data){
            const response = await this.model.findByPk(data);
         if(!response){
            throw new AppError('Not able to find the resources',StatusCodes.NOT_FOUND)
         }
            return response;
    
    }
    async getALL(){
            const response = await this.model.findAll();
            return response;
      
    }
    async update(data,id){ 
        const response = await this.model.findByPk(id);
     if(!response){
        throw new AppError('Not able to find the resources',StatusCodes.NOT_FOUND)
     }
            const responses = await this.model.update(data,{
                where : {
                    id : id
                }
            });
            return responses;
    }


}

module.exports = CrudRepository;


