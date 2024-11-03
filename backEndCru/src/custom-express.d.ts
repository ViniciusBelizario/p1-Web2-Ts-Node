import { Request } from 'express';

declare module 'express' {
    export interface Request {
        user?: any; // Ajuste o tipo conforme necessário
    }
}
