import axios from "axios";
import {
    EN_ACCOUNT_REGISTERED, EN_THE_NUMBER_IS_BLOCKED, EN_SMS_TIME,
    TIMER_SMS, ACCOUNT_REGISTERED, THE_NUMBER_IS_BLOCKED, INVALID_PHONE_NUMBER,
    EN_ENDED_UP_TRYING, EN_INCORRECT_CODE, EN_DOES_NOT_EXIST, EN_CODE_IS_OVER,
    INCORRECT_CODE, ENDED_UP_TRYING, ALREADY_REGISTERED,
    CODE_IS_OVER, ERROR_PHONE_OR_CODE, ACCOUNT_NOT_VERIFIED, DOES_NOT_EXIST, EN_ACCOUNT_NOT_VERIFIED, VERSION,
} from "../../constants";

interface ResponseTimeout {
    success: boolean,
    errorMessage: string,
    timeout: number,
}

export const sendSms = async (phone: string) => {
    let result: ResponseTimeout = {
        success: false,
        errorMessage: '',
        timeout: TIMER_SMS,
    }

    await axios.post(`/api${VERSION}/users/anonymous/`, {
        phone: phone
    })
        .then(res => {
            const { status } = res;
            console.log(res);
            if (status === 201) {
                result.success = true;
            }
        })
        .catch(error => {
            const { status, data } = error.response;

            if (status === 400) {
                switch (data.text) {
                    case EN_ACCOUNT_REGISTERED:
                        result.errorMessage = ACCOUNT_REGISTERED;
                        break;
                    case EN_THE_NUMBER_IS_BLOCKED:
                        result.errorMessage = THE_NUMBER_IS_BLOCKED;
                        break;
                    case EN_SMS_TIME:
                        result.success = true;
                        result.timeout = data.timeout;
                        break;
                    default:
                        result.errorMessage = INVALID_PHONE_NUMBER;
                        break;
                }
            }
        });

    return result;
}

interface Response {
    success: boolean,
    errorMessage: string,
    status: string | boolean
}

export const confirmCode = async (phone: string, code: string) => {
    let result: Response = {
        success: false,
        errorMessage: '',
        status: ''
    }

    await axios.put(`/api${VERSION}/users/anonymous/`, {
        phone: phone,
        code: code
    })
        .then(res => {
            const { status } = res;

            if (status === 200) {
                result.success = true;
            }
        })
        .catch(error => {
            const { status, data } = error.response;
            if (status === 409) {
                result.status = ALREADY_REGISTERED;
            }
            else if (status === 400) {
                switch (data) {
                    case EN_INCORRECT_CODE:
                        result.errorMessage = INCORRECT_CODE;
                        break;
                    case EN_ENDED_UP_TRYING:
                        result.errorMessage = ENDED_UP_TRYING;
                        break;
                    case EN_DOES_NOT_EXIST:
                        result.errorMessage = DOES_NOT_EXIST;
                        break;
                    case EN_THE_NUMBER_IS_BLOCKED:
                        result.errorMessage = THE_NUMBER_IS_BLOCKED;
                        break;
                    case EN_CODE_IS_OVER:
                        result.errorMessage = CODE_IS_OVER;
                        break;
                    default:
                        result.errorMessage = ERROR_PHONE_OR_CODE;
                        break;
                }
            } else {
                console.log(error.response);
            }
        });

    return result;
}


export const checkWithoutPassword = async (phone: string) => {
    let result: Response = {
        success: false,
        errorMessage: '',
        status: false
    }

    await axios.get(`/api${VERSION}/users/sign_in/without_password`, {
        params: {
            phone: phone
        }
    })
        .then(res => {
            const { status } = res;

            if (status === 200) {
                result.success = true;
                result.status = true;
            }
        })
        .catch(error => {
            const { status } = error.response;
            if (status === 404) {
                result.success = true;
                result.status = false;
            } else if (status === 400) {
                result.errorMessage = INVALID_PHONE_NUMBER;
            } else {
                console.log(error.response);
            }
        });

    return result;
}


interface ResponseToken {
    success: boolean,
    errorMessage: string,
    token: string
}

export const authWithPassword = async (phone: string, pass: string) => {
    let result: ResponseToken = {
        success: false,
        errorMessage: '',
        token: ''
    }

    await axios.post(`/api${VERSION}/token/`, {
        phone: phone,
        password: pass,
    })
        .then(res => {
            const { status, data } = res;
            if (status === 200) {
                result.success = true;
                result.token = data.access;
            }
        })
        .catch(error => {
            const { status } = error.response;
            if (status === 401) {
                result.success = false;
                result.errorMessage = ACCOUNT_NOT_VERIFIED;
            }
            console.log(error.response);
        });

    return result;
}

