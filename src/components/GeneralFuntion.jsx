 // Actualizar data de banco 
 const fetchUpdatedData = (url, set) => {
    fetch('http://localhost:8000/api/'+url)
        .then(res => res.json())
        .then(data => set(data))
        .catch(error => console.error('Error fetching updated data:', error));
    return 'ok'
};

const deleteCol = async (url, id, set, urlup,updateid) => {
    // --Borrar banco
    const response = await fetch('http://localhost:8000/api/' + url + '/' + id, {
        method: 'DELETE'
    });

    if (response.ok) {
        fetchUpdatedData(urlup, set);
        // updateid == null ?'' :updateid(0)
        console.error('Eliminado');
    } else {
        // Manejar el caso en que el jugador no se encuentra
        console.error('Jugador no encontrado');
    }
};

export {deleteCol, fetchUpdatedData}

// ---------------------------------