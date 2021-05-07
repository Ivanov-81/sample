import React, { ReactElement, useState } from 'react';
import { History } from "history";
import { PRIMARY_COLOR, ERROR_COLOR, TIMER_SMS, DEFAULT, SHADOW_MODAL } from '../../constants';
import Name from '../../components/entry/Name';
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

function SignUp({ history }: Props): ReactElement {
    
    const classes = useStyles();
    const [variant, setVariant] = useState(DEFAULT);
    const [timerOut, setTimerOut] = useState(TIMER_SMS);

    const LS = localStorage.getItem('loyaltyWeb');
    const showName = JSON.parse(LS !== null ? LS : '').guid === undefined;

    const [stage, setStage] = useState(showName ? 'name' : 'phone');

    const redirectBack = () => {
        switch (stage) {
            case 'name':
                history.push('/');
                break;
            case 'phone':
                switch (variant) {
                    case DEFAULT:
                        setStage('name');
                        break;
                    default:
                        setVariant(DEFAULT);
                        break;
                }
                break;
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
                    {stage === 'name' && 
                        <Name
                            next={setStage}
                            theme={theme}
                            variant={variant}
                            setVariant={setVariant}
                        />}

                    {stage === 'phone' &&
                        <Phone
                            branch="signup"
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
                            branch="signup"
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

export default SignUp