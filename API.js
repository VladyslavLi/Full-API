// https://api.chucknorris.io/jokes/random
// https://api.chucknorris.io/jokes/search?query={query}
const  buttonAuto = document.getElementById("buttonAUTO")
const  contenerAuto = document.getElementById("contenerAuto")
const  contenerSearch = document.getElementById("contenerSearch")
const  buttonSearch = document.getElementById("buttonSearch")
const  inputSearch = document.getElementById("inputSearch")

async function JokesRandom(){
    contenerAuto.innerHTML = ''

    try{
        const requests = Array.from({ length: 20 }, () =>
            fetch('https://api.chucknorris.io/jokes/random').then(res => res.json())
        )

        const jokes = await Promise.all(requests)

        jokes.forEach(joke => {
            const txt = document.createElement('p')
            txt.textContent = joke.value
            contenerAuto.append(txt)
        })
    }catch(err){
        console.log('Error', err)
        contenerAuto.innerHTML = '<p>Jokes not found</p>'
    }
}

buttonSearch.addEventListener('click' ,()=> { 
    JokesSearch()
})
JokesRandom()

async function JokesSearch(){
    const query = inputSearch.value.trim().toLowerCase()
    if (!query) return

    contenerSearch.innerHTML = ''

    try{
        const response = await fetch(`https://api.chucknorris.io/jokes/search?query=${encodeURIComponent(query)}`)
        const dataJson = await response.json()
        
        if (!dataJson.result || dataJson.result.length === 0){
            contenerSearch.innerHTML = '<p>No jokes found</p>'
            return
        }

       dataJson.result.forEach(joke => {
            const txt = document.createElement('p')
            txt.textContent = joke.value
            contenerSearch.append(txt)
        })
    }catch(err){
        console.log('Error', err)
        contenerSearch.innerHTML = '<p>Jokes not underfinde</p>'
    }
}


