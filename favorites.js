let allFavorites = [];

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
        searchBtn.addEventListener("click", performSearch);
        searchInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                performSearch();
            }
        });
    }

    const favoriteIds = JSON.parse(localStorage.getItem("favorites")) || [];
    
    if (favoriteIds.length === 0) {
        const container = document.getElementById("favorites-container");
        container.innerHTML = "<p>No favorite artworks yet. <a href='./index.html'>Go back to browse artworks</a></p>";
        return;
    }

    const favoriteContainer = document.getElementById("favorites-container");
    
    for (const id of favoriteIds) {
        try {
            const artwork = await getArtworkDetails(id);
            allFavorites.push(artwork.data);
            const card = createCard(artwork.data);
            favoriteContainer.appendChild(card);
            setupFavoriteButton(id);
        } catch (error) {
            console.error(`Error fetching artwork ${id}:`, error);
        }
    }

    console.log("Favorite artworks loaded:", allFavorites);
}

function performSearch() {
    const searchInput = document.getElementById("searchInput");
    const searchTerm = searchInput.value.toLowerCase();
    const favoriteContainer = document.getElementById("favorites-container");
    
    favoriteContainer.innerHTML = "";
    
    const filteredArtworks = allFavorites.filter((artwork) => {
        return artwork.title.toLowerCase().includes(searchTerm) || 
               artwork.artist_title.toLowerCase().includes(searchTerm);
    });
    
    if (filteredArtworks.length === 0) {
        favoriteContainer.innerHTML = "<p>No favorites found matching your search.</p>";
        return;
    }
    
    filteredArtworks.forEach((item) => {
        const card = createCard(item);
        favoriteContainer.appendChild(card);
        setupFavoriteButton(item.id);
    });
}

function createCard(artwork) {
    console.log(artwork);
    const API_URL = "https://www.artic.edu/iiif/2/";
    const API_KEYWORD = "full/400,400/0/default.jpg";
    
    let card = document.createElement("div");
    card.className = "card";
    let top = document.createElement("div");
    top.className = "top";
    let bottom = document.createElement("div");
    bottom.className = "bottom";

    let img = document.createElement("img");
    const placeholderSvg = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect fill='%23ddd' width='400' height='400'/%3E%3Ctext x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='20' fill='%23999'%3EImage Unavailable%3C/text%3E%3C/svg%3E";
    
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
    
    let favorite = document.createElement("button");
    favorite.className = "cardFavorite";
    favorite.id = `cardFavorite-${artwork.id}`;
    favorite.value = artwork.id;
    favorite.setAttribute("data-artwork-id", artwork.id);
    
    let title = document.createElement("h5");
    title.className = "title";
    title.textContent = artwork.artist_title || "Unknown Artist";
    let description = document.createElement("p");
    description.className = "description";
    description.textContent = artwork.title.split(" ").splice(0, 12).join(" ");
    let details = document.createElement("a");
    details.innerText = "View Details";
    details.href = `./details.html?id=${artwork.id}`;

    top.appendChild(img);
    top.appendChild(favorite);
    bottom.appendChild(title);
    bottom.appendChild(description);
    bottom.appendChild(details);
    card.appendChild(top);
    card.appendChild(bottom);

    return card;
}

function setupFavoriteButton(artworkId) {
    const button = document.getElementById(`cardFavorite-${artworkId}`);
    if (button) {
        button.addEventListener("click", (ev) => {
            let favoritesArr = JSON.parse(localStorage.getItem("favorites")) || [];
            const id = ev.target.closest("button").value;
            
            // Remove from favorites
            favoritesArr = favoritesArr.filter((favId) => favId !== id);
            localStorage.setItem("favorites", JSON.stringify(favoritesArr));
            
            // Remove card from DOM
            const card = button.closest(".card");
            card.remove();
            
            // Check if there are any favorites left
            const container = document.getElementById("favorites-container");
            if (container.children.length === 0) {
                container.innerHTML = "<p>No favorite artworks yet. <a href='./index.html'>Go back to browse artworks</a></p>";
            }
            
            console.log("Favorites updated:", favoritesArr);
        });
    }
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

addEventListener("load", () => {
    main();
});
