

export interface LOGIN {
    id?: number
    user: string
    password: string
    createdAt: Date
}

export interface AuthChecker{
    user: string
    password: string
}

