
// Variables
const listaTweets = document.getElementById('lista-tweets');
// Event Listener
eventListeners();
function eventListeners() {
    // Cuando se envia la formulario
    document.querySelector('#formulario').addEventListener('submit', agregarTweet);
    // Borrar tweets
    listaTweets.addEventListener('click', borrarTweet);
    // Contenido cargado
    document.addEventListener('DOMContentLoaded', localStorageListo);
}
// Añadir Tweet del formulario
function agregarTweet(e){
    e.preventDefault();
    console.log('Formulario Enviado');  
    // Leer el valor de Textarea
    const tweet = document.getElementById('tweet').value;
    // Crear boton de eliminar
    const botonBorrar = document.createElement('a');
    botonBorrar.classList = 'borrar-tweet';
    botonBorrar.style.backgroundColor = 'blue';
    botonBorrar.style.color = 'white';
    botonBorrar.style.padding = '1px 8px';
    botonBorrar.style.borderRadius = '50%';
    botonBorrar.innerText= 'X';

          // Crear elemento y añadirle el contenido a la lista
         const li = document.createElement('li');
         li.innerText = tweet;
         li.appendChild(botonBorrar);
         listaTweets.appendChild(li);

   //Añadir al Local Storage
   agregarTweetLocalStorage(tweet);
}
// Eliminar tweet del DOM
function borrarTweet(e) {
    e.preventDefault();
    if(e.target.className === 'borrar-tweet'){
       e.target.parentElement.remove();
       borrarTweetLocalStorage(e.target.parentElement.innerText);
    }
}
// Mostrar datos del Local Storage
function localStorageListo() {
    let tweets;
    tweets = obtenerTweetsLocalStorage();
    tweets.forEach(function (tweet) {
     // Crear boton de eliminar
    const botonBorrar = document.createElement('a');
    botonBorrar.classList = 'borrar-tweet';
    botonBorrar.style.backgroundColor = 'blue';
    botonBorrar.style.color = 'white';
    botonBorrar.style.padding = '1px 8px';
    botonBorrar.style.borderRadius = '50%';
    botonBorrar.innerText= 'X';

        // Crear elemento y añadirle el contenido a la lista
        const li = document.createElement('li');
        li.innerText = tweet;
        li.appendChild(botonBorrar);
        listaTweets.appendChild(li);
    });
}
function agregarTweetLocalStorage(tweet) {
    let tweets;
    tweets = obtenerTweetsLocalStorage();
       // Añadir el nuevo tweet
       tweets.push(tweet);
           // Convertir de string a arreglo para local storage
           localStorage.setItem('tweets', JSON.stringify(tweets))    
}
// Comprobar que haya elementos en el local Storage
function obtenerTweetsLocalStorage(){
    let tweets;
    // Revisamos los valores del local storage
    if(localStorage.getItem('tweets') === null){
        tweets = [];
    } else {
        tweets = JSON.parse(localStorage.getItem('tweets'));
    }
    return tweets;
}
// Elimina el tweet del Local Storage
function borrarTweetLocalStorage(tweet) {
    let tweets, tweetBorrar;
    // Elimina la X del tweet
    tweetBorrar = tweet.substring(0, tweet.length - 1);
    tweets = obtenerTweetsLocalStorage();
    tweets.forEach(function(tweet, index){ 
        if( tweetBorrar === tweet) {
            tweets.splice(index, 1);
        }
    });
    localStorage.setItem('tweets', JSON.stringify(tweets));
}



