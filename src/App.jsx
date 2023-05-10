import { useEffect, useState } from 'react'
import './App.css'


function App() {
  const [cookie, setCookie] = useState(false)
  const [name, setName] = useState("")
  const [id, setId] = useState(0)
  const [error, setError] = useState("")
  const [loader, setLoader] = useState(true)


  const fun = function getRandomInt(max = 200) {
    return setId((Math.floor(Math.random() * max)));
  }

  const handle = (event) => {
    setError("")
    setName(event)
  }

  const handleError = () => {
    if (name.length > 12) {
      return setError("No se puede exceder el limite de 12 carateres")
    }
    setTimeout(() => setLoader(false), 2000)
    return setCookie(true)
  }

  useEffect(() => {
    fun()
    setCookie(false)
    const div = document.getElementById('exampleInputEmail1');
    div.focus();
  }, [])


  return (
    <div>
      {cookie ? "" : <h1>Galleta de la fortuna</h1>}
      <main className='contenedor' >
        {!cookie ? <form onSubmit={(e) => { e.preventDefault(); handleError() }}>
          <label for="exampleInputEmail1" className="form-label">Ingresa tu nombre</label>
          <div className="mb-3 entrada">
            <input autoComplete='off' maxLength={12} tabIndex="-1" onChange={(e) => handle(e.target.value)} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
            {error && <p>{error}</p>}
            <button type='submit' class="btn btn-primary">Aceptar</button>
          </div>
        </form> : <div className='page2'>
          {!loader && <h2>ESTA ES TU GALLETA {name.toUpperCase()}!</h2>}
          {loader ? <span class="loader"></span> : <img className='imagen' src={`https://frase.vukki.net/fortuna/galletaF.php?n=&id=${id}`}></img>}
          <button onClick={() => { setCookie(false); setLoader(true); fun() }}>Volver</button>
        </div>}
      </main>
    </div>
  )
}

export default App
