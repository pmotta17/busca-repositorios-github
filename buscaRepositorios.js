export default function buscaRepositorios(url, sucesso, erro) {
    const requisicao = new XMLHttpRequest();
    requisicao.open('GET', url);

    requisicao.onload = () => {

        if (requisicao.status === 200) {

            sucesso(JSON.parse(requisicao.responseText));
        

        } else {
            
            erro(JSON.parse(requisicao.responseText));
        }

    };

    requisicao.send();
}