function populateUFs(){
    
    const ufSelect = document.querySelector("select[name = uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then((res) => {return res.json()})
    .then(states => {
        for(const state of states){
            ufSelect.innerHTML += `<option value = "${state.id}">${state.nome}</option>`
        }        
    })
}

populateUFs()

function getCities(event){    
    const citySelect = document.querySelector("[name = city]")
    const stateInput = document.querySelector("[name = state]")
    const ufValue = event.target.value
    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    
    citySelect.innerHTML = ""
    citySelect.disabled = true
    fetch(url)
    .then((res) => {return res.json()})
    .then(cities => {
        for(const city of cities){
            citySelect.innerHTML += `<option value = "${city.nome}">${city.nome}</option>`
        }  
        citySelect.disabled = false      
    })
}


document
.querySelector("select[name=uf]")
.addEventListener("change", getCities)

//itens de coleta
// pegar todos os lis
const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")


let selectedItems = []
function handleSelectedItem(event){
    //adicionar ou remover uma classe com js
    const itemLi = event.target
    itemLi.classList.toggle("selected")
    const itemId = itemLi.dataset.id

    

    //verificar se existem itens selecionados

    //pegar o sselecionados
    const alreadySelected = selectedItems.findIndex(function(item){
        const itemFound = item ===itemId
        return itemFound

    })
    //se estiver selecionado, desselecinar
    if(alreadySelected >= 0){
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId
            return false
        })

        selectedItems = filteredItems

    }else{      //se não estiver, adicionar a seleção
        selectedItems.push(itemId)
    }
    

    //atualizar o campo escondido com os itens selecionados
collectedItems.value = selectedItems
}
