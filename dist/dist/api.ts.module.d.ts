declare var o: (t: any) => {
    social: (n: any) => string;
    passwordless: (o: any) => Promise<any>;
};
export { o as login };
