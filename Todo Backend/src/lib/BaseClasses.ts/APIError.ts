class APIError {
    message: string;
    statusCode: number;
    status:string
    
    constructor(message: string, statusCode = 400) {
        this.message = message;
        this.statusCode = statusCode;
        this.status="failed";
    
    }
}

export default APIError
