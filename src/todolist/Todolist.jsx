import { useRef, useState } from "react";

function Todolist() {
    const [tarefas, setTarefas] = useState([]);
    const descricaoRef = useRef();

    function cadastrar() {
        const tarefa = {
            id: 1,
            descricao: descricaoRef.current.value,
            finalizado: false
        };
        // PRIMEIRA FORMA
        // tarefas.push(tarefa);
        // setTarefas(tarefas.slice());

        // SEGUNDA FORMA (spread syntax - ...)
        // setTarefas([...tarefas, tarefa]);

        // TERCEIRA FORMA (spread syntax - ...)
        tarefas.push(tarefa);
        setTarefas([...tarefas]);
        console.log('Cadastrado com sucesso');
    }

    function atualizaTarefa(tarefa) {
        tarefa.finalizado = !tarefa.finalizado;
        setTarefas([...tarefas]);
    }

    return (
        <>
            <input type="text" ref={descricaoRef} />
            <button onClick={cadastrar}>Cadastrar</button>
            <br />
            {
                tarefas.map(tarefa => {
                    console.log(tarefa);
                    return (
                        <>
                            <br />
                            <input type="checkbox" onChange={() => atualizaTarefa(tarefa)} />
                            <span style={{
                                textDecoration: tarefa.finalizado === true 
                                ? 'line-through' 
                                : 'unset'
                            }}>
                                {tarefa.descricao}
                            </span>
                        </>
                    )
                })
            }
        </>
    );
}

export default Todolist;