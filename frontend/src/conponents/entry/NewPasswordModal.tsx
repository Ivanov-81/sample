import React, { ReactElement, useState, useEffect } from 'react'
import { History } from "history";
import SuccessModal from '../settings/SuccessModal';
import Password from './Password';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles, createMuiTheme, createStyles } from '@material-ui/core/styles';
import { PRIMARY_COLOR, ERROR_COLOR, SHADOW_MODAL } from '../../constants';

interface Props {
    open: boolean,
    skipable: boolean,
    history: History,
    close: () => void
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
        top: '-124px',
        width: '300px',
        left: 'calc(50% - 150px)'
    },
}));

const theme = createMuiTheme({
    palette: {
        primary: { main: PRIMARY_COLOR },
        error: { main: ERROR_COLOR }
    },
});

function NewPasswordModal({ skipable, open, close, history }: Props): ReactElement {
    const classes = useStyles();

    const [stage, setStage] = useState('')

    useEffect(() => {
        if (stage === 'success') {
            setTimeout(() => {
                close();
            }, 2500);
        } else if (stage === 'skip') {
            close();
        }
    }, [stage])

    return (
        <Modal
            className={classes.modal}
            open={open}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <React.Fragment>

                    {stage !== 'success' && <div className={classes.paper}>
                        <Password
                            branch="new_pass"
                            theme={theme}
                            variant={skipable ? 'skip' : 'new_pass'}
                            history={history}
                            next={setStage}
                            setVariant={setStage}
                        />
                    </div>}

                    {stage === 'success' &&
                        <SuccessModal
                            title="Пароль задан"
                        />
                    }
                </React.Fragment>
            </Fade>
        </Modal>
    )
}

export default NewPasswordModal
