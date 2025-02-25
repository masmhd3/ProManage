//get elements
let title = document.getElementById('title')
let price = document.getElementById('price')
let taxes = document.getElementById('taxes')
let ads = document.getElementById('ads')
let discount = document.getElementById('discount')
let count = document.getElementById('count')
let category = document.getElementById('category')
let create = document.getElementById('submit')
let total = document.getElementById('total')

//moods
let mood = 'create'
let ii;

//total
function getTotal (){
    total.innerHTML = (+price.value + +taxes.value + +ads.value) - Number(discount.value)
    if(price.value != '' && title.value != ''){
        total.style.backgroundColor = 'green'
        //delete disabled
        taxes.disabled = false;
        ads.disabled = false;
        discount.disabled = false;
        

    }else{
        total.style.backgroundColor = '#a00d02'
        //add disabled
        taxes.disabled = true;
        ads.disabled = true;
        discount.disabled = true;

        //delete input value
        ads.value = ''
        discount.value = ''
        taxes.value = ''
    }

}
//functions
price.onkeyup = getTotal
taxes.onkeyup = getTotal
ads.onkeyup = getTotal
discount.onkeyup = getTotal



//create data
let dataPro;
if(localStorage.products != null){
    dataPro = JSON.parse(localStorage.products)
}else{
    dataPro = []
}
create.onclick = function(){

    if(total.style.backgroundColor == 'green'){

        //make data better
        ads.value == ''? ads.value = 0:ads.value = ads.value;
        taxes.value == ''? taxes.value = 0:taxes.value = taxes.value;
        discount.value == ''? discount.value = 0:discount.value = discount.value;
        count.value == ''? count.value = 1:count.value = count.value;
        category.value == ''? category.value = 'unknown':category.value = category.value;


        //data to object
        let dataObj = {
            title: title.value,
            taxes: taxes.value,
            price: price.value,
            ads: ads.value,
            discount: discount.value,
            total: total.innerHTML,
            count: count.value,
            category: category.value,
        }

        //create data
        if(mood == 'create'){
            if(dataObj.count > 1){
                for(let i = 0; i < dataObj.count; i++){
                    dataPro.push(dataObj)
                }
            }else{
                dataPro.push(dataObj)
            }
        }else{
            dataPro[ii].title = title.value
            dataPro[ii].price = price.value
            dataPro[ii].ads = ads.value
            dataPro[ii].taxes = taxes.value
            dataPro[ii].category = category.value
            dataPro[ii].discount = discount.value
            console.log(dataPro[ii])
            count.style.display = 'block'
            mood = 'create'
            create.innerHTML = 'create'
        }

        //locaStorage
        localStorage.setItem('products',JSON.stringify(dataPro))

        // to add data
        addDataInHTML()
        //delete value of inputs
        delValInp()

    }else{
        alert('check name or price to create')
    }
}

//delete value of inputs
function delValInp(){
    title.value = ''
    price.value = ''
    ads.value = ''
    taxes.value = ''
    count.value = ''
    discount.value = ''
    category.value = ''
    total.innerHTML = '0'
    total.style.backgroundColor = '#a00d02'
}


//add data in HTML
function addDataInHTML(){
    let tbody = document.getElementById('tbody')
    tbody.innerHTML = ''
    for (let i = 0; i < dataPro.length ; i++){
        tbody.innerHTML += `
            <tr>
                <td>${i + 1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="updateRaw(${i})">update</button></td>
                <td><button onclick="deleteRaw( ${i} )">delete</button></td>
            </tr>`;
    }
    
    
    let btnDelAll = document.getElementById('delete-all')
    if(dataPro.length > 0){
        btnDelAll.style.display = 'block'
    }else{
        btnDelAll.style.display = 'none'
    }
}
addDataInHTML()


// delete raw 
function deleteRaw(i){
    dataPro.splice(i,1)
    localStorage.products = JSON.stringify(dataPro);
    addDataInHTML()
}

//delete all
let btnDelAll = document.getElementById('delete-all')
function deleteAll(){
    localStorage.clear();
    dataPro.splice(0)
    addDataInHTML()
}

//update
function updateRaw(i){
    // upload data
    title.value = dataPro[i].title
    taxes.value = dataPro[i].taxes
    ads.value = dataPro[i].ads
    discount.value = dataPro[i].discount
    category.value = dataPro[i].category
    price.value = dataPro[i].price
    //
    count.style.display = 'none'
    getTotal()//total

    //mood
    create.innerHTML = 'Update'
    mood = 'Update'
    create.innerHTML = mood
    ii = i
    scroll({
        top:0,
        behavior:'smooth',
    })
}



//search////
let searchName = document.getElementById('search by name');
let searchCategory = document.getElementById('search by category');
let searchInp = document.getElementById('search');
let searchMood ='name';
function getSearchMood(id){
    searchInp.placeholder = id
    searchInp.focus()

    // delete value of search input when click on
    searchInp.value = ''
}


function searchFunc(value){
    let table =  '';
    if(searchMood == 'name' ){
        for(let i = 0; i < dataPro.length; i++){
            if(dataPro[i].title.toLowerCase().startsWith(value.toLowerCase())){
                table += `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick="updateRaw(${i})">update</button></td>
                        <td><button onclick="deleteRaw( ${i} )">delete</button></td>
                    </tr>`;

            }else{
                if(dataPro[i].category.toLowerCase().startsWith(value.toLowerCase())){
                    table += `
                        <tr>
                            <td>${i + 1}</td>
                            <td>${dataPro[i].title}</td>
                            <td>${dataPro[i].price}</td>
                            <td>${dataPro[i].taxes}</td>
                            <td>${dataPro[i].ads}</td>
                            <td>${dataPro[i].discount}</td>
                            <td>${dataPro[i].total}</td>
                            <td>${dataPro[i].category}</td>
                            <td><button onclick="updateRaw(${i})">update</button></td>
                            <td><button onclick="deleteRaw( ${i} )">delete</button></td>
                        </tr>`;
    
                }
            }

        }
    }
    document.getElementById('tbody').innerHTML = table
}















