//Listen for form submit~
document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(e){
    //get form values
    let siteName = document.getElementById('siteName').value;
    let siteUrl = document.getElementById('siteUrl').value;
    
    
    console.log(siteName, siteUrl);

    //prevent form submitting
    e.preventDefault();
}