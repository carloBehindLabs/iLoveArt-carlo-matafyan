async function main() {
    const artworks = await getArtworks();
    const artworkElement = document.getElementsByClassName("artworks");
    artworks.data.map((item) => {
        let newCard = createCard(item);
        artworkElement[0].appendChild(newCard);
    });

    console.log("artworks: ", artworks);
}

function createCard(artwork) {
    console.log(artwork);
    const API_URL = "https://www.artic.edu/iiif/2/";
    const API_KEYWORD = "full/843,/0/default.jpg";
    const URL = `${API_URL}${artwork.image_id}/${API_KEYWORD}`;

    let card = document.createElement("div");
    card.className = "card";
    let top = document.createElement("div");
    top.className = "top";
    let bottom = document.createElement("div");
    bottom.className = "bottom";

    let img = document.createElement("img");
    img.src = URL;
    img.alt = artwork.title.split(" ")[0];
    let favorit = document.createElement("button");
    favorit.className = "favorit";
    favorit.id = "favorit";
    let title = document.createElement("h5");
    title.className = "title";
    title.textContent = artwork.artist_title;
    let description = document.createElement("p");
    description.className = "description";
    description.textContent = artwork.title.split(" ").splice(0, 12).join(" ");
    let details = document.createElement("a");
    details.href = `/${artwork.id}`;

    top.appendChild(img);
    top.appendChild(favorit);
    bottom.appendChild(title);
    bottom.appendChild(description);
    bottom.appendChild(details);
    card.appendChild(top);
    card.appendChild(bottom);

    return card;
}

async function getArtworks() {
    const API_URL = "https://api.artic.edu/api/v1/artworks?page=1&limit=12&fields=id,title,artist_title,date_display,image_id,thumbnail,artwork_type_title,is_public_domain";
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