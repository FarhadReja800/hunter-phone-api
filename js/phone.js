const loadPhone = async(searchText, isShowAll) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data
    displayPhone(phones, isShowAll);
    // console.log(phones);
}


const displayPhone = (phones, isShowAll) =>{
    // console.log(phones);
    const phoneContainer = document.getElementById('phone-container');

    phoneContainer.innerHTML = '';
    const showAllContainer = document.getElementById('show-all-container');
    if(phones.length > 12 && !isShowAll){
        showAllContainer.classList.remove('hidden')

    }
    else{
        showAllContainer.classList.add('hidden');
    }
    if(!isShowAll){
        phones = phones.slice(0,12);
    }

    phones.forEach(phone =>{
        // console.log(phone)


        const phoneCard = document.createElement('div');
        phoneCard.classList = `card  bg-slate-200 shadow-xl p-5`;

        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p></p>
          <div class="card-actions justify-center">
            <button onclick="showAllDetails('${phone.slug}');
            show_details_modal.showModal()" class="btn btn-primary "> Show Details</button>
          </div>
        </div>

        `;
        phoneContainer.appendChild(phoneCard);
        
    });
    toggolLoadingSpinner(false);
    
}


const showAllDetails = async (id) =>{
    // console.log('show', id)

    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)

    const data = await res.json();
    console.log(data);
    const phone = data.data;
    showPhoneDetails(phone);
    

}

const showPhoneDetails = (phone) =>{
    console.log(phone)
    const phoneName = document.getElementById('show-phone-name');
    phoneName.innerText = phone.name;

    const showDetailsContainer = document.getElementById('phone-details-container');
    showDetailsContainer.innerHTML = `
    

    <img class"" src="${phone.image}" alt="" />
    
    <p><span>Storage: </span>${phone.mainFeatures.chipSet}</p>
    <p><span>Display Size: </span>${phone.mainFeatures.displaySize}</p>
    <p><span>Memory: </span>${phone.mainFeatures.memory}</p>
    <p><span>Sensors: </span>${phone.mainFeatures.sensors}</p>
     <p><span>Bluetooth: </span>${phone.others.Bluetooth}</p>
     <h4>${phone.brand}</h4>
     <p><span>GPS: </span>${phone.others.GPS}</p>
     <p><span>NFC: </span>${phone.others.NFC}</p>
     <p><span>Radio: </span>${phone.others.Radio}</p>
     <p><span>USB: </span>${phone.others.USB}</p>
     <p><span>WLAN: </span>${phone.others.WLAN}</p>
     <p><span>Release Date: </span>${phone.releaseDate}</p>
     
     
     <p><span>WLAN: </span>${phone.slug}</p>
     


   


    <button class="btn bg-blue-700 text-white hover:bg-blue-400 ml-1 justify-center">Close</button>
    `


    show_details_modal.showModal();

}


//onclick

const searchBtn = (isShowAll) =>{
    toggolLoadingSpinner(true)
const searchField = document.getElementById('search-phone');
const searchText = searchField.value;
loadPhone(searchText, isShowAll);


}


const toggolLoadingSpinner = (isLoading) =>{
    const loadingSpinner = document.getElementById('loading-spinner');
   if(isLoading){
    loadingSpinner.classList.remove('hidden')
   }
   else{
    loadingSpinner.classList.add('hidden');
   }

}

const showAllContainer = () =>{
    searchBtn(true);
}




