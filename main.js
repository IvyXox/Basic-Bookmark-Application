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

    // clear form
    document.getElementById('myForm').reset();

    // refetch bookmarks
    fetchBookmarks();

    //prevent form-submit
    e.preventDefault();
}

// delete bookmark
function deleteBookmark(url){
    // get bookmarks from localStorage
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // loop through the bookmarks
    for(let i =0;i < bookmarks.length;i++){
      if(bookmarks[i].url == url){
        // remove
        bookmarks.splice(i, 1);
      }
    }
    // reset back to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  
    // refetch bookmarks
    fetchBookmarks();
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

        bookmarksResults.innerHTML += '<div class="well shadow p-3 mb-5 bg-light rounded"">'+
                                    '<h3>' +name+
                                    // I added noreferrer becouse creates security gap
                                    // And use ` ` when you want use a variable 
                                    // That is cute girl good luck ! 
                                    ` <a class="btn btn-default btnVisit" target="_blank" rel="noreferrer" href="https://${url}.com">Visit</a>`+

                                    ' <a onclick="deleteBookmark(\''+url+'\')" href="#"><i class="far fa-trash-alt trashIcon"></i></a>'+

                                    '</h3>'+
                                    '</div>';
    }
}

// validate form
function validateForm(siteName, siteUrl){
    if(!siteName || !siteUrl){
      alert('Please fill in the form');
      return false;
    }
  
    let expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    let regex = new RegExp(expression);
  
    if(!siteUrl.match(regex)){
      alert('Please use a valid URL');
      return false;
    }
  
    return true;
  }
  
  function addhttp(url) {
    if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
        url = "http://" + url;
    }
    return url;
  }