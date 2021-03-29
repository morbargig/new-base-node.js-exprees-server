export class ApplicationError extends Error {
    status: number;

    constructor(message: string, status: number) {
        super();

        Error.captureStackTrace(this, this.constructor);
        this.message = message || 'Error: Undefined Application Error';
        this.status = status || 500;
    }
}

export class ServerError extends ApplicationError {
    constructor(message?: string, status?: number) {
        super(message || 'Internal Server Error', status || 500);
    }
}

export class UserError extends ApplicationError {
    constructor(message?: string, status?: number) {
        super(message || 'User Error', status || 400);
    }
}

export class UserNotFoundError extends UserError {
    constructor() {
        super('User not found', 404);
    }
}

export class InValidPassword extends UserError {
    constructor() {
        super('Wrong Password', 400);
    }
}

export class ValidationError extends UserError {
    constructor(message = 'Validation error') {
        super(message, 400);
    }
}