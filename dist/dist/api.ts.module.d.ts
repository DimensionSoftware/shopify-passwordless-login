declare var e: (r: any) => {
    social: (n: any) => string;
    passwordless: (e: any) => Promise<any>;
};
export { e as login };
