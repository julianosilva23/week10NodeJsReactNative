import React, { useState, useEffect} from 'react';

function DevForm({ onSubmit }) {
    const [github_username, setGithubUsername] = useState('');
    const [techs, setTechs] = useState('');

    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');


    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords
                setLatitude(latitude);
                setLongitude(longitude);
                // programação imperativa, crio um estado e o compoenente se comporta de acordo com ele
            },
            (err) => {
                console.log(err);
            },
            {
                timeout: 30000
            }
        );
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();

        await onSubmit({
            github_username,
            techs,
            latitude,
            longitude
        });

        setGithubUsername('');
        setTechs('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="input-block">
                <label htmlFor="">Usuário do Github</label>
                <input name="github_username" id="github_username" value={github_username} required onChange={e => setGithubUsername(e.target.value)}></input>
            </div>
            <div className="input-block">
                <label htmlFor="techs">Tecnologias</label>
                <input name="techs" id="techs" value={techs} required onChange={e => setTechs(e.target.value)}></input>
            </div>

            <div className="input-group">
                <div className="input-block">
                    <label htmlFor="latitude">Latitude</label>
                    <input type="number" name="latitude" id="latitude" value={latitude} required onChange={e => setLatitude(e.target.value)}></input>
                </div>
                <div className="input-block">
                    <label htmlFor="longitude">Logintude</label>
                    <input type="number" name="longitude" id="longitude" value={longitude} required onChange={e => setLongitude(e.target.value)}></input>
                </div>
            </div>
            <button type="submit">Salvar</button>

        </form>
    )
}

export default DevForm;