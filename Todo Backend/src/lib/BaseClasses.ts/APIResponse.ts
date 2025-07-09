
class APIResponse<T> {
    message: string;
    statusCode: number;
    data: T;
    status:string
    constructor(message: string, data: T, statusCode = 200) {
        this.message = message;
        this.statusCode = statusCode;
        this.data = data
        this.status="success";
    }
}

export default APIResponse






