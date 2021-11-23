import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import ButtonAsLink from './ButtonAsLink';
import { TOGGLE_FAVORITE } from '../gql/mutation';
import { GET_MY_FAVORITES } from '../gql/query';

const FavoriteNote = props => {
    const [count, setCount] = useState(props.favoriteCount);

    const [favorited, setFavorited] = useState(
        //check the note exists in user favorites list
        props.me.favorites.filter(note => note.id === props.noteId).length > 0
    );

    const [toggleFavorite] = useMutation(TOGGLE_FAVORITE, {
        variables: {
            id: props.noteId
        },
        //refecth the get_my_favs query
        refetchQueries: [{ query: GET_MY_FAVORITES }]
    });

    return (
        <React.Fragment>
            {favorited ? (
                <ButtonAsLink
                    onClick={() => {
                        setFavorited(false);
                        setCount(count - 1);
                    }}
                >
                    Remove Favorite
                </ButtonAsLink>
            ) : (
                <ButtonAsLink
                    onClick={() => {
                        setFavorited(true);
                        setCount(count + 1);
                    }}
                >
                    Favorite
                </ButtonAsLink>
            )}
                : {count}
            </React.Fragment>
    );
};

export default FavoriteNote;