import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';

import './singleCharacterPage.scss';

const SingleCharacterPage = () => {
    const {charId} = useParams();
    const [char, setChar] = useState(null);
    

    const {loading, error, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        requestChar();
    }, [charId])

    const requestChar = () => {
        clearError();
        getCharacter(charId).then(onCharLoaded);
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(errorMessage || spinner || !char) ? <View char={char}/> : null;

    return(
        <>
            {error}
            {spinner}
            {content}
        </>
    )
}

const View = ({char}) => {
    const {thumbnail, name, description} = char;

    return(
        <div className='char-page'>
            <img src={thumbnail} alt={name} width="293" height="293" className='char-page__img' />
            <div className='char-page__info'>
                <h2 className='char-page__name'>{name}</h2>
                <p>{description}</p>
            </div>
        </div>
    )
}

export default SingleCharacterPage;