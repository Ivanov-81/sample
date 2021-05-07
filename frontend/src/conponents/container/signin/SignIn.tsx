import React, { ReactElement, useState } from 'react';

import { History } from "history";
import { GREEN_COLOR, PRIMARY_COLOR, ERROR_COLOR, TIMER_SMS, DEFAULT, FORGOT_PASSWORD, SHADOW_MODAL } from '../../constants';
import Phone from '../../components/entry/Phone';
import Code from '../../components/entry/Code';
import Password from '../../components/entry/Password';

import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import IconButton from '@material-ui/core/IconButton';
import Modal from '@material-ui/core/Modal';
import { makeStyles, createStyles, createMuiTheme } from '@material-ui/core/styles';

interface Props {
    history: History
}

const useStyles = makeStyles(() => createStyles({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    paper: {
        position: 'relative',
        backgroundColor: '#FFFFFF',
        borderRadius: '14px',
        boxShadow: SHADOW_MODAL,
        padding: '24px',
        margin: '16px',
        outline: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: 'Roboto, sans-serif',
        textAlign: 'center',
    },
    background: {
        display: 'block',
        margin: '0 auto',
        maxWidth: '575px',
        width: '100%',
    },
    back: {
        position: 'fixed',
        left: '4px',
        top: '4px',
        color: '#FFFFFF'
    }
}));

const theme = createMuiTheme({
    palette: {
        primary: { main: PRIMARY_COLOR },
        error: { main: ERROR_COLOR }
    },
});

function SignIn({ history }: Props): ReactElement {
    const classes = useStyles();
    const [stage, setStage] = useState('phone');
    const [variant, setVariant] = useState(DEFAULT);
    const [timerOut, setTimerOut] = useState(TIMER_SMS);

    const redirectBack = () => {
        switch (stage) {
            case 'phone':
                switch (variant) {
                    case DEFAULT: 
                        history.push('/');
                        break;
                    case FORGOT_PASSWORD:
                        setStage('pass');
                        setVariant('');
                        break;
                    default:
                        setVariant(DEFAULT);
                        break;
                }
                break;
            case 'code': 
                switch (variant) {
                    case FORGOT_PASSWORD:
                        setStage('phone');
                        break;
                    default:
                        break;
                }
            default:
                setStage('phone');
                setVariant(DEFAULT);
                break;
        }
    }

    return (
        <>
            <img className={classes.background} src="/static/images/entry-bg.png" alt="bg"/>
            <Modal
                className={classes.modal}
                open={true}
            >
                <div className={classes.paper}>
                    <IconButton className={classes.back} onClick={redirectBack}>
                        <ArrowBackRoundedIcon />
                    </IconButton>
                    
                    {stage === 'phone' && 
                        <Phone
                            branch="signin"
                            next={setStage}
                            theme={theme}
                            setTimer={setTimerOut}
                            variant={variant}
                            setVariant={setVariant}
                            history={history}
                        />}

                    {stage === 'code' &&
                        <Code
                            next={setStage}
                            theme={theme}
                            timerOut={timerOut}
                            variant={variant}
                            setVariant={setVariant}
                            history={history}
                        />}

                    {stage === 'pass' && 
                        <Password
                            branch="signin"
                            next={setStage}
                            theme={theme}
                            variant={variant}
                            setVariant={setVariant}
                            history={history}
                        />}

                </div>

            </Modal>
        </>
    )
}

export default SignIn
