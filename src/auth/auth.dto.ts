export interface LoginDto {
    userName: string;
    password: string;
}

export interface RegisterDTO {
    userName: string;
    password: string;
    address: {
        city: string;
        street: string;
        apartment?: string;
    };
}
