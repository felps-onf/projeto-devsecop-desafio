// Busca tarefas do "banco de dados"
fetch('db.json')
    .then(response => response.json())
    .then(data => {
        document.getElementById('db-status').innerText = data.status;

        const list = document.getElementById('task-list');
        data.itens.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item.task;
            list.appendChild(li);
        });
    })
    .catch(err => {
        document.getElementById('db-status').innerText =
            'Erro interno: ' + err.stack;
    });

// Adiciona nova tarefa na tela
function addTask() {
    const input = document.getElementById('new-task');
    const output = document.getElementById('output');
    const value = input.value.trim();

    if (!value) {
        return;
    }

    const li = document.createElement('li');
    li.textContent = value;
    output.appendChild(li);

    console.log('Tarefa adicionada:', value);
    input.value = '';
}
