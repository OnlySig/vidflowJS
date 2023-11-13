const containerVideos = document.querySelector(".videos__container")

async function mostraVideosEMostra() {
    try {
        const buscaApi = await fetch("http://localhost:3000/videos")
        const jsonBusca = await buscaApi.json()
            jsonBusca.forEach(element => {
                if(element.categoria == "") {
                    throw new Error("Vídeo sem Categoria!")
                }
                containerVideos.innerHTML += `
                <li class="videos__item">
                    <iframe src=${element.url} title=${element.titulo} frameborder="0" allowfullscreen></iframe>
                    <div class="descricao-video">
                        <img class="img-canal" src=${element.imagem} alt="logo do canal">
                        <h3 class="titulo-video">${element.titulo}</h3>
                        <p class="titulo-canal">${element.descricao}</p>
                    </div>
                </li>
                `
            })
    } catch(error) {
        containerVideos.innerHTML = `<p>Houve um erro ao carregar os vídeos: ${error}</p>`
    }
}

mostraVideosEMostra()

const barraDePesquisa = document.querySelector(".pesquisar__input")
barraDePesquisa.addEventListener("input", filtrarPesquisa)

function filtrarPesquisa() {
    const videos = document.querySelectorAll(".videos__item")
    if(barraDePesquisa.value != "") {
        videos.forEach(element => {
            let titulo = element.querySelector(".titulo-video").textContent.toLowerCase()
            let barraPesquisaValue = barraDePesquisa.value.toLowerCase()
            if(!titulo.includes(barraPesquisaValue)) {
                element.style.display = "none"
            } else {
                element.style.display = "block"
            }
        })
    } else {
        videos.forEach(element => element.style.display = "block")
    }
}