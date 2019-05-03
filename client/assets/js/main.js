$(document).ready(function() {
    $('.wishes-link').click(handleClickWishesLink)
    getAnimalData()
    if(localStorage.PetMe_token) {
        hideLogin()
    } else showLogin()
    closeDetail()
})

function handleClickWishesLink (e) {
    let { wishes } = JSON.parse(localStorage.getItem('PetMe_user'))

    console.log(wishes)

    Promise.all(
        wishes.map(pet_id => {
            return axios.get(`http://localhost:3000/animals/${pet_id}`).then(({ data }) => data)
        })
    ).then(pets => {
        $('.wishes-list').html('')
        pets.forEach(pet => {
            $('#wishes-list').append(wishesItem(pet))
        })
    })
}

function getAnimalData() {
    $.ajax({
        url: 'http://localhost:3000/animals/',
        method: 'GET',
        data: {
            limit: 20,
            type: 'Dog'
        }
    })
        .done(response => {
            showAnimalData(response)
        })
        .catch((jqXHR, textStatus) => {
            console.log(jqXHR)
        })

}

function showAnimalData(data) {
    let pet = data.animals
    for (let i = 0; i < pet.length; i++) {
        // console.log(pet[i].name)
        // console.log(pet[i].age, pet[i].gender)
        // console.log(pet[i].colors.primary);
        // console.log(pet[i].photos)
        // console.log(pet[i].photos[0].medium)
        // console.log(pet[i].breeds.primary)
        // console.log(pet[i].breeds.secondary)
        // console.log(pet[i].contact)
        // console.log(pet[i].contact.email)
        // console.log(pet[i].contact.phone)
        // console.log(pet[i].contact.address)
        // console.log('-----------------------')
        let wished = JSON.parse(localStorage.getItem('PetMe_user')).wishes.includes(String(pet[i].id))
        $('.cardview-container').append(`
        <div class="cardview border">
            <div class="p-2">
                <div class="cardview-image">
                    <img src="${pet[i].photos[0].medium}" alt="">
                </div>
            </div>
            <div class="px-2 cardview-name overflow-hidden">
                ${pet[i].name}
            </div >
            <div class="px-2 f-10 cardview-detail">
                ${pet[i].gender}, ${pet[i].breeds.primary}
            </div>
            <div class="px-2 flex flex-end">
                ${!wished ? `<a href="#" class="mr-1 add-wish" data-id="${pet[i].id}">Wish this</a>` : ''}
                <button type="button" class="btn btn-primary btn-sm paw-button py-0 px-1" onclick="getPetDetail('${pet[i].id}')"><i class="fas fa-paw"></i> </button>
            </div>
        </div>
        `)
    }

    $('.add-wish').click(handleClickAddWish)
}

function wishesItem ({ animal }) {
    return `
    <div class="col-3">
        <div class="card">
            <div class="control" style="position: absolute; top: 0; right: 0;">
            <button class="btn btn-info px-1 py-0 delete-wish" data-id="${animal.id}">
                <i class="fa fa-close"></i>
            </button>
            </div>
            <img src="http://picsum.photos/30" class="card-img-top">
            <div class="card-body">
            <h5 class="card-title">${animal.name}</h5>
            <p class="card-text">${animal.description}</p>
            </div>
        </div>
    </div>
    `
}

function handleClickAddWish(e) {
    e.preventDefault()

    axios
        .put('http://localhost:3000/wishes', {
            pet_id: $(this).data('id')
        }, {
            headers: {
                Authorization: localStorage.getItem('PetMe_token')
            }
        })
        .then(({ data }) => {
            localStorage.setItem('PetMe_user', JSON.stringify(data.user))
        })
        .catch(err => console.log(err))
}

