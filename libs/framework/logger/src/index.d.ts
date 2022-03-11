declare const Logger: {
    info(message: any, correlationId?: string): void;
    debug(message: any, correlationId?: string): void;
    warn(message: any, correlationId?: string): void;
    error(message: any, correlationId?: string): void;
    stream: {
        write(message: string): void;
    };
};
export default Logger;
