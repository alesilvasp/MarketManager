declare class AppError {
    readonly message: string;
    readonly statusCode: number;
    constructor(message: any, statusCode: number);
}
export default AppError;