function getPetDetail(id) {
    //GET https://api.petfinder.com/v2/animals/{id}
    //findOne
    // $('.detail-name').text(`${data.name}`)
    // $('.detail-description').text(`${data.age} . ${data.gender} . ${data.size}`)
    // $('.detail-image').attr('src', data.photos[0].medium)


    // $('.detail-about').empty()
    // $('.detail-about').append('Contact: ' + data.contact.email + '<br>')
    // $('.detail-about').append('Phone: ' + data.contact.phone + '<br>')
    // $('.detail-about').append('Address: ' + data.contact.address + '<br>')

    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/animals/' + id
    })
        .done(response => {
            let details = response.animal

        openDetail()

        $('.detail-name').text(`${details.name}`)
        $('.detail-description').text(`${details.breeds.primary} . ${details.age} . ${details.gender} . ${details.size}`)
        $('.detail-image').attr('src', details.photos[0].medium)

        $('.detail-about').empty()
        $('#static-map-container').empty()
        $('#addr').empty()
        $('.detail-about').append('Contact: ' + details.contact.email + '<br>')
        $('.detail-about').append('Phone: ' + details.contact.phone + '<br>')
        $('#static-map-container').append(
            `<div class="row">
                <div class="span4"></div>
                <div class="span4"><img src="https://maps.googleapis.com/maps/api/staticmap?center=${details.contact.address.address1}&zoom=12&size=600x300&markers=color:red%7Clabel:%7C${details.contact.address.address1}&maptype=hybrid&key=AIzaSyBvszf7pWDZ7MA-umkI-U7EEAj8jTYTLDQ">
                <div class="span4"></div>
            </div>
        `)
        $('#addr').append(
            `<h5>Address</h5>
            <p>${details.contact.address.address1}</p>
        `)
        populateWiki(details.breeds.primary)
    })
    .fail((jqXHR, textStatus) => {
        console.log(jqXHR)
    })}

function populateWiki(query) {
    if (query) {
        $.ajax({
            method: 'GET',
            url: `http://localhost:3000/details/${query+' '+'pet'}`
        })
            .done(response => {
                $('#wikiSearch').html('')
                response.forEach(entry => {
                    $('#wikiSearch').append(`
                  <div class="col-4">
                        <div class="card" >
                        <!-- <img class="card-img-top" src="..." alt="Card image cap"> -->
                            <div class="card-body">
                            <h5 class="card-title">${entry.title}</h5>
                            <p class="card-text text-overflow">${entry.text}</p>
                        <a href="https://en.wikipedia.org/?curid=${entry.pageid}" class="btn btn-primary">see wikipedia</a>
                        </div>
                    </div>
                    </div>
                  `)
                })
            })
            .fail((jqXHR, textStatus) => {
                $('#wikiSearch').html('')
            })

    }
}


function sendRequestPost(query) {
    console.log(query)
    $.ajax({
        url: 'http://localhost:3000/animals',
        method: 'GET',
        data: query
    })
        .done(response => {
            $('.cardview-container').empty()
            showAnimalData(response)
        })
        .fail((jqXHR, textStatus) => {
            console.log('fail request')
        })
}

function searchByBreed() {
    // console.log('haha')
    // console.log($('#search-input').val())
    // console.log($('.search-breed').val())
    closeDetail()
    sendRequestPost({breed: $('.search-breed').val()})
}

function advanceSearchPet() {
    // console.log('tombol jalan')
    // console.log($('.search-breed').val())
    // console.log($('.search-type').val())
    // console.log($('.search-gender').val())
    // console.log($('.search-size').val())
    closeDetail()
    let query = {}
    if ($('.search-breed').val() !== "") query.breed = $('.search-breed').val()
    if ($('.search-type').val() !== "") query.type = $('.search-type').val()
    if ($('.search-gender').val() !== "") query.gender = $('.search-gender').val()
    if ($('.search-size').val() !== "") query.size = $('.search-size').val()

    sendRequestPost(query)
}

function openDetail() {
    $('.cardview-container').hide()
    $('.detail-container').show()
}

function closeDetail() {
    $('.cardview-container').show()
    $('.detail-container').hide()
}
