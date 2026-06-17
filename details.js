const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const artworkId = urlParams.get('id');
console.log("artworkId: ", artworkId);

function createDetails(artwork) {
    console.log(artwork);
    const API_URL = "https://www.artic.edu/iiif/2/";
    const API_KEYWORD = "full/600,600/0/default.jpg";
    
    let details = document.getElementById("artwork-details");

    let img = document.getElementById("artwork-image");
    const placeholderSvg = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='600'%3E%3Crect fill='%23ddd' width='600' height='600'/%3E%3Ctext x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='24' fill='%23999'%3EImage Unavailable%3C/text%3E%3C/svg%3E";
    
    if (artwork.image_id) {
        const URL = `${API_URL}${artwork.image_id}/${API_KEYWORD}`;
        const corsProxyURL = `https://api.allorigins.win/raw?url=${encodeURIComponent(URL)}`;
        
        img.src = corsProxyURL;
        img.onerror = () => {
            img.src = placeholderSvg;
        };
    } else {
        img.src = placeholderSvg;
    }
    img.alt = artwork.title.split(" ")[0];

    let favorite = document.getElementById("cardFavorite");
    favorite.id = "cardFavorite";
    favorite.value = artwork.id;
    favorite.setAttribute("data-artwork-id", artwork.id);

    let title = document.getElementById("artwork-title");
    title.innerText = artwork.artist_title || "Unknown Artist";

    let description = document.getElementById("artwork-description");
    description.innerText = artwork.title;

    let date_display = document.getElementById("artwork-date");
    date_display.innerText = artwork.date_display || "Date not available";

    let artist_display = document.getElementById("artwork-artist");
    artist_display.innerText = artwork.artist_display || "Artist not available";

    let artwork_type = document.getElementById("artwork-type");
    artwork_type.innerText = artwork.artwork_type_title || "Type not available";

    return details;
}

async function getArtworkDetails(id) {
    const API_URL = `https://api.artic.edu/api/v1/artworks/${id}?fields=id,title,artist_title,artist_display,date_display,place_of_origin,description,short_description,medium_display,dimensions,credit_line,publication_history,exhibition_history,provenance_text,artwork_type_title,department_title,classification_title,material_titles,style_titles,subject_titles,image_id,alt_image_ids,is_zoomable`;
    return fetch(API_URL, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: "GET",
    })
    .then((data) => data.json())
    .catch((err) => console.log(err));
}

async function main() {
    const logo = document.getElementById("logo");
    if (logo) {
        logo.addEventListener("click", () => {
            window.location.href = "./index.html";
        });
    }

    const searchBtn = document.getElementById("searchBtn");
    const searchInput = document.getElementById("searchInput");
    if (searchBtn && searchInput) {
        searchBtn.addEventListener("click", () => {
            const searchTerm = searchInput.value;
            if (searchTerm) {
                window.location.href = `./index.html?search=${encodeURIComponent(searchTerm)}`;
            }
        });
        searchInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                const searchTerm = searchInput.value;
                if (searchTerm) {
                    window.location.href = `./index.html?search=${encodeURIComponent(searchTerm)}`;
                }
            }
        });
    }

    const artwork = await getArtworkDetails(artworkId);
    const detailsElement = document.getElementsByClassName("main")[0];
    detailsElement.appendChild(createDetails(artwork.data));
    console.log("artwork: ", artwork);

    const favoriteBtn = document.getElementById("cardFavorite");
    if (favoriteBtn) {
        setupFavoriteButton(artworkId);
    }
}

function setupFavoriteButton(artworkId) {
    const button = document.getElementById("cardFavorite");
    if (button) {
        button.addEventListener("click", (ev) => {
            let favoritesArr = JSON.parse(localStorage.getItem("favorites")) || [];
            const id = ev.target.closest("button").value;
            
            if (favoritesArr.includes(id)) {
                favoritesArr = favoritesArr.filter((favId) => favId !== id);
                button.innerText = "Add to Favorites";
            } else {
                favoritesArr.push(id);
                button.innerText = "Remove from Favorites";
            }
            localStorage.setItem("favorites", JSON.stringify(favoritesArr));
            console.log("Favorites updated:", favoritesArr);
        });
    }
}

addEventListener("load", () => {
    main();
});