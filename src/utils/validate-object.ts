import * as Joi from 'joi';
import { Request } from 'express';
export declare function transfromRequest(req: Request, value: {
    body: Record<string, any>;
    query: Record<string, any>;
    params: Record<string, any>;
}): void;
export declare function validateObject(objectToValidate: any, joiSchema: Joi.ObjectSchema<any>, options?: Joi.ValidationOptions): any;
