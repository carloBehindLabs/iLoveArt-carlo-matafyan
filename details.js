const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const artworkId = urlParams.get('id');
console.log("artworkId: ", artworkId);

function createDetails(artwork) {
    console.log(artwork);
    const API_URL = "https://www.artic.edu/iiif/2/";
    const API_KEYWORD = "full/843,/0/default.jpg";
    const URL = `${API_URL}${artwork.image_id}/${API_KEYWORD}`;

    let details = document.getElementById("artwork-details");

    let img = document.getElementById("artwork-image");
    img.src = URL;
    img.alt = artwork.title.split(" ")[0];

    let favorite = document.getElementById("cardFavorite");
    favorite.id = "cardFavorite";

    let title = document.getElementById("artwork-title");
    title.innerText = artwork.artist_title;

    let description = document.getElementById("artwork-description");
    description.innerText = artwork.title;

    let date_display = document.getElementById("artwork-date");
    date_display.innerText = artwork.date_display;

    let artist_display = document.getElementById("artwork-artist");
    artist_display.innerText = artwork.artist_display;

    let artwork_type = document.getElementById("artwork-type");
    artwork_type.innerText = artwork.artwork_type_title;

    
    // details.appendChild(title);
    // details.appendChild(description);
    // details.appendChild(img);
    // details.appendChild(artwork_type);
    // details.appendChild(favorite);
    // details.appendChild(artist_display);
    // details.appendChild(date_display);

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
    const artwork = await getArtworkDetails(artworkId);
    const detailsElement = document.getElementsByClassName("main")[0];
    detailsElement.appendChild(createDetails(artwork.data));
    console.log("artwork: ", artwork);
}

addEventListener("load", () => {
    main();
});