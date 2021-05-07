import React, { ReactElement, useState, useEffect } from 'react';
import { History } from "history";
import models from '../../js/models';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { InputPassword } from '../CustomInput';
import ButtonBlock from '../ButtonBlock';
import { YOUR_PASSWORD, FURTHER, ENTER_PASSWORD, PASSWORD, REPEAT_PASSWORD, 
    SKIP, DO_NOT_MATCH, PASSWORD_EIGHT_SIMBOLS, FORGOT_YOUR_PASS, FORGOT_PASSWORD, NEW_PASSWORD, CHANGE_LANGUAGE, EASY_AUTH } from '../../constants';
import { signUpWithoutPassword, authWithPassword, signUpWithPassword, setNewPassword, setCustomPassword } from '../common/promises';

interface Props {
    branch: string,
    next: (e: React.SetStateAction<string>) => void | undefined,
    theme: Theme,
    variant: string,
    setVariant: (e: React.SetStateAction<string>) => void | undefined,
    history: History
}

const useStyles = makeStyles(() => createStyles({
    header: {
        margin: '0',
    },
    caption: {
        fontWeight: 300,
        fontSize: '14px',
        textAlign: 'center',
        marginTop: '6px',
        maxWidth: '330px',
    },
    image: {
        position: 'absolute',
        top: '-90px',
        width: '300px',
        left: 'calc(50% - 150px)'
    }
}));

function Password({branch, next, theme, variant, setVariant, history}: Props): ReactElement {

    const classes = useStyles();
    const [pass1, setPass1] = useState('');
    const [pass2, setPass2] = useState('');
    const [error1, setError1] = useState(false);
    const [error2, setError2] = useState(false);
    const [helper1, setHelper1] = useState('');
    const [helper2, setHelper2] = useState('');

    const name = models.getLS().name;
    const phone = models.getLS().phone;

    useEffect(() => {
        if (pass1 !== '' && /[А-Яа-я]/.test(pass1)) {
            setError1(true);
            setHelper1(CHANGE_LANGUAGE);
            return;
        }

        if (pass1.length < 8 && pass1 !== '') {
            setError1(true);
            setHelper1(PASSWORD_EIGHT_SIMBOLS);
        } else {
            setError1(false);
            setHelper1('');
        }


        if (variant !== '') {
            if (pass2 !== '' && /[А-Яа-я]/.test(pass2)) {
                setError2(true);
                setHelper2(CHANGE_LANGUAGE);
                return;
            }
            if (pass2.length < 8 && pass2 !== '') {
                setError2(true);
                setHelper2(PASSWORD_EIGHT_SIMBOLS);
            } else {
                setError2(false);
                setHelper2('');
            }

            if (pass1 !== pass2) {
                setError2(true);
                setHelper2(DO_NOT_MATCH);
            } else {
                setError2(false);
                setHelper2('');
            }

            if (pass1 === pass2 && pass1.length > 7 && pass2.length > 7) {
                setError1(false);
                setHelper1('');
                setError2(false);
                setHelper2('');
            } 
        }
    }, [pass1, pass2])

    const skipPass = () => {
        next('skip');
    }
    
    const forgotPass = () => {
        next('phone');
        setVariant(FORGOT_PASSWORD);
    }

    const redirectCompanies = () => {
        history.push('/companies');
    }

    const getLeftBtnText = (): string => {
        if (branch === 'signin' && variant === '') 
            return FORGOT_YOUR_PASS;
        else if (variant === 'skip') 
            return SKIP;
        else 
            return '';
    }

    const getLeftEvent = () => {
        if (branch === 'signin' && variant === '') 
            return forgotPass;
        else if (branch === 'new_pass') 
            return skipPass;
        else 
            return () => {};
    }

    const handleClick = () => {
        if (branch === 'new_pass') {
            const token = models.getCookie('Authorization') || '';
            setCustomPassword(token, pass1).then(response => {
                if (response.success) {
                    next('success');
                } else {
                    setError1(true);
                    setHelper1(response.errorMessage);
                }
            });
        } else if (branch === 'signin' && variant === '') {
            auth();
        } else if (variant === FORGOT_PASSWORD) {
            setNewPassword(phone, pass1).then(response => {
                if (response.success) {
                    auth();
                } else {
                    setError1(true);
                    setHelper1(response.errorMessage);
                }
            });
        }
    }

    const auth = () => {
        authWithPassword(phone, pass1).then(response => {
            if (response.success) {
                models.setJWT(response.token);
                redirectCompanies();
            } else {
                setError1(true);
                setHelper1(response.errorMessage);
            }
        });
    }
    
    const getDisabled = (): boolean => {
        if (variant === '') {
            return pass1.length < 8;
        } else {
            return pass1.length < 8 || pass2.length < 8 || pass1 !== pass2;
        }
    }
    

    return (
        <>
            <img className={classes.image} src="/static/images/main-image-keys.svg" alt="keys"/>
            <h2 className={classes.header}>{variant === '' ?  YOUR_PASSWORD : NEW_PASSWORD}</h2>
            
            {branch === 'new_pass' && <div className={classes.caption}>{EASY_AUTH}</div>}

            
            <InputPassword
                value={pass1}
                error={error1}
                helper={helper1}
                placeholder={variant !== '' ? PASSWORD : ENTER_PASSWORD}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPass1(e.target.value.trim())}
                theme={theme}
            />

            {variant !== '' && <InputPassword
                value={pass2}
                error={error2}
                helper={helper2}
                placeholder={REPEAT_PASSWORD}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPass2(e.target.value.trim())}
                theme={theme}
            />}


            <ButtonBlock
                leftText={getLeftBtnText()}
                leftClick={getLeftEvent()}
                rightText={FURTHER}
                rightClick={handleClick}
                disabled={getDisabled()}
            />
        </>
    )
}

export default Password