export const authWithoutPassword = async (phone: string, code: string) => {
    let result: ResponseToken = {
        success: false,
        errorMessage: '',
        token: ''
    }

    await axios.post(`/api${VERSION}/users/sign_in/without_password`, {
        phone: phone,
        code: code,
    })
        .then(res => {
            const { status, data } = res;
            if (status === 200) {
                result.success = true;
                result.token = data.access;
            }
        })
        .catch(error => {
            const { status, data } = error.response;
            if (status === 400) {
                switch (data) {
                    case EN_INCORRECT_CODE:
                        result.errorMessage = INCORRECT_CODE;
                        break;
                    case EN_ENDED_UP_TRYING:
                        result.errorMessage = ENDED_UP_TRYING;
                        break;
                    case EN_THE_NUMBER_IS_BLOCKED:
                        result.errorMessage = THE_NUMBER_IS_BLOCKED;
                        break;
                    case EN_CODE_IS_OVER:
                        result.errorMessage = CODE_IS_OVER;
                        break;
                    default:
                        result.errorMessage = ERROR_PHONE_OR_CODE;
                        break;
                }
            } else if (status === 401) {
                result.errorMessage = ERROR_PHONE_OR_CODE;
            } else {
                console.log(error.response);
            }
        });

    return result;
}

interface ResponsePassword {
    success: boolean,
    errorMessage: string,
    pass: string
}

export const signUpWithoutPassword = async (name: string, phone: string) => {
    let result: ResponsePassword = {
        success: false,
        errorMessage: '',
        pass: ''
    }

    await axios.post(`/api${VERSION}/users/signup/`, {
        name: name,
        phone: phone
    })
        .then(res => {
            const { status, data } = res;
            if (status === 201) { 
                result.success = true;
                result.pass = data.password
            }
        })
        .catch(error => {
            const {status, data} = error.response;
            if(error.response !== undefined) {
                if (status === 400) {
                    result.errorMessage = ACCOUNT_NOT_VERIFIED;
                } else if (status === 404) {
                    result.errorMessage = DOES_NOT_EXIST;
                }
            }
            else {
                console.error(error);
            }
        });

    return result;
}

export const signUpWithPassword = async (name: string, phone: string, pass: string) => {
    let result: ResponsePassword = {
        success: false,
        errorMessage: '',
        pass: pass
    }

    await axios.post(`/api${VERSION}/users/signup/`, {
        name: name,
        phone: phone,
        password1: pass,
        password2: pass
    })
        .then(res => {
            const { status } = res;
            if (status === 201) { 
                result.success = true;
            }
        })
        .catch(error => {
            const { status } = error.response;
            if(error.response !== undefined) {
                if (status === 400) {
                    result.errorMessage = ACCOUNT_NOT_VERIFIED;
                } else if (status === 404) {
                    result.errorMessage = DOES_NOT_EXIST;
                }
            }
            else {
                console.error(error);
            }
        });

    return result;
}

export const resetPassword = async (phone: string, code: string) => {
    let result: Response = {
        success: false,
        errorMessage: '',
        status: true 
    }

    await axios.get(`/api${VERSION}/users/current/reset_password/`, {
        params: {
            phone: phone,
            code: code
        }
    })
        .then(res => {
            const { status } = res;

            if (status === 200) {
                result.success = true
            }
        })
        .catch(error => {
            
            if (error.response) {
                
                const { status, data } = error.response;

                if (status === 400) {
                    switch (data) {
                        case EN_CODE_IS_OVER:
                            result.errorMessage = CODE_IS_OVER;
                            break;
                        case EN_INCORRECT_CODE:
                            result.errorMessage = INCORRECT_CODE;
                            break;
                        case EN_ENDED_UP_TRYING:
                            result.errorMessage = ENDED_UP_TRYING;
                            break;
                        default:
                            result.errorMessage = INCORRECT_CODE;
                            break;
                    }
                }
            } else {
                console.log(error);
            }

        });

    return result;
}

export const setNewPassword = async (phone: string, pass: string) => {
    let result: Response = {
        success: false,
        errorMessage: '',
        status: true 
    }

    await axios.put(`/api${VERSION}/users/current/reset_password/`, {
        phone: phone,
        password1: pass,
        password2: pass,
    })
        .then(res => {
            const { status } = res;
            if (status === 200) {
                result.success = true;
            }
        })
        .catch(error => {

            const { status } = error.response;
            if (error.response !== undefined) {
                if (status === 400) {
                    result.errorMessage = ACCOUNT_NOT_VERIFIED;
                } else if (status === 404) {
                    result.errorMessage = DOES_NOT_EXIST;
                }
            } else {
                console.error(error);
            }

        });

    return result;
}

export const setCustomPassword = async (auth: string, pass: string) => {
    let result: Response = {
        success: false,
        errorMessage: '',
        status: true 
    }

    await axios.post(`/api${VERSION}/users/current/custom_password`, 
        {
            password: pass
        }, {
        headers: {
            Authorization: 'Bearer ' + auth
        }
    })
        .then(res => {
            const { status } = res;
            if (status === 201) { 
                result.success = true;
            }
        })
        .catch(error => {
            const { status } = error.response;
            if(error.response !== undefined) {
                if (status === 401) {
                    result.errorMessage = "Ошибка авторизации";
                }
            }
            else {
                console.error(error);
            }
        });
        
    return result;
}

