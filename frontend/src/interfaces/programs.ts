export interface Condition {
    to?: number,
    from?: number,
    step?: number,
    cashback?: number,
}

export interface LoyaltyData {
    goal?: number,
    points?: number,
    cashback?: number, 
}

export interface Program {
    name: string,
    description: string,
    type: {
        name: string,
    },
    is_main: boolean,
    conditions: null | Condition,
    counter_state: null | LoyaltyData,
}