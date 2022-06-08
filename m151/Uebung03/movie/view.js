export function render(movies) {   
    return ` 
    <!DOCTYPE html>
    <html lang="en">
    <head>  
        <meta charset="UTF-8">     
        <title>Movie list</title>  
        <link rel="stylesheet" href="./style.css" />
    </head>
    <style>
    .rating {
        display: inline-block;
        position: relative;
        height: 30px;
        line-height: 30px;
        font-size: 30px;
      }
      
      .rating label {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        cursor: pointer;
      }
      
      .rating label:last-child {
        position: static;
      }
      
      .rating label:nth-child(1) {
        z-index: 5;
      }
      
      .rating label:nth-child(2) {
        z-index: 4;
      }
      
      .rating label:nth-child(3) {
        z-index: 3;
      }
      
      .rating label:nth-child(4) {
        z-index: 2;
      }
      
      .rating label:nth-child(5) {
        z-index: 1;
      }
      
      .rating label input {
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
      }
      
      .rating label .icon {
        float: left;
        color: transparent;
      }
      
      .rating label:last-child .icon {
        color: #000;
      }
      
      .rating:not(:hover) label input:checked ~ .icon,
      .rating:hover label:hover input ~ .icon {
        color: #09f;
      }
      
      .rating label input:focus:not(:checked) ~ .icon:last-child {
        color: #000;
        text-shadow: 0 0 5px #09f;
      }
    </style>
    <body>  
        <table>    
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Year</th>
                    <th>Public</th>
                    <th>Rating</th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>    
            <tbody>      
                ${ movies        
                    .map  (           
                        function(movie){ 
                            let checked = movie.isPublic==1?"checked":"";
                                return (
                                    `<tr>    
                                        <td>${ movie.id }</td>          
                                        <td>${ movie.title }</td>
                                        <td>${ movie.year }</td>         
                                        <td><input type="checkbox" id="isPublic" name="isPublic" value="1" ${checked} disabled/></td>
                                        <td>
                                            <div class="rating">
                                                <label>
                                                    <a href="/movie/save/rating/${ movie.id  }/1">
                                                      <input type="radio" name="${ movie.id }" value="1" ${movie.rating == 1 ? "checked" : ""}/>
                                                      <span class="icon">★</span>
                                                    </a>
                                                </label>
                                                <label>
                                                    <a href="/movie/save/rating/${ movie.id  }/2">
                                                        <input type="radio" name="${ movie.id }" value="2" ${movie.rating == 2 ? "checked" : ""}/>
                                                        <span class="icon">★</span>
                                                        <span class="icon">★</span>
                                                    </a>
                                                </label>
                                                <label>
                                                    <a href="/movie/save/rating/${ movie.id  }/3">
                                                        <input type="radio" name="${ movie.id }" value="3" ${movie.rating == 3 ? "checked" : ""}/>
                                                        <span class="icon">★</span>
                                                        <span class="icon">★</span>
                                                        <span class="icon">★</span>   
                                                    </a>
                                                </label>
                                                <label>
                                                    <a href="/movie/save/rating/${ movie.id  }/4">
                                                        <input type="radio" name="${ movie.id }" value="4" ${movie.rating == 4 ? "checked" : ""}/>
                                                        <span class="icon">★</span>
                                                        <span class="icon">★</span>
                                                        <span class="icon">★</span>
                                                        <span class="icon">★</span>
                                                    </a>
                                                </label>
                                                <label>
                                                    <a href="/movie/save/rating/${ movie.id  }/5">
                                                        <input type="radio" name="${ movie.id }" value="5" ${movie.rating == 5 ? "checked" : ""}/>
                                                        <span class="icon">★</span>
                                                        <span class="icon">★</span>
                                                        <span class="icon">★</span>
                                                        <span class="icon">★</span>
                                                        <span class="icon">★</span>
                                                    </a>
                                                </label>
                                            </div>
                                        </td>
                                        <td><span>${ Math.round(movie.avgrating * 100) / 100 }</span></td>
                                        <td><a href="/movie/delete/${ movie.id  }">löschen</a></td>          
                                        <td><a href="/movie/form/${ movie.id  }">bearbeiten</a></td> 
                                    </tr>`
                                )    
                        })         
                .join('')}     
            </tbody>  
        </table>  
        <a href="/movie/form">neu</a>
        <a href="/logout">abmelden</a>
    </body>
    </html>
    `; 
} 