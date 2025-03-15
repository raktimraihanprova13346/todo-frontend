export interface User {
    username: string;
    emailAddress: string;
    updatedAt: Date;
    createdAt: Date;
    loggedIn: boolean;
    accessToken: string;
}