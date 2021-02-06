export class User {
    userUUId: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    token: string;

    constructor(userUUId: string, password: string, firstName: string, lastName: string, email: string, token: string) {
        this.userUUId = null;
        this.firstName = null;
        this.lastName = null;
        this.email = null;
        this.password = null;
        this.token = null;
    }
}
