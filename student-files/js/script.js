//declaration of all globar variables//

const doc = document.querySelector("body");
const search = document.querySelector('.search-container');
const gallery = document.querySelector('#gallery');
let employees =[];



//function to add HTML dynamically//
function addHTML(div, htmlToAdd){
    div.insertAdjacentHTML('beforeend', htmlToAdd);
    return div;
}


//helper function to fetch data and return as JSON//

async function getData(url){
    try{
    const response = await fetch(url);
    return await response.json();
    } catch(error) {
        throw error;
    }
}

async function getEmployeeData(url){
    const userData= await getData(url);
    employees = userData.results;
    return employees

}

addHTML(search, `
<form action="#" method="get">
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
</form>`);


//uses the data fetched from the API and creates employee card objects with required
//contact details
getEmployeeData('https://randomuser.me/api/?results=12')
    .then(employees => {
        employees.map(employee => {
            addHTML(gallery, ` 
            <div class="card">
                <div class="card-img-container">
                    <img class="card-img" src=${employee.picture.large} alt="profile picture">
                </div>
                <div class="card-info-container">
                    <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
                    <p class="card-text">${employee.email}</p>
                    <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
                </div>
            </div>`); 

        
        })
        
    gallery.addEventListener('click',  (e) => {
        //this insures the modal will be displayed if the user
        //clicks anywhere on the employee card
        if(e.target.className !== "gallery" ){
            console.log(e.target);
            employees.forEach(employee => {
                addHTML(doc, `
                <div class="modal-container">
                 <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                        <div class="modal-info-container">
                            <img class="modal-img" src=${employee.picture.large} alt="profile picture">
                            <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
                            <p class="modal-text">${employee.email}</p>
                            <p class="modal-text cap">${employee.location.city}</p>
                            <hr>
                            <p class="modal-text">${employee.cell}</p>
                            <p class="modal-text">${employee.location.street}, ${employee.location.country}, ${employee.location.postcode}</p>
                            <p class="modal-text">Birthday: ${employee.dob.date}</p>
                        </div>
                    </div>
                </div>
                 `);                    
            })
        }        
        })

    //work in progress//
 
 
        

    });

    
        
 

    


