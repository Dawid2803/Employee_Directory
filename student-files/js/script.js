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
    console.log(employees);
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
        
        employees.forEach(employee => {

            
            const correctCell = formatCellphone(employee.cell);
            console.log('not formatted: '+employee.cell);
            console.log('formatted: '+correctCell);
            

            
            //codeblock for getting actualBirthday
            //set employee.dob.date to a new Date
                //declare a day,month and year variable from employee.dob.date
                //concat the 3 variables by means of a literal template in the correct format
            const birthday = new Date(employee.dob.date);
            //add one to birthdayMonth because .getMonth method returns 0-11 for Jan-Dec
            const birthdayMonth = (birthday.getMonth(birthday)) + 1;
            const birthdayDay = birthday.getDate(birthday);
            const birthdayYear = birthday.getFullYear(birthday);
            const actualBirthday = `${birthdayMonth}/${birthdayDay}/${birthdayYear}`
            
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
                        <p class="modal-text">(${employee.cell}</p>
                        <p class="modal-text">${employee.location.street.name}, ${employee.location.street.number}, ${employee.location.country}, ${employee.location.postcode}</p>
                        <p class="modal-text">Birthday: ${actualBirthday}</p>
                    </div>
                </div>
            </div>
             `)
            })
        
        // adds a close function for the modal-containers    
        const closeButtons = document.querySelectorAll(".modal-close-btn");
        closeButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                //Targets the modal-container by means of DOM traversal
                console.log(e.target.parentNode.parentNode.parentNode);
                if(e.target.parentNode.parentNode.parentNode.className === 'modal-container' ){
                e.target.parentNode.parentNode.parentNode.style.display = 'none';
                }//if e.target.parentNode.parentNode.parentNode === 'body', bug?
                    //workaround for the bug for now
                else{
                    e.target.parentNode.parentNode.style.display = 'none';
  
                }
            })
        })
        const modalContainers = document.querySelectorAll('.modal-container');
        modalContainers.forEach(modal => {
            modal.style.display = 'none';

        });




        // for(let i = 0; i < employees.length; i++){
        //     employees[i].addEventListener('click', (e) => {
        //         if(`${employees[i].name.first} ${employees[i].name.last}` === `${e.target.name.first} ${e.target.name.last}`){
        //             modalContainers[i].style.display = 'block';
        //             }
        //         })
        //     }


        gallery.addEventListener('click',  (e) => {
        // this insures the modal will be displayed if the user
        //     clicks anywhere on the employee card
        //         work in progress//

           








            if(e.target.className !== "gallery" ){
                const employeeCard = e.target;
                const employeeCardName = employeeCard.lastElementChild.firstElementChild.textContent;
                console.log(employeeCard);

                console.log(e.target);
                const targetEmployeeCardName = e.target.querySelector('#name').textContent;
                console.log(targetEmployeeCardName);
                for(let i=0; i < employees.length; i++){
                    const employeeName = `${employees[i].name.first} ${employees[i].name.last}`;

                    if(employeeName === employeeCardName){
                        modalContainers[i].style.display = 'block';
                        }
                    }   
               }




            })
    });

    
        
    function formatCellphone(data) {
        const onlyNumbers = data.replace(/^\D*/g,'');
        console.log('onlyNumbers: '+onlyNumbers);
        const cellFormatted = onlyNumbers.match(/^(\d{3})(\d{3})(\d{4})$/);
        if(cellFormatted){
            return `(${cellFormatted[1]}) ${cellFormatted[2]}-${cellFormatted[3]}`;
            }
        else{
            return;
        }
    };





    


