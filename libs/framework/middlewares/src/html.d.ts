import { Response, NextFunction } from "express";
export declare const htmlMiddleware: (htmlFileName?: string) => (req: any, res: Response<any>, next: NextFunction) => void;
