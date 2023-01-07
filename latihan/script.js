// $('.search-button').on('click', function () {
//     $.ajax({
//         url: 'http://www.omdbapi.com/?apikey=ed537468&s=' + $('.input-keyword').val(),
//         success: result => { //jika sukses
//             const movies = result.Search;
//             let cards = '';
    
//             movies.forEach(m => {
//                 cards += showCards(m);
//             });
//             $('.movie-container').html(cards); //jquery tolong carikan class movie-container, kemudian isikan htmlnya dengan cards
    
//             // ketika tombpl detail di klik
             
//             $('.modal-detail-button').on('click', function () {
//                 $.ajax({
//                     url: 'http://www.omdbapi.com/?apikey=ed537468&i=' + $(this).data('imdbid'),
//                     success: m => {
//                         const movieDetail = showMovieDetail(m);
//                         $('.modal-body').html(movieDetail);               
//                                     },
//                     error: (e) => {
//                         console.log(e.responseText);
//                     }
//                 })
//             })
    
//         },
//         error: (e) => {
//             console.log(e.responseText);
//         }
        
//     });
// });



// Fetch
// fetch() = sebuah method pada API javascript untuk mengambil resource dari jaringan, dan mengembalikna promise yang selesai (fullfilled) ketika ada response yang tersedia
//fetch(resource, init);  //resource = berisikan (url atau request object)
                          //init = konfigurasi tambahan (object)
//response hasil dari fetch (property atau method)


// const searchButton = document.querySelector('.search-button'); //querryselector untuk mengambil satu
// searchButton.addEventListener('click', function() { //menggunakan function biasa untuk ada 'this'  //ketika tombol di klik maka jalanlan function berikut: 

//     const inputKeyword = document.querySelector('.input-keyword');
//     fetch('http://www.omdbapi.com/?apikey=ed537468&s=' + inputKeyword.value) //menggunakan fetch harus ada resourcenya (ex: url)
//         .then(response => response.json()) //jika berhasil maka gunakan then 
//         .then(response => {
//             const movies = response.Search;
//             let cards = '';
//             movies.forEach(m => cards += showCards(m));
//             const movieContainer = document.querySelector('.movie-container');
//             movieContainer.innerHTML = cards;


//             //ketika tombol di klik dan memunculkan modal
//             const modalDetailButton = document.querySelectorAll('.modal-detail-button'); //cari semua modal-detail-button
//             modalDetailButton.forEach(btn => {
//                 btn.addEventListener('click', function () { //butuh this jadi pake function biasa
//                     const imdbid = this.dataset.imdbid;
//                     fetch('http://www.omdbapi.com/?apikey=ed537468&i=' + imdbid)
//                         .then(response => response.json())
//                         .then(m => {
//                             const movieDetail = showMovieDetail(m);
//                             const modalBody = document.querySelector('.modal-body');
//                             modalBody.innerHTML = movieDetail;
//                         });
//                 });
//             });
            
            

//             });
//         }); 



// Fetch Refactor (Async Await) 
const searchButton = document.querySelector('.search-button');
searchButton.addEventListener('click', async function () {
    try { //error handling
        const inputKeyword = document.querySelector('.input-keyword');
        const movies = await getMovies(inputKeyword.value);
        updateUI(movies);
    } catch (error) {
        alert(error);
    }
   
});


function getMovies(keyword) {
    return fetch('http://www.omdbapi.com/?apikey=ed537468&s=' + keyword)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(response => {
            if (response.Response === "False") {
                throw new Error(response.Error);
            } 
                return response.Search;
        });
}


function updateUI(movies) {
    let cards = '';
    movies.forEach(m => cards += showCards(m));
    const movieContainer = document.querySelector('.movie-container');
    movieContainer.innerHTML = cards;
}


// event binding
document.addEventListener('click', async function (e) {
    if (e.target.classList.contains('modal-detail-button')) {
        const imdbid = e.target.dataset.imdbid;
        const movieDetail = await getMovieDetail(imdbid);
        updateUIDetail(movieDetail);
    }
});

function getMovieDetail(imdbid) {
    return fetch('http://www.omdbapi.com/?apikey=ed537468&i=' + imdbid)
        .then(response => response.json())
        .then(m => m);
};
 


function updateUIDetail(m) {
    const movieDetail = showMovieDetail(m);
    const modalBody = document.querySelector('.modal-body');
    modalBody.innerHTML = movieDetail;
}

//end binding




function showCards(m) {
    return `<div class="col-md-4 my-5">
    <div class="card">
        <img src="${m.Poster}" class="card-img-top" >
        <div class="card-body">
            <h5 class="card-title">${m.Title}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
            <a href="#" class="btn btn-primary modal-detail-button" data-toggle="modal" data-target="#movieDetailModal" data-imdbid="${m.imdbID}">Show Details</a>
        </div>
    </div>
  </div>`;
}

function showMovieDetail(m) {
    return `<div class="container-fluid">
                <div class="row">
                <div class="col-md-3">
                    <img src="${m.Poster}" class="img-fluid">
                </div>
                <div class="col-md">
                    <ul class="list-group">
                    <li class="list-group-item"><h4>${m.Title} (${m.Year})</h4></li>
                    <li class="list-group-item"><strong>Director : </strong> ${m.Director}</li>
                    <li class="list-group-item"><strong>Actors : </strong> ${m.Actors}</li>
                    <li class="list-group-item"><strong>Writer : </strong> ${m.Writer}</li>
                    <li class="list-group-item"><strong>Plot : </strong> ${m.Plot}</li>
                    </ul>
                </div>
                </div>
            </div>`;
}