import buscaRepositorios from "./buscaRepositorios.js"

const inputUsuario = document.getElementById('usuario');
const repositorios_container = document.getElementById('repositorios');
const detalhesRepositorio = document.getElementById("detalhesRepositorio");
const usuario_container = document.getElementById("usuario_container")
 
inputUsuario.addEventListener('change', () => {
    if (inputUsuario.value !== '') {
        const usuario = inputUsuario.value;
        const url = `https://api.github.com/users/${usuario}/repos`;
        buscaRepositorios(url, listarRepositorios, manipulaErro);
    };
});

function listarRepositorios(repositorios) {
    repositorios_container.innerHTML = "";
    repositorios.forEach(repositorio => {
        repositorios_container.innerHTML += templateRepositorio(repositorio);
    })
    dadosUsuario(repositorios[0].owner, repositorios.length)
}

const templateRepositorio = (repositorio) => {
    return `
        <div class="repositorio">
            <p>${repositorio.full_name}</p>
            <p>${repositorio.language == null ? "Sem linguagem principal": repositorio.language}</p>
            <div>
                <a href="${repositorio.html_url}" target="_blank">Acessar repositório</a>
                <button onclick="modal('${repositorio.url}')">Mais detalhes</button>
            </div>
        </div>
    `;
}

function templateUsuario(usuario, qtd_repositorios) {
    return `
        <div id="perfil_usuario">
            <div>
                <img src="${usuario.avatar_url}" alt="foto do usuário ${usuario.login}">
                <p>${usuario.login}</p>
            </div>
            <span>${qtd_repositorios} repositorios encontrado</span>
        </div>
    `;
}

const dadosUsuario = (usuario, qtd_repositorios) => {
    usuario_container.innerHTML = templateUsuario(usuario, qtd_repositorios);
}

const abreModal = (repositorio) => {
    detalhesRepositorio.style.display = "block"
    detalhesRepositorio.innerHTML = templateModal(repositorio);
}

const manipulaErro = (erro) => {
    alert(`Repositório não encontrado: ${erro.message}`);
}

window.modal = (url) => {
    buscaRepositorios(url, abreModal, manipulaErro)
}

const templateModal = (repositorio) => {
    let objData = new Date(repositorio.created_at);
    const data = objData.toLocaleDateString();
    const horario = objData.toLocaleTimeString();


    return `
        <h2>${repositorio.full_name}</h2>
        <div>
            <p>Estrelas ${repositorio.stargazers_count} | Forks ${repositorio.forks_count}</p>
        </div>
        <div>    
            <p>Criado em ${data} - ${horario}</p>
        </div>
            <input value="${repositorio.clone_url}">
            <button onclick="clonarRepositorio(this)">clonar</button>
        </div>
        <span id="fecha-modal" onclick="manipulaDetalheRepositorioModal()">X</span>
    `
};

window.clonarRepositorio = (botaoClonar) => {
    const texto = botaoClonar.previousElementSibling.value;
    navigator.clipboard.writeText(`git clone ${texto}`);
};

window.manipulaDetalheRepositorioModal = () => {
    detalhesRepositorio.style.display = "none"
}







