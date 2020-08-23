import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { MovieItem } from './components/MovieItem';
import { MovieTable } from './components/MovieTable';
import { Modal } from './components/Modal';
import { ModalContent } from './components/ModalContent';
import { Input } from './components/Input';
import { Select  } from './components/Select';
import { Button } from './components/Button';

import axios from 'axios';
const api = axios.create({baseURL: 'http://localhost:3000'})

import './styles.css';

const App = () => {
    const [movies, setMovies] = useState([]);
    const [allGenres, setAllGenres] = useState([]);
    const [name, setName] = useState('');
    const [genre, setGenre] = useState('0');
    const [movieId, setMovieId] = useState(0);
    const [displayModal, setDisplayModal] = useState(false);
    const [mode, setMode] = useState('');

    const active = displayModal ? 'active' : 'disabled';
    

    useEffect(() => {
        getMovies();
    }, [movies]);

    useEffect(() => {
        getAllGenres();
    }, []);

    const getMovies = async () => {
        const { data } = await api.get();
        setMovies(data);
    }

    const getAllGenres = async () => {
        const { data } = await api.get('/genres');
        setAllGenres(data);
    }

    const deleteMovie = async id => {
        await api.delete(`/${id}`);
        getMovies();
    }

    const postMovie = async () => {
        await api.post('/', {nome: name, genero: genre});
        displayModalFunc();
        getMovies();
    }

    const updateMovie = async id => {
        await api.put(`/${movieId}`, {nome: name, genero: genre});
        getMovies();
        displayModalFunc();
    }

    const displayModalFunc = () => {
        const newDisplay = displayModal ? false : true;
        if(!newDisplay) {
            setName('');
            setGenre('0');
        }
        setDisplayModal(newDisplay);
    }

    const handleInput = e => {
        setName(e.target.value);

    } 
    const handleSelect = e => {
        setGenre(e.target.value);
    }

    const handleEditButton = id => {
        setMode('edit');

        const movie = movies.filter(movie => {
            if(movie.id === id) {
                return  movie;
            }
        });

        setMovieId(movie[0].id);
        setName(movie[0]['movie_name']);
        setGenre(movie[0]['id_genero']);        
        displayModalFunc();
    }

    const items = movies.map(movie => {
        return (
            <MovieItem 
                key={movie.id} 
                movie={movie} 
                delete={deleteMovie} 
                edit={handleEditButton} 
            />
        ) 
    });

    const selectItems = allGenres.map(genre => {
        return(
            <option 
                key={genre['id_genero']} 
                value={genre['id_genero']}
            >
                {genre['nome_genero']}
            </option>
        )
    })

    return (
        <div className="container">
            <header>
                <h1>Movie CRUD</h1>
            </header>

            <div className="content-container">
                <h2>Movie Catalog</h2>
                <Button 
                    type="button"
                    label="Add Movie"
                    onClick={() => { setMode('add'); displayModalFunc(); }}
                />

                <MovieTable items={items} />
            </div>

            <Modal active={active} displayModal={displayModalFunc}>
                <ModalContent 
                    active ={active} 
                    header={mode === 'add' ? 'Add Movie' : 'Edit Movie'}
                >
                    <form  
                        className="form-container"
                        onSubmit={e => {
                            e.preventDefault();
                            if (mode === 'add')
                                postMovie();
                            else
                                updateMovie(movieId);
                        }}
                    >
                        <Input value={name} onChange={handleInput} />
                        <Select items={selectItems} value ={genre} onChange={handleSelect} />
                        <Button
                            type="submit"
                            label={mode === 'add' ? 'Add' : 'Edit'}
                        />
                    </form>
                </ModalContent>
            </Modal>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));