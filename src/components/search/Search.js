import { useState } from 'react';
import { Link } from 'react-router-dom';
import {Formik, Form, Field, ErrorMessage, useField} from 'formik';
import * as Yup from 'yup';
import useMarvelService from '../../services/MarvelService';

import './search.scss';

const Search = () => {
    const [char, setChar] = useState(null);
    const [isNotFound, setIsNotFound] = useState(false);

    const {error, loading, getCharacterByName} = useMarvelService();

    const searchCharacter = (charName) => {
        getCharacterByName(charName)
            .then(res => onCharLoaded(res))
            .catch(onCharError)
    }

    const onCharLoaded = (searchChar) => {
        setChar(searchChar);
        setIsNotFound(false);
    }

    const onCharError = (e) => {
        setIsNotFound(true);
        setChar(null);
    }

    return(
        <div className="search">
            <div className="search__title">Or find a character by name:</div>

            <Formik
                initialValues={{
                    name: ''
                }}
                validationSchema = {Yup.object({
                    name: Yup.string().min(2, 'Минимум 2 символа!').required('This field is required!')
                })}
                onSubmit = {(values) => searchCharacter(values.name)}
            >
                <Form className="search__form">
                    <div className="search__wrapper">
                        <Field
                            id="name"
                            name="name"
                            type="text"
                            className="search__input"
                            placeholder="Enter name"
                        />

                        <button type="submit" className="button button__main search__submit">
                            <div className="inner">
                                Find
                            </div>
                        </button>
                    </div>
                    <div className="search__wrapper search__wrapper--char">
                        {char ? <div className="search__success">There is! Visit {char.name} page?</div> : null}
                        {isNotFound ? <div className="search__error">The character was not found. Check the name and try again</div> : null}
                        {char ?
                            <Link to={`/character/${char.id}`} className='button button__main search__submit'>
                                <div className="inner">
                                    To page
                                </div>
                            </Link> : null
                        }

                        <ErrorMessage className="search__error" name="name" component="div" />
                    </div>
                </Form>
            </Formik>
        </div>
    )
}

export default Search;