import { useRef, useState, useEffect } from "react";

function Tarefas() {
    const [listaTarefas, setListaTarefas] = useState([]);
    const [descricaoEditada, setDescricaoEditada] = useState('');
    const [editando, setEditando] = useState(false);
    const [tarefaEditandoIndex, setTarefaEditandoIndex] = useState(null);
    const [erro, setErro] = useState('');
    const descricaoTarefaInputRef = useRef();

    useEffect(() => {
        const storedTasks = localStorage.getItem("tarefas");
        if (storedTasks) {
            setListaTarefas(JSON.parse(storedTasks));
        }
    }, []);

    function adicionarTarefa() {
        const descricao = descricaoTarefaInputRef.current.value.trim(); // Removendo espaços em branco antes e depois da string
        if (descricao === '') {
            // Se a descrição estiver vazia, não faz nada
            setErro('Por favor, insira uma descrição para a tarefa.');
            return;
        }
    
        const novaTarefa = {
            descricao: descricao,
            finalizado: false
        };
    
        const novaListaTarefas = [...listaTarefas, novaTarefa];
        setListaTarefas(novaListaTarefas);
        localStorage.setItem("tarefas", JSON.stringify(novaListaTarefas));
    
        descricaoTarefaInputRef.current.value = '';
        setErro('');
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
        const descricaoEditada = descricaoTarefaInputRef.current.value;
        if (!descricaoEditada.trim()) {
            // Se o campo estiver vazio, você pode exibir uma mensagem de erro ou simplesmente retornar sem fazer nada.
            setErro('Por favor, insira uma descrição para a tarefa.');
            return;
        }
    
        const novaListaTarefas = [...listaTarefas];
        novaListaTarefas[tarefaEditandoIndex].descricao = descricaoEditada;
        setListaTarefas(novaListaTarefas);
        localStorage.setItem("tarefas", JSON.stringify(novaListaTarefas));
        setEditando(false);
        descricaoTarefaInputRef.current.value = '';
        setErro('');
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
            {erro && <div className="erro-mensagem">{erro}</div>}
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
