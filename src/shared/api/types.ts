export interface TokenPair {
    access_token: string;
    refresh_token: string;
}

export interface Session {
    id: string;
    email: string;
}

export interface Profile {
    id: string
    bitcoin_address: string
    email: string
    password: string
    display_name: string
    bio: string
    avatar: string
    country: string
    city: string
    currency: string
    created_at: string
    updated_at: string
}

