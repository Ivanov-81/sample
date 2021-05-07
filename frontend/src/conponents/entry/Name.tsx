import React, { ReactElement, useState, useEffect } from 'react'
import models from '../../js/models';
import ButtonBlock from '../ButtonBlock';
import { InputName } from '../CustomInput'
import { WHAT_IS_NAME, HEADER_NAME, FURTHER, WRONG_NAME } from '../../constants'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

interface Props {
    next: (e: React.SetStateAction<string>) => void,
    theme: Theme,
    variant: string,
    setVariant: (e: React.SetStateAction<string>) => void,
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
    },
    image: {
        position: 'absolute',
        top: '-142px',
        width: '300px',
        left: 'calc(50% - 150px)'
    }
}));

function Name({ next, theme, variant, setVariant }: Props): ReactElement {

    const classes = useStyles();
    const [name, setName] = useState('');
    const [error, setError] = useState(false);
    const [helper, setHelper] = useState('');

    useEffect(() => {
        if (name.length === 1) {
            setError(true);
            setHelper(WRONG_NAME);
        } else {
            setError(false);
            setHelper('');
        }
    }, [name])

    useEffect(() => {
        const LS = models.getLS();
        if (LS.name)
            setName(LS.name);
    }, [])

    const handleClick = () => {
        if (!error) {
            models.saveLS('name', name, models.getLS());
            next('phone');
            setVariant('default');
        }
    }

    return (
        <>
            <img className={classes.image} src="/static/images/main-image-name.svg" alt="name"/>
            <h2 className={classes.header}>{WHAT_IS_NAME}</h2>
            <div className={classes.caption}>{HEADER_NAME}</div>

            <InputName
                value={name}
                error={error}
                helper={helper}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                theme={theme}
            />

            <ButtonBlock
                rightText={FURTHER}
                rightClick={handleClick}
                disabled={error}
            />
        </>
    )
}

export default Name
