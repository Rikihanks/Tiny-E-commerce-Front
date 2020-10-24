export interface Role {
    id: number;
    name: string;
}

export interface UserLoggedIn {

    id: number;

	username: string;
	
	surname: string;

	dni: string;

	roles: Role [];

    email: string;
}