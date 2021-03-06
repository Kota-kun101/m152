import { getAll, remove, get, save, saveRating }  from './model.js'; 
import { render } from './view.js'; 
import { render as form } from './form.js'; 
export async function listAction(request, response) {   
    const data = await getAll(request.user.id);   
    const body = render(data); 
    response.send(body); 
} 

export async function removeAction(request, response) {     
    const id  = parseInt(request.params.id, 10);   
    await remove(id)   ;   
    response.redirect(request.baseUrl); 
} 

export async function formAction(request, response) {     
    let movie = {
         id: '', 
         title: '', 
         year: '',
         isPublic: '',
         ownerId: '',
        };    

    if (request.params.id)    
    {     
        movie = await get(parseInt(request.params.id, 10)) ; 
    } 
    console.log(movie);   
    const body = form(movie);   
    response.send(body); 
} 

export async function saveAction(request, response) {     
    const movie = { 
        id: request.body.id, 
        title: request.body.title, 
        year: request.body.year,
        isPublic: request.body.isPublic,
        ownerId: request.user.id
    };   

    await save(movie);   
    response.redirect(request.baseUrl);
} 

export async function saveActionRating(request, response){
    console.log(request);

    const rating = {
        user: request.user.id,
        movie: request.params.movieId,
        rating: request.params.rating
    }

    await saveRating(rating);
    response.redirect(request.baseUrl);
}