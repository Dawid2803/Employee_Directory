//declaration of all globar variables//

const doc = document.querySelector("body");
const search = document.querySelector('.search-container');
const gallary = document.querySelector('#gallery');
const modalContainer = document.createElement('div');
modalContainer.className = 'modal-container';



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

    const employees = userData.results;
    console.log(employees);
    return employees

}

addHTML(search, `
<form action="#" method="get">
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
</form>`);


//uses the data fetched from the API and creates employee cards with required
//contact details
getEmployeeData('https://randomuser.me/api/?results=12')
    .then(employees => {
        employees.map(employee => {

            addHTML(gallary, ` 
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
    })//work in progress//
    .then(doc.addEventListener('click', (e) => {
        if(e.target.className === "card"){
            addHTML(modalContainer, `
            <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
                    <h3 id="name" class="modal-name cap">name</h3>
                    <p class="modal-text">email</p>
                    <p class="modal-text cap">city</p>
                    <hr>
                    <p class="modal-text">(555) 555-5555</p>
                    <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
                    <p class="modal-text">Birthday: 10/21/2015</p>
                </div>
            </div>
            `);    
        }
    }));

    


