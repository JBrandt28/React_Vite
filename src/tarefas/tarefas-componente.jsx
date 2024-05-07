import { useState } from "react";

function Tarefas() {
    const [listaTarefas, setListaTarefas] = useState([]);
    
    //caso utilizar o this, fazer uso do function
    function adicionarTarefa() {
        listaTarefas.push(
            {
                descricao: 'Tarefa',
                finalizado: false
            }
        );
        setListaTarefas(listaTarefas.slice());
        //console.log('Tarefas: ', listaTarefas);
        console.log('Cadastrado');
    }
    //caso não utilizar o this, utilizar o aeroFunction
    // const adicionarTarefa = () => {
    // }
    // function marcarComoFinalizado(index) {
    //     const novasTarefas = [...listaTarefas];
    //     novasTarefas[index].finalizado = true;
    //     setListaTarefas(novasTarefas);
    // }

    function atualizarTarefa(tarefaAtual){
        tarefaAtual.finalizado = !tarefaAtual.finalizado;
        setListaTarefas(listaTarefas.slice())
        // if(tarefaAtual.finalizado) {
        //     tarefaAtual.finalizado = false;
        // } else {
        //     tarefaAtual.finalizado = true;
        // }
    }

    function pegaEstilo(tarefaAtual) {
        if (tarefaAtual.finalizado) {
            return 'line-through';
        }
        return 'none';
    }

    return (
        <div>
            <button onClick={adicionarTarefa}>Cadastrar</button>
            <br />
            <div>
                {
                    listaTarefas.map(tarefaAtual => {
                        return <div style={
                            {

                                margin: '10px',
                                color: 'greenyellow',
                                backgroundColor: 'gray',
                                textDecoration: pegaEstilo(tarefaAtual)
                                //textDecoration: tarefaAtual.finalizado ? 'line-through' : 'none'
                            }
                        } onClick= {() => atualizarTarefa(tarefaAtual)}>{tarefaAtual.descricao}</div>
                    })
                }
            </div>
        </div>
    )
    

    // return (
    //     <div>
    //     <button onClick={adicionarTarefa}>Cadastrar</button>
    //     <br />
    //         <div>
    //             {listaTarefas.map((tarefaAtual, index) => (
    //                 <div
    //                     key={index}
    //                     style={{
    //                         margin: '10px',
    //                         color: tarefaAtual.finalizado ? 'dark' : 'greenyellow',
    //                         backgroundColor: 'gray',
    //                         textDecoration: tarefaAtual.finalizado ? 'line-through' : 'none'
    //                             }
    //                     }onClick={() => marcarComoFinalizado(index)}
    //                 >{tarefaAtual.descricao}
    //                 </div>
    //             ))}
    //         </div>
    //     </div>
    // )
}

export default Tarefas;