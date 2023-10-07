import React, { useState } from 'react'
import MyContext from './myContext'
import toast from 'react-hot-toast';

const MyState = (props) => {

    // loading state 
    const [loading, SetLoading] = useState(false);
    // get notes 
    const [allNotes, SetAllNotes] = useState([])

    // get all notes function 
    const getAllNotes = async () => {
        SetLoading(true)
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_HOST_URL}/api/notes/fetchallnotes`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                }


            })

            const notesData = await res.json();
            console.log(notesData);
            SetAllNotes(notesData)
            SetLoading(false)

        } catch (error) {
            console.log(error);
            SetLoading(false)
        }

    }


    //add note
    const [title, SetTitle] = useState('')
    const [description, SetDescription] = useState('');
    const [tag, SetTag] = useState('')

    //add note function

    const addNote = async () => {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_HOST_URL}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })

        })


        //response
        const noteData = await res.json();
        getAllNotes();

        if (noteData.error) {
            toast.success(noteData.error)
        }
        else {
            toast.success(noteData.success)
        }

        SetTitle("");
        SetDescription("");
        SetTag("")


    }

    //delete note 
    const deleteNote = async (id) => {

        const res = await fetch(`${import.meta.env.VITE_BACKEND_HOST_URL}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }

        })
        //responses
        const noteData = await res.json();
        getAllNotes();
        toast.success(noteData.success)



    }









    return (
        <>
            <MyContext.Provider value={{
                allNotes, getAllNotes, loading, title, SetTitle,
                description, SetDescription, tag, SetTag, addNote, deleteNote
            }}>
                {props.children}
            </MyContext.Provider>
        </>
    )
}

export default MyState