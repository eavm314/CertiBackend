export interface UserResponseDto {
    id: string;
    username: string;
    email: string;
    lastLogin: Date | null;
    roleId: string;
    token?: string;

}