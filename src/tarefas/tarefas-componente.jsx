import { useRef, useState, useEffect } from "react";

function Tarefas() {
    const [listaTarefas, setListaTarefas] = useState([]);
    const [descricaoEditada, setDescricaoEditada] = useState('');
    const [editando, setEditando] = useState(false);
    const [tarefaEditandoIndex, setTarefaEditandoIndex] = useState(null);
    const descricaoTarefaInputRef = useRef();

    useEffect(() => {
        const storedTasks = localStorage.getItem("tarefas");
        if (storedTasks) {
            setListaTarefas(JSON.parse(storedTasks));
        }
    }, []);

    function adicionarTarefa() {
        const novaTarefa = {
            descricao: descricaoTarefaInputRef.current.value,
            finalizado: false
        };

        const novaListaTarefas = [...listaTarefas, novaTarefa];
        setListaTarefas(novaListaTarefas);
        localStorage.setItem("tarefas", JSON.stringify(novaListaTarefas));

        descricaoTarefaInputRef.current.value = '';
    }

    function removerTarefa(index) {
        const novaListaTarefas = [...listaTarefas];
        novaListaTarefas.splice(index, 1);
        setListaTarefas(novaListaTarefas);
        localStorage.setItem("tarefas", JSON.stringify(novaListaTarefas));
    }

    function editarTarefa(index) {
        setDescricaoEditada(listaTarefas[index].descricao);
        setEditando(true);
        setTarefaEditandoIndex(index);
        descricaoTarefaInputRef.current.value = listaTarefas[index].descricao;
    }

    function salvarEdicao() {
        const novaListaTarefas = [...listaTarefas];
        novaListaTarefas[tarefaEditandoIndex].descricao = descricaoTarefaInputRef.current.value;
        setListaTarefas(novaListaTarefas);
        localStorage.setItem("tarefas", JSON.stringify(novaListaTarefas));
        setEditando(false);
        descricaoTarefaInputRef.current.value = '';
    }

    function atualizarTarefa(tarefaAtual) {
        tarefaAtual.finalizado = !tarefaAtual.finalizado;
        setListaTarefas([...listaTarefas]);
        localStorage.setItem("tarefas", JSON.stringify(listaTarefas));
    }

    function pegaEstilo(tarefaAtual) {
        return tarefaAtual.finalizado ? 'line-through' : 'none';
    }

    return (
        <div>
            <input type="text" ref={descricaoTarefaInputRef} />
            {editando ? (
                <button onClick={salvarEdicao}>Salvar</button>
            ) : (
                <button onClick={adicionarTarefa}>Cadastrar</button>
            )}
            <br />
            <div>
                {listaTarefas.map((tarefaAtual, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                        <div
                            style={{
                                flex: 1,
                                margin: '10px',
                                color: 'greenyellow',
                                backgroundColor: 'gray',
                                textDecoration: pegaEstilo(tarefaAtual)
                            }}
                            onClick={() => atualizarTarefa(tarefaAtual)}
                        >
                            {tarefaAtual.descricao}
                        </div>
                        <button onClick={() => removerTarefa(index)}>Remover</button>
                        <button onClick={() => editarTarefa(index)}>Editar</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Tarefas;
