export interface ResponseLogin {
    logged?: boolean,
    username?: string,
    token?: string,
    roles?: string[],
    error?: string
}