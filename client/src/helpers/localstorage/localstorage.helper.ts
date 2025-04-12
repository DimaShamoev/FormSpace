export function getToken(): string {
    const data = localStorage.getItem('token');
    const token = data ? JSON.parse(data) : ''

    return token
}

export function setToken(key: string, token: string): void {
    localStorage.setItem(key, JSON.stringify(token))
}

export function removeToken(key: string): void {
    localStorage.removeItem(key)
}