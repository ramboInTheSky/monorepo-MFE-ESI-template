import { Response, NextFunction } from "express";
export declare const siteurlMiddleware: (token: string, defaultURL?: string) => (req: any, _res: Response<any>, next: NextFunction) => void;
