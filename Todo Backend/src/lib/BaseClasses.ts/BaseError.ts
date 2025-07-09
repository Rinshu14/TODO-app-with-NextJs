class BaseError extends Error {
    
    name: string;
    statusCode: number;

    constructor(name: string = "BaseError", statusCode: number = 500, message: string) {
        super(message)
        this.name = name;
        this.statusCode=statusCode;
        
    }

}