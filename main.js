//Listen for form submit~
document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(e){
    //get form values
    let siteName = document.getElementById('siteName').value;
    let siteUrl = document.getElementById('siteUrl').value;

    let bookmark = {
        name: siteName,
        url: siteUrl
    }
/*
    localStorage.setItem('test', 'Hello World!');
    console.log(localStorage.getItem('test'));
    localStorage.remove('test');
    console.log(localStorage.getItem('test'));
*/
    // if bookmark is null  
    if(localStorage.getItem('bookmarks') === null){
        // init array
        let bookmarks = [];
        // add to array
        bookmarks.push(bookmark);
        // set to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        // get bookmarks from localStorage
        let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        // add bookmark to array
        bookmarks.push(bookmark);
        // reset to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    //prevent form-submit
    e.preventDefault();
}

// fetch bookmarks
function fetchBookmarks() {
    // get bookmarks from localStorage
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    // get output id
    let bookmarksResults = document.getElementById('bookmarksResults');

    // build output
    bookmarksResults.innerHTML = "";
    for(let i = 0; i < bookmarks.length; i++){
        let name = bookmarks[i].name;
        let url = bookmarks[i].url;

        bookmarksResults.innerHTML += '<div                                           class="well shadow p-3 mb-5 bg-light rounded"">'+
                                    '<h3>' +name+
                                    
                                    ' <a class="btn btn-default btnVisit" target="_blank" href="'+url+'">Visit</a>'+

                                    ' <a href="#"><i class="far fa-trash-alt trashIcon"></i></a>'+

                                    '</h3>'+
                                    '</div>';
    }
}