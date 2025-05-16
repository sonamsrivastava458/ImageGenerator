const accessKey = "-frcrznxRP9nrgoPnhGKexmCNQWKBk1VE_3NvpYTsko";
const searchForm = document.querySelector("form");
const    searchInput = document.querySelector(".search-input");
const imagesContainer  = document.querySelector(".images-container");
const loadmoreBtn  = document.querySelector(".loadmoreBtn");
let page =1;
const fetchImages = async(query ,pageNo)=>{
    try{
    if(pageNo === 1){
        imagesContainer.innerHTML = '';
    }
   
   const url = `https://api.unsplash.com/search/photos/?query=${query}&per_page=28&page=${pageNo}&client_id=${accessKey}`;
   const res = await fetch(url);
   const data = await res.json();

if(data.results.length>0){
data.results.forEach(photo => {
    const imageElement = document.createElement('div');
    imageElement.classList.add("imageDiv");

    imageElement.innerHTML = `<img src = "${photo.urls.regular}"/>`;
    const overlayElement = document.createElement("div");
    const overlayText = document.createElement("h3");

    overlayElement.appendChild(overlayText);
    overlayText.innerText = `${photo.alt_description}`;

    overlayElement.classList.add("overlay");
    imageElement.appendChild(overlayElement);
    imagesContainer.appendChild(imageElement);
});
if(data.total_pages === pageNo){
    loadmoreBtn.style.display = "none";
}
else{
    loadmoreBtn.style.display = "block";
}
}
else{
    imagesContainer.innerHTML = `<h2>No image found...</h2>`;
}
    }
    catch(err){
        imagesContainer.innerHTML = `<h2>Failed to fetch images... Please try again later</h2>`;
    }
}
searchForm.addEventListener("submit",(e)=>{
    e.preventDefault();
  const inputText = searchInput.value.trim();
  if(inputText !== ''){
    let page =1;
    fetchImages(inputText,page);
  }
  else{
    imagesContainer.innerHTML = `<h2> Please enter a search query.</h2>`;
    if(loadmoreBtn.style.display === "block"){
        loadmoreBtn.style.display = "none";
    }
    
  }

});

loadmoreBtn.addEventListener("click" ,() =>{
    fetchImages(searchInput.value.trim(), ++page);
    
})
