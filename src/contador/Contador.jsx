import { useState } from "react";


function Contador() {
    const [numero, setNumero] = useState(0);
    console.log(numero)


    function contar() {
        setNumero(numero+1);
    }

    function zerarNumero() {
        setNumero(0);
    }

    return (
        <>
            <button onClick={zerarNumero} >Zerar</button>
            <button onClick={contar} >Contar</button>
            {
                numero
            }
        </>
    )
}

export default Contador;