import {
    ADD_PHONE,
    ADD_CODE,
    ADD_NAME,
    ADD_PASSWORD,
    CHANGE_IS_ACTIVE,
    ADD_QR_CODE,
    CHANGE_BRANCH,
    ADD_LEVEL,
    ADD_ALIAS,
    ADD_NAME_USER,
    ADD_DESCRIPTION,
    ADD_REGION,
    ADD_COMPANIES,
    GET_COMPANY,
    GET_POINTS,
    RECORD_USER,
    GET_LOYALTY,
    ADD_EVENT,
} from "../constants";

export const addName = ( name ) => ({
    type : ADD_NAME,
    name
});

export const addPhone = ( phone ) => ({
    type : ADD_PHONE,
    phone
});

export const addCode = ( code ) => ({
    type : ADD_CODE,
    code
});

export const addPassword = ( password ) => ({
    type : ADD_PASSWORD,
    password
});

export const addQrCode = ( qr_code ) => ({
    type : ADD_QR_CODE,
    qr_code
});

export const changeActive = ( is_active ) => ({
    type : CHANGE_IS_ACTIVE,
    is_active
});

export const changeBranch = ( branch ) => ({
    type : CHANGE_BRANCH,
    branch
});

export const addLevel = ( level ) => ({
    type : ADD_LEVEL,
    level
});

export const recordUser = ( user ) => ({
    type : RECORD_USER,
    user
});

export const addNameUser = ( name ) => ({
    type : ADD_NAME_USER,
    name
});

export const addAlias = ( alias ) => ({
    type : ADD_ALIAS,
    alias
});

export const addDescription = ( description ) => ({
    type : ADD_DESCRIPTION,
    description
});

export const addRegion = ( region ) => ({
    type : ADD_REGION,
    region
});

export const addCompanies = ( companies ) => ({
    type : ADD_COMPANIES,
    companies
});

export const getCompany = ( company ) => ({
    type : GET_COMPANY,
    company
});

export const addEvent = ( event ) => ({
    type : ADD_EVENT,
    event
});
