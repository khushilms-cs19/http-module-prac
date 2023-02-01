const Joi = require('joi');
const { InvalidInputError } = require('../utils/errors');
/**
 * @param {Request} req 
 * @param {Response} res 
 * @param {import("express").NextFunction} next 
 */
const bodyValidation = (req, res, next)=>{
  try{
    const schema = Joi.object({
      title: Joi.string().min(3).max(40),
    });
    const {body} = req;
    const {error} = schema.validate(body);
    if(error){
      throw new InvalidInputError(error.message, 400);
    }
    next();
  }catch(err){
    if(err instanceof InvalidInputError){
      res.status(err.code).json({message: err.message});
    }else{
      res.status(500).json({message: 'Something went wrong.'});
    }
  }
};

module.exports = {
  bodyValidation,
};