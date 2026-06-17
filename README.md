# I Love Art 🎨

A beautiful web application for exploring and discovering artworks from the **Art Institute of Chicago** collection. Browse thousands of artworks, search by title or artist, view detailed information, and save your favorite pieces to your personal collection.

## Features

✨ **Browse Artworks** - Explore a curated collection of 12 artworks per page from the Art Institute of Chicago
🔍 **Search Functionality** - Search artworks by title or artist name in real-time
❤️ **Favorites System** - Save your favorite artworks to localStorage and view them anytime
📱 **Responsive Design** - Beautiful, responsive UI that works on all devices
🖼️ **Detailed Views** - Click on any artwork to see comprehensive information including:
  - Artwork title and artist name
  - Description and historical information
  - Date and dimensions
  - Medium and artwork type
  - And more!
🏠 **Easy Navigation** - Quick logo click to return to homepage from anywhere

## Technology Stack

- **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
- **API:** Art Institute of Chicago REST API
- **Storage:** Browser LocalStorage (for favorites)
- **Image Proxy:** AllOrigins CORS Proxy (for image loading)

## API Endpoints

### 1. **Main Artworks Listing**
```
GET https://api.artic.edu/api/v1/artworks?page=1&limit=12&fields=id,title,artist_title,date_display,image_id,thumbnail,artwork_type_title,is_public_domain
```
- **Purpose:** Fetch 12 artworks for the homepage
- **Returns:** Basic artwork information including ID, title, artist, image ID, and type
- **Used in:** `main.js` - Homepage

### 2. **Artwork Details**
```
GET https://api.artic.edu/api/v1/artworks/{id}?fields=id,title,artist_title,artist_display,date_display,place_of_origin,description,short_description,medium_display,dimensions,credit_line,publication_history,exhibition_history,provenance_text,artwork_type_title,department_title,classification_title,material_titles,style_titles,subject_titles,image_id,alt_image_ids,is_zoomable
```
- **Purpose:** Fetch comprehensive information for a specific artwork
- **Parameters:** `{id}` - The artwork ID from the listing
- **Returns:** Detailed artwork information including description, dimensions, medium, and more
- **Used in:** `details.js` and `favorites.js` - Details and Favorites pages

### 3. **Artwork Images (IIIF Image Server)**
```
https://www.artic.edu/iiif/2/{image_id}/full/400,400/0/default.jpg
```
- **Purpose:** Retrieve artwork images from the IIIF (International Image Interoperability Framework) server
- **Parameters:**
  - `{image_id}` - The image ID from the artwork data
  - `400,400` - Image size (width,height) - adjustable per use case
- **Note:** CORS proxy (`https://api.allorigins.win/raw?url=`) is used to bypass CORS restrictions
- **Used in:** All pages for displaying artwork thumbnails and full images

## How It Works

### Homepage (`index.html`)
- Fetches 12 artworks on page load
- Displays them in a responsive grid layout
- Allows users to:
  - Click artwork to view details
  - Add/remove from favorites (heart button)
  - Search for artworks in real-time

### Details Page (`details.html`)
- Fetches complete artwork information using artwork ID from URL parameter
- Displays comprehensive artwork details
- Allows adding/removing from favorites
- Navigate back to homepage via logo

### Favorites Page (`favorites.html`)
- Loads artwork IDs stored in browser localStorage
- Fetches details for each favorite artwork
- Displays favorites in a grid layout
- Remove items from favorites directly from this page
- Search functionality works on favorites

### Search Functionality
- Real-time search across artwork titles and artist names
- Works on all pages (homepage, favorites)
- Enter key or button click to search
- Displays results dynamically

## Local Storage

The application uses browser localStorage to persist user preferences:

**Key:** `favorites`
**Value:** JSON array of artwork IDs
**Example:** `["12345", "67890", "11111"]`

Favorites are automatically saved whenever the user adds or removes an artwork from their collection.

## File Structure

```
iLoveArt-carlo-matafyan/
├── index.html          # Homepage
├── details.html        # Artwork details page
├── favorites.html      # Favorites page
├── main.js             # Homepage logic & search
├── details.js          # Details page logic
├── favorites.js        # Favorites page logic
├── style.css           # Main styles
├── details.css         # Details page styles
└── README.md           # This file
```

## Installation & Usage

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd iLoveArt-carlo-matafyan
   ```

2. **Open in browser**
   - Simply open `index.html` in your web browser
   - Or use a local server:
     ```bash
     python -m http.server 8000
     # Then visit http://localhost:8000
     ```

3. **Explore artworks**
   - Browse the homepage
   - Click any artwork to view details
   - Use the search bar to find specific artworks
   - Click the heart icon to add to favorites
   - Visit the Favorites page to see your collection

## Browser Compatibility

- Chrome/Edge (Latest)
- Firefox (Latest)
- Safari (Latest)
- Mobile browsers

## Features in Detail

### Search
- Type in the search box and press Enter or click the search button
- Searches across artwork titles and artist names
- Case-insensitive matching
- Works on both homepage and favorites page

### Favorites Management
- Click the heart icon on any artwork card to add/remove from favorites
- Favorites are saved in browser localStorage
- Favorites persist even after closing the browser
- View all favorites on the dedicated Favorites page

### Image Loading
- Uses CORS proxy to handle Art Institute's image restrictions
- Gracefully falls back to placeholder image if loading fails
- High-quality IIIF images for detailed artwork viewing

## API Documentation

For more information about the Art Institute of Chicago API, visit:
- **API Base:** https://api.artic.edu/api/v1/
- **Documentation:** https://api.artic.edu/docs/

## Notes

- The application is a static website with no backend server required
- All data is fetched from the Art Institute of Chicago public API
- User preferences (favorites) are stored locally in the browser
- Images are loaded via a CORS proxy to work around server restrictions

## Author

Carlo Matafyan

## License

This project uses data from the Art Institute of Chicago API, which is publicly available.
