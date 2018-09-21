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


const main = document.querySelector("main");
//const div = document.createElement("div");

const displayArticleFromSource = (name = 'abc-news') => {
    let url2 = 'https://newsapi.org/v2/everything?' +
    'sources=' + name +
    '&apiKey=f501da9101f04a6ba992045c07b7b288';
    let req2 = new Request(url2);
    fetch(req2)
        .then(function(response) {
            response.json().then(data => {
                const articles = data.articles;
                articles.forEach(article => {
                    let articleContainer = document.createElement("article");
                    let img = article.urlToImage;
                    if(!img){
                        img=``;
                    }else{
                        img = `<figure><img src='${article.urlToImage}' /></figure>`;
                    }
                    articleContainer.innerHTML = `
                        <h2>${article.title}</h2>
                        ${img}
                        <p>${article.description}</p>
                        <a class='cta' target='_blank' href='${article.url}'>Lire la suite...</a>
                    `;
                    main.appendChild(articleContainer);
                });
            })
        })
        .catch(function(error){
            console.log(error)
        })
}

displayArticleFromSource();

select.addEventListener("change", function(event){
    let source = event.target.selectedOptions[0].id;
    main.innerHTML = "";
    displayArticleFromSource(source);
})    
    

