const url = 'https://newsapi.org/v2/sources?' +
          'apiKey=f501da9101f04a6ba992045c07b7b288';
let req = new Request(url);
const select = document.getElementById("news-selector");
fetch(req)
    .then(function(response) {
        // on récupère le select
        response.json().then(data => {
            const sources = data.sources;
            sources.forEach(source => {
                let opt = document.createElement("option")
                opt.text = source.name;
                opt.id = source.id;
                select.add(opt);
            });
        })
    })
    .catch(function(error){
        console.log(error)
    })


let source = "abc-news";
let url2 = 'https://newsapi.org/v2/everything?' +
    'sources=' + source +
    '&apiKey=f501da9101f04a6ba992045c07b7b288';

const main = document.querySelector("main");
const div = document.createElement("div");

function displayArticleFromSource(){
    let req2 = new Request(url2);
    fetch(req2)
        .then(function(response) {
            response.json().then(data => {
                const articles = data.articles;
                articles.forEach(article => {
                    const div = document.createElement("div");
                    let img = article.urlToImage;
                    if(!img){
                        img=``;
                    }else{
                        img = `<img src='${article.urlToImage}' />`;
                    }
                    div.innerHTML = `
                        <h2>${article.title}</h2>
                        ${img}
                        <p>${article.description}</p>
                        <a target='_blank' href='${article.url}'>Lire la suite...</a>
                    `;
                    main.appendChild(div);
                });
            })
        })
        .catch(function(error){
            console.log(error)
        })
}

displayArticleFromSource();

select.addEventListener("change", function(event){
    source = event.target.selectedOptions[0].id;
    main.innerHTML = "";
    url2 = 'https://newsapi.org/v2/everything?' +
    'sources=' + source +
    '&apiKey=f501da9101f04a6ba992045c07b7b288';
    displayArticleFromSource();
})    
    

