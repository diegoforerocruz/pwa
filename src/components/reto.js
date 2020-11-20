import React, {useEffect, useState} from 'react';

const Reto = () => {
    let numero = Math.floor(Math.random()*20)
    const [personajes, setPersonajes] = useState();
    useEffect(() => {
        if(!navigator.onLine){
            if(localStorage.getItem("personajes") === null){
                
            } else {
                setPersonajes(localStorage.getItem("personajes"))
            }
        }else{
            const URL ="https://gateway.marvel.com:443/v1/public/characters?apikey=c3a94339f107fb34b8463b4fc4e75a8f&hash=c05b5ff0e3a17d7a63a30927a551d8da&ts=marvel";

            fetch(URL).then(res => res.json()).then(res => {
                setPersonajes(res.data.results[numero]);
                localStorage.setItem("personajes",res.data[numero])
                
            })   
        }
    },[])
    console.log(personajes)
    
    return (
        <div>
            <h1>Reto Marvel</h1>
            {!personajes?<p>No se ha podido conectar al API, intente más tarde</p>:
            <div>
                <div className="card" >
                    <img src={`${personajes.thumbnail.path}.${personajes.thumbnail.extension}`} className="card-img-top" alt="img" />
                    <div className="card-body">
                        <h5 className="card-title">{personajes.name}</h5>
                        <p>Description: {personajes.description}</p>
                        <p>Description: {personajes.modified}</p>
                        {personajes.comics.items.map((comic,i) => <p key={`${i}`}>aparece en el comic: {comic.name}</p>)}
                    </div>    
                </div>
            </div>}     
        </div>
    )
}

export default Reto;