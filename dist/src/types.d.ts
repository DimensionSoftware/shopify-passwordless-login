export declare type SocialParams = 'google' | 'facebook' | 'twitter' | 'linkedin';
export interface PasswordlessUserParams {
    email: string;
}
export interface PasswordlessParams extends PasswordlessUserParams {
    native: number;
    code: string;
}
export interface Login {
    social: (socialParams: SocialParams) => string;
    passwordless: (userParams: PasswordlessUserParams) => Promise<void>;
}
