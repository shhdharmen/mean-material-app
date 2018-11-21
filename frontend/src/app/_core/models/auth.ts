export interface IAuthResult {
    idToken: string;
    expiresIn: number;
    user: { id: number, username: string, firstName: string, lastName: string };
}
