export interface User {
    username: string;
    password: string;
}

export const dummyUsers: User[] = [
    { username: 'admin', password: 'admin123' },
    { username: 'user', password: 'user123' },
];
