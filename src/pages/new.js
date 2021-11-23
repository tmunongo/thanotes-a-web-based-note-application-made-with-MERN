import React, { useEffect } from 'react';
import { useMutation, gql } from '@apollo/client';
//import noteform component
import NoteForm from '../components/NoteForm';
//import query
import { GET_NOTES, GET_MY_NOTES } from '../gql/query';

//our new note query
const NEW_NOTE = gql`
    mutation newNote($content: String!) {
        newNote(content: $content) {
            id
            content
            createdAt
            favoriteCount
            favoritedBy {
                id
                username
            }
            author {
                username
                id
            }
        }
    }
`;

const NewNote = props => {
    useEffect(() => {
        //update document title
        document.title = 'New Note - Thanotes';
    });

    const [data, { loading, error }] = useMutation(NEW_NOTE, {
        //refetch the GET_NOTES query to update cache
        refetchQueries: [{ query: GET_MY_NOTES }, { query: GET_NOTES }],
        onCompleted: data => {
            //when complete, redirect user to note page
            props.history.push(`note/${data.newNote.id}`);
        }
    });
    
    return (
        <React.Fragment>
            {/*loading message when mutation loading */}
            {loading && <p>Loading...</p>}
            {/*if error, display error message */}
            {error && <p>Error saving the note</p>}
            {/*the form component, passing mutation data as a prop */}
            <NoteForm action={data} />    
        </React.Fragment>
    );
};

export default NewNote;