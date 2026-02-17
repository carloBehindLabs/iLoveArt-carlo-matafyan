## iLoveArt-carlo-matafyan

# used api:
https://api.artic.edu/api/v1/artworks?fields=id,title,artist_display,date_display,main_reference_number,dimensions,category_ids,category_titles,classification_ids,classification_titles,term_titles,image_id,short_description,description,place_of_origin
exhibition_history
publication_history
medium_display

https://www.artic.edu/iiif/2/{image_id}/full/843,/0/default.jpg
main page: https://api.artic.edu/api/v1/artworks?page=1&limit=12&fields=id,title,artist_title,date_display,image_id,thumbnail,artwork_type_title,is_public_domain
detail page: https://api.artic.edu/api/v1/artworks/{id}?fields=
id,title,artist_title,artist_display,date_display,place_of_origin,description,short_description,medium_display,dimensions,credit_line,publication_history,exhibition_history,provenance_text,artwork_type_title,department_title,classification_title,material_titles,style_titles,subject_titles,image_id,alt_image_ids,is_zoomable
https://api.artic.edu/api/v1/galleries
