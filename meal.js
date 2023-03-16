const doingFetch = (inputText) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputText}`
    fetch(url)
        .then(res => res.json())
        .then(data => showMeal(data.meals))
}

const showMeal = (meals) => {
    const divMain = document.getElementById('div-main');
    divMain.innerHTML = '';//search korrar por jate ager ta remove hoye jai tai
    meals.forEach(meal => {
        // console.log(meal.idMeal)
        const newDiv = document.createElement('div');
        newDiv.innerHTML = `
        <div class="col">
            <div class="card h-100">
                <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            </div>
            <button onclick="setModal2(${meal.idMeal})" type="button" class="btn btn-primary w-25 m-3 text-center" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Details
            </button>
        </div>
        `;
        divMain.appendChild(newDiv);
    });
}

const takeInput = () => {
    const inputText = document.getElementById('inp-search').value;

    doingFetch(inputText);
}

// const setModal = (idMeal) => {
//     // console.log(idMeal);
//     const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
//     fetch(url)
//         .then(res => res.json())
//         .then(data => viewModal(data))
//         .catch (error=>{
//             console.log(error);
//         })
// }

//async await example with try and catch
const setModal2= async(idMeal)=>{
    try {
        const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
        const response = await fetch(url);
        const data = await response.json();
        viewModal(data);
    } catch (error) {
        console.log(error)
    }

}

const viewModal = (mealName) => {
    // console.log(mealName.meals[0].strMealThumb)
    const modalTitle = document.getElementById('exampleModalLabel');
    modalTitle.innerText = mealName.meals[0].strMeal;
    const modalImage = document.getElementById('meal-details-body');
    modalImage.innerHTML=`
        <img class="img-fluid" src="${mealName.meals[0].strMealThumb}">
        
    `
}


doingFetch('rice');