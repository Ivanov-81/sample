import React, { ReactElement, useState, useEffect } from 'react'
import { History } from "history";
import models from '../../js/models';
import { InputPhone } from '../CustomInput';
import ButtonBlock from '../ButtonBlock';
import AboutModal from '../modals/AboutModal';
import {
    FURTHER, INVALID_PHONE_NUMBER, YOUR_PHONE, HEADER_PHONE, WELCOME, PASSWORD_RECOVERY,
    DARK_GREEN_COLOR, PHONE_REGISTERED_1, PHONE_REGISTERED_2, NOT_REGISTERED, CHECK_NUMBER, FORGOT_YOUR_PASS, 
    SET_PASSWORD, REPEAT_CODE, REGISTER, SEND_CODE, COME_IN, NOT_REGISTERED_YET, DEFAULT, ALREADY_REGISTERED, NO_PASSWORD, FORGOT_PASSWORD, CHECK_PHONE, REGISTRATION
} from '../../constants';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { sendSms, checkWithoutPassword, resetPassword,  } from '../common/promises';

interface Props {
    branch: string,
    next: (e: React.SetStateAction<string>) => void,
    theme: Theme,
    setTimer: (e: React.SetStateAction<number>) => void,
    variant: string,
    setVariant: (e: React.SetStateAction<string>) => void,
    history: History
}

const useStyles = makeStyles(() => createStyles({
    header: {
        margin: '0',
        fontSize: '22px'
    },
    caption: {
        fontWeight: 300,
        fontSize: '14px',
        textAlign: 'center',
        marginTop: '6px',
        maxWidth: '330px',
    },
    imageUp: {
        position: 'absolute',
        top: '-124px',
        width: '300px',
        left: 'calc(50% - 150px)'
    },
    imageIn: {
        position: 'absolute',
        top: '-136px',
        width: '300px',
        left: 'calc(50% - 150px)'
    },
    agreement: {
        marginTop: '14px',
        maxWidth: '330px',
        textAlign: 'center',
        fontSize: '11px',
        fontWeight: 300,
        color: '#000000',
    },
    span: {
        cursor: 'pointer',
        textDecoration: 'none',
        color: DARK_GREEN_COLOR
    }
}));

function Phone({branch, next, theme, setTimer, variant, setVariant, history}: Props): ReactElement {

    const classes = useStyles();
    const [phone, setPhone] = useState('');
    const [error, setError] = useState(false);
    const [helper, setHelper] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [canChangePass, setCanChangePass] = useState(false);
    const code = models.getLS().code;

    const handleClick = () => {
        // default registration path
        if ((branch === 'signup' && variant === DEFAULT) || variant === CHECK_PHONE) {
            registerSendSms();
        // default authorization
        } else if ((branch === 'signin' && variant === DEFAULT)) {
            checkWithoutPassword('+7' + phone).then(response => {
                models.saveLS('phone', '+7' + phone, models.getLS());
                if (response.success) {
                    if (response.status) {
                        // without password
                        registerSendSms();
                    } else {
                        // with password
                        next('pass');
                        setVariant('');
                    }
                } else {
                    setError(true);
                    setHelper(response.errorMessage);
                }
            });
        } else if (variant === NOT_REGISTERED_YET) {
            history.push('/signup');
        } else if (variant === ALREADY_REGISTERED) {
            history.push('/signin');
        } else if (variant === FORGOT_PASSWORD) {
            registerSendSms();
        }
    }
    
    const registerSendSms = () => {
        sendSms('+7' + phone).then(response => {
            console.log(response);
            if (response.success) {
                models.saveLS('phone', '+7' + phone, models.getLS());
                next('code');
                if (branch === 'signup') {
                    setVariant(REGISTRATION);
                } else if (branch === 'signin' && variant !== FORGOT_PASSWORD) {
                    setVariant(NO_PASSWORD);
                }
                setTimer(response.timeout);
            } else {
                setError(true);
                setHelper(response.errorMessage);
            }
        });
    }

    useEffect(() => {
        const LS = models.getLS();
        if (LS.phone) {
            setPhone(LS.phone.slice(2));
            checkPassword(LS.phone);
        }
    }, [])

    useEffect(() => {
        if (phone === '' || phone.length === 10) {
            setError(false);
            setHelper('');
        } else {
            setError(true);
            setHelper(INVALID_PHONE_NUMBER);
        }
    }, [phone])

    const checkPassword = (phone: string) => {
        checkWithoutPassword(phone).then(response => {
            if (!response.status) {
                setCanChangePass(true);
            } else {
                setCanChangePass(false);
            }
        });
    }

    const redirectPass = () => {
        resetPassword('+7' + phone, code).then(response => {
            if (response.success) {
                next('pass');
                setVariant(FORGOT_PASSWORD);
            } else {
                setError(true);
                setHelper(response.errorMessage);
            }
        });
    }
    
    let header: string = '';
    let buttonText: string = '';

    switch (variant) {
        case DEFAULT:
            header = branch === 'signup' ? YOUR_PHONE : WELCOME;
            buttonText = FURTHER;
            break;
        case ALREADY_REGISTERED:
            header = PHONE_REGISTERED_1;
            buttonText = COME_IN;
            break;
        case NOT_REGISTERED_YET:
            header = NOT_REGISTERED;
            buttonText = REGISTER;
            break;
        case CHECK_PHONE:
            header = CHECK_NUMBER;
            buttonText = REPEAT_CODE;
            break;
        case FORGOT_PASSWORD:
            header = FORGOT_YOUR_PASS;
            buttonText = SEND_CODE;
            break;
        default:
            header = '';
            break;
    }

    return (
        <>
            {branch === 'signup' && variant === DEFAULT && 
                <img className={classes.imageUp} src="/static/images/main-image-registration.svg" alt="phone"/>}
            {branch === 'signin' && variant === DEFAULT && 
                <img className={classes.imageIn} src="/static/images/main-image-welcome.svg" alt="phone"/>}

            <h2 className={classes.header}>{header}</h2>
            {variant === ALREADY_REGISTERED && <h2 className={classes.header}>{PHONE_REGISTERED_2}</h2>}


            {branch === 'signup' && variant === DEFAULT && <div className={classes.caption}>{HEADER_PHONE}</div>}
            {variant === FORGOT_PASSWORD && <div className={classes.caption}>{PASSWORD_RECOVERY}</div>}


            <InputPhone
                value={phone}
                error={error}
                helper={helper}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value.replace(/[^\d]/g, ''))}
                theme={theme}
                disabled={false}
            />

            <ButtonBlock
                leftText={(variant === ALREADY_REGISTERED && canChangePass) ? FORGOT_YOUR_PASS : ''}
                leftClick={redirectPass}
                rightText={buttonText}
                rightClick={handleClick}
                disabled={phone.length < 10}
            />

            {(branch === 'signup') &&  (variant === DEFAULT) && <div className={classes.agreement}>
                Используя приложение, вы принимаете условия в
                <span className={classes.span} onClick={() => setOpenModal(!openModal)}> соглашениях </span>
                и соглашаетесь на получение рекламно-информационных сообщений
            </div>}

            {(branch === 'signup') &&  (variant === DEFAULT) && <AboutModal
                open={openModal}
                handleModal={() => setOpenModal(!openModal)}
            />}
        </>
    )
}

export default Phone
