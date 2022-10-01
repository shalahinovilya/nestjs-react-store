export const AVAILABLE_ROLES = [
    'user',
    'admin'
]

export const DELIVERY_TYPES = [
    'pickup',
    'courier',
]

export const EMAIL_REG = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g
export const PHONE_REG = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/