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
        url:'http://localhost:3000/animals/',
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
    for(let i = 0; i < pet.length; i++) {
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
    })
    .fail((jqXHR, textStatus) => {
        console.log(jqXHR)
    })
}
function sendRequestPost(query) {
    console.log(query)
    $.ajax({
        url: 'http://localhost:3000/animals',
        method: 'GET',
        data: query
    })
    .done(response => {
        console.log(response)
        $('.cardview-container').empty()
        showAnimalData(response)
    })
    .fail((jqXHR, textStatus) => {
        console.log('fail request')
    })
}

function searchByBreed(){
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
    if($('.search-breed').val() !== "") query.breed = $('.search-breed').val()
    if($('.search-type').val() !== "") query.type = $('.search-type').val()
    if($('.search-gender').val() !== "") query.gender = $('.search-gender').val()
    if($('.search-size').val() !== "") query.size = $('.search-size').val()

    sendRequestPost(query)
}

function openDetail() {
    $('.cardview-container').hide()
    $('.detail-container').show()
}

<<<<<<< HEAD
function closeDetail() {
    $('.cardview-container').show()
    $('.detail-container').hide()
}
=======
// const data = {
//     "animals": [
//         {
//             "id": 44601178,
//             "organization_id": "MI760",
//             "url": "https://www.petfinder.com/dog/winnie-44601178/mi/swartz-creek/paws-rescue-mi760/?referrer_id=2dcdd47c-2adc-483f-8fc4-62787e502710",
//             "type": "Dog",
//             "species": "Dog",
//             "breeds": {
//                 "primary": "Labrador Retriever",
//                 "secondary": "Boxer",
//                 "mixed": true,
//                 "unknown": false
//             },
//             "colors": {
//                 "primary": null,
//                 "secondary": null,
//                 "tertiary": null
//             },
//             "age": "Baby",
//             "gender": "Female",
//             "size": "Medium",
//             "coat": "Short",
//             "attributes": {
//                 "spayed_neutered": true,
//                 "house_trained": false,
//                 "declawed": null,
//                 "special_needs": false,
//                 "shots_current": true
//             },
//             "environment": {
//                 "children": true,
//                 "dogs": true,
//                 "cats": true
//             },
//             "tags": [
//                 "Very Sweet",
//                 "mellow",
//                 "loves attention"
//             ],
//             "name": "Winnie",
//             "description": "Winnie is about 11 weeks as of 5/2/19.  This sweet girl is very good with other dogs and cats and...",
//             "photos": [
//                 {
//                     "small": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/44601178/1/?bust=1556851953&width=100",
//                     "medium": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/44601178/1/?bust=1556851953&width=300",
//                     "large": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/44601178/1/?bust=1556851953&width=600",
//                     "full": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/44601178/1/?bust=1556851953"
//                 },
//                 {
//                     "small": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/44601178/2/?bust=1556851961&width=100",
//                     "medium": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/44601178/2/?bust=1556851961&width=300",
//                     "large": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/44601178/2/?bust=1556851961&width=600",
//                     "full": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/44601178/2/?bust=1556851961"
//                 }
//             ],
//             "status": "adoptable",
//             "published_at": "2019-05-03T02:55:37+0000",
//             "contact": {
//                 "email": "pawsrescuemail@gmail.com",
//                 "phone": null,
//                 "address": {
//                     "address1": "PO Box 87",
//                     "address2": null,
//                     "city": "Swartz Creek",
//                     "state": "MI",
//                     "postcode": "48473",
//                     "country": "US"
//                 }
//             },
//             "_links": {
//                 "self": {
//                     "href": "/v2/animals/44601178"
//                 },
//                 "type": {
//                     "href": "/v2/types/dog"
//                 },
//                 "organization": {
//                     "href": "/v2/organizations/mi760"
//                 }
//             }
//         },
//         {
//             "id": 44601197,
//             "organization_id": "OK37",
//             "url": "https://www.petfinder.com/dog/marc-307895-44601197/ok/oklahoma-city/oklahoma-city-animal-welfare-division-ok37/?referrer_id=2dcdd47c-2adc-483f-8fc4-62787e502710",
//             "type": "Dog",
//             "species": "Dog",
//             "breeds": {
//                 "primary": "Pit Bull Terrier",
//                 "secondary": null,
//                 "mixed": true,
//                 "unknown": false
//             },
//             "colors": {
//                 "primary": null,
//                 "secondary": null,
//                 "tertiary": null
//             },
//             "age": "Adult",
//             "gender": "Male",
//             "size": "Medium",
//             "coat": null,
//             "attributes": {
//                 "spayed_neutered": true,
//                 "house_trained": false,
//                 "declawed": null,
//                 "special_needs": false,
//                 "shots_current": true
//             },
//             "environment": {
//                 "children": null,
//                 "dogs": null,
//                 "cats": null
//             },
//             "tags": [],
//             "name": "MARC 307895",
//             "description": "Marc is a 2 year old, 51 pound Pit Bull Terrier mix.\n\nThe dog/cat adoption fee, which is normally $60...",
//             "photos": [
//                 {
//                     "small": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/44601197/1/?bust=1556851938&width=100",
//                     "medium": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/44601197/1/?bust=1556851938&width=300",
//                     "large": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/44601197/1/?bust=1556851938&width=600",
//                     "full": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/44601197/1/?bust=1556851938"
//                 }
//             ],
//             "status": "adoptable",
//             "published_at": "2019-05-03T02:53:11+0000",
//             "contact": {
//                 "email": "animalwelfare@okc.gov",
//                 "phone": "405-297-3100  ",
//                 "address": {
//                     "address1": "2811 SE 29th Street",
//                     "address2": null,
//                     "city": "Oklahoma City",
//                     "state": "OK",
//                     "postcode": "73129",
//                     "country": "US"
//                 }
//             },
//             "_links": {
//                 "self": {
//                     "href": "/v2/animals/44601197"
//                 },
//                 "type": {
//                     "href": "/v2/types/dog"
//                 },
//                 "organization": {
//                     "href": "/v2/organizations/ok37"
//                 }
//             }
//         },
//         {
//             "id": 44601193,
//             "organization_id": "TX2320",
//             "url": "https://www.petfinder.com/dog/graclynn-44601193/tx/beaumont/beaumont-pets-alive-tx2320/?referrer_id=2dcdd47c-2adc-483f-8fc4-62787e502710",
//             "type": "Dog",
//             "species": "Dog",
//             "breeds": {
//                 "primary": "Chihuahua",
//                 "secondary": null,
//                 "mixed": true,
//                 "unknown": false
//             },
//             "colors": {
//                 "primary": "Bicolor",
//                 "secondary": "Black",
//                 "tertiary": null
//             },
//             "age": "Adult",
//             "gender": "Female",
//             "size": "Small",
//             "coat": "Short",
//             "attributes": {
//                 "spayed_neutered": true,
//                 "house_trained": false,
//                 "declawed": null,
//                 "special_needs": false,
//                 "shots_current": false
//             },
//             "environment": {
//                 "children": null,
//                 "dogs": null,
//                 "cats": null
//             },
//             "tags": [],
//             "name": "Graclynn",
//             "description": null,
//             "photos": [
//                 {
//                     "small": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/44601193/1/?bust=1556851911&width=100",
//                     "medium": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/44601193/1/?bust=1556851911&width=300",
//                     "large": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/44601193/1/?bust=1556851911&width=600",
//                     "full": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/44601193/1/?bust=1556851911"
//                 }
//             ],
//             "status": "adoptable",
//             "published_at": "2019-05-03T02:52:36+0000",
//             "contact": {
//                 "email": "beaumontpetsalive@gmail.com",
//                 "phone": "(409) 241-5833",
//                 "address": {
//                     "address1": null,
//                     "address2": null,
//                     "city": "Beaumont",
//                     "state": "TX",
//                     "postcode": "77706",
//                     "country": "US"
//                 }
//             },
//             "_links": {
//                 "self": {
//                     "href": "/v2/animals/44601193"
//                 },
//                 "type": {
//                     "href": "/v2/types/dog"
//                 },
//                 "organization": {
//                     "href": "/v2/organizations/tx2320"
//                 }
//             }
//         },
//         {
//             "id": 44601185,
//             "organization_id": "ON377",
//             "url": "https://www.petfinder.com/dog/charlie-number-2-44601185/on/oakville/a-dogs-dream-rescue-on377/?referrer_id=2dcdd47c-2adc-483f-8fc4-62787e502710",
//             "type": "Dog",
//             "species": "Dog",
//             "breeds": {
//                 "primary": "Hound",
//                 "secondary": null,
//                 "mixed": true,
//                 "unknown": false
//             },
//             "colors": {
//                 "primary": "Black",
//                 "secondary": "Yellow / Tan / Blond / Fawn",
//                 "tertiary": null
//             },
//             "age": "Adult",
//             "gender": "Male",
//             "size": "Medium",
//             "coat": "Short",
//             "attributes": {
//                 "spayed_neutered": true,
//                 "house_trained": false,
//                 "declawed": null,
//                 "special_needs": false,
//                 "shots_current": true
//             },
//             "environment": {
//                 "children": null,
//                 "dogs": true,
//                 "cats": null
//             },
//             "tags": [],
//             "name": "Charlie #2",
//             "description": "Charlie,  3 year old male Hound mix, weighs 55 pounds. Charlie was an owner surrender to the shelter because he...",
//             "photos": [
//                 {
//                     "small": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/44601185/1/?bust=1556851720&width=100",
//                     "medium": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/44601185/1/?bust=1556851720&width=300",
//                     "large": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/44601185/1/?bust=1556851720&width=600",
//                     "full": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/44601185/1/?bust=1556851720"
//                 },
//                 {
//                     "small": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/44601185/2/?bust=1556851723&width=100",
//                     "medium": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/44601185/2/?bust=1556851723&width=300",
//                     "large": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/44601185/2/?bust=1556851723&width=600",
//                     "full": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/44601185/2/?bust=1556851723"
//                 }
//             ],
//             "status": "adoptable",
//             "published_at": "2019-05-03T02:52:34+0000",
//             "contact": {
//                 "email": "adogsdreamrescue@cogeco.ca",
//                 "phone": "(905) 617-0427",
//                 "address": {
//                     "address1": null,
//                     "address2": null,
//                     "city": "Oakville",
//                     "state": "ON",
//                     "postcode": "L6H 1K4",
//                     "country": "CA"
//                 }
//             },
//             "_links": {
//                 "self": {
//                     "href": "/v2/animals/44601185"
//                 },
//                 "type": {
//                     "href": "/v2/types/dog"
//                 },
//                 "organization": {
//                     "href": "/v2/organizations/on377"
//                 }
//             }
//         },
//         {
//             "id": 44601192,
//             "organization_id": "OK37",
//             "url": "https://www.petfinder.com/dog/max-282265-44601192/ok/oklahoma-city/oklahoma-city-animal-welfare-division-ok37/?referrer_id=2dcdd47c-2adc-483f-8fc4-62787e502710",
//             "type": "Dog",
//             "species": "Dog",
//             "breeds": {
//                 "primary": "Pit Bull Terrier",
//                 "secondary": null,
//                 "mixed": true,
//                 "unknown": false
//             },
//             "colors": {
//                 "primary": null,
//                 "secondary": null,
//                 "tertiary": null
//             },
//             "age": "Adult",
//             "gender": "Male",
//             "size": "Medium",
//             "coat": null,
//             "attributes": {
//                 "spayed_neutered": true,
//                 "house_trained": false,
//                 "declawed": null,
//                 "special_needs": false,
//                 "shots_current": true
//             },
//             "environment": {
//                 "children": null,
//                 "dogs": true,
//                 "cats": null
//             },
//             "tags": [],
//             "name": "MAX 282265",
//             "description": "MAx is a 2.5 year old, 36 pound Pit Bull Terrier mix.\n\nThe dog/cat adoption fee, which is normally $60...",
//             "photos": [
//                 {
//                     "small": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/44601192/1/?bust=1556851845&width=100",
//                     "medium": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/44601192/1/?bust=1556851845&width=300",
//                     "large": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/44601192/1/?bust=1556851845&width=600",
//                     "full": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/44601192/1/?bust=1556851845"
//                 }
//             ],
//             "status": "adoptable",
//             "published_at": "2019-05-03T02:51:23+0000",
//             "contact": {
//                 "email": "animalwelfare@okc.gov",
//                 "phone": "405-297-3100  ",
//                 "address": {
//                     "address1": "2811 SE 29th Street",
//                     "address2": null,
//                     "city": "Oklahoma City",
//                     "state": "OK",
//                     "postcode": "73129",
//                     "country": "US"
//                 }
//             },
//             "_links": {
//                 "self": {
//                     "href": "/v2/animals/44601192"
//                 },
//                 "type": {
//                     "href": "/v2/types/dog"
//                 },
//                 "organization": {
//                     "href": "/v2/organizations/ok37"
//                 }
//             }
//         },
//         {
//             "id": 44601176,
//             "organization_id": "SC80",
//             "url": "https://www.petfinder.com/dog/chase-44601176/sc/rock-hill/operation-care-sc80/?referrer_id=2dcdd47c-2adc-483f-8fc4-62787e502710",
//             "type": "Dog",
//             "species": "Dog",
//             "breeds": {
//                 "primary": "Australian Shepherd",
//                 "secondary": "Labrador Retriever",
//                 "mixed": true,
//                 "unknown": false
//             },
//             "colors": {
//                 "primary": "Brindle",
//                 "secondary": null,
//                 "tertiary": null
//             },
//             "age": "Young",
//             "gender": "Male",
//             "size": "Medium",
//             "coat": "Medium",
//             "attributes": {
//                 "spayed_neutered": true,
//                 "house_trained": true,
//                 "declawed": null,
//                 "special_needs": false,
//                 "shots_current": true
//             },
//             "environment": {
//                 "children": true,
//                 "dogs": true,
//                 "cats": true
//             },
//             "tags": [],
//             "name": "Chase",
//             "description": "Meet Chase! He is a 9 month old Aussie mix boy. Chase is a super sweet boy! Wide open but...",
//             "photos": [
//                 {
//                     "small": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/44601176/1/?bust=1556851572&width=100",
//                     "medium": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/44601176/1/?bust=1556851572&width=300",
//                     "large": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/44601176/1/?bust=1556851572&width=600",
//                     "full": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/44601176/1/?bust=1556851572"
//                 },
//                 {
//                     "small": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/44601176/2/?bust=1556851575&width=100",
//                     "medium": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/44601176/2/?bust=1556851575&width=300",
//                     "large": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/44601176/2/?bust=1556851575&width=600",
//                     "full": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/44601176/2/?bust=1556851575"
//                 }
//             ],
//             "status": "adoptable",
//             "published_at": "2019-05-03T02:50:26+0000",
//             "contact": {
//                 "email": "operationcareadoptions@yahoo.com",
//                 "phone": "803-417-2347",
//                 "address": {
//                     "address1": "PO Box 10703",
//                     "address2": null,
//                     "city": "Rock Hill",
//                     "state": "SC",
//                     "postcode": "29730",
//                     "country": "US"
//                 }
//             },
//             "_links": {
//                 "self": {
//                     "href": "/v2/animals/44601176"
//                 },
//                 "type": {
//                     "href": "/v2/types/dog"
//                 },
//                 "organization": {
//                     "href": "/v2/organizations/sc80"
//                 }
//             }
//         }
//     ],
//     "pagination": {
//         "count_per_page": 6,
//         "total_count": 4947373,
//         "current_page": 2,
//         "total_pages": 824563,
//         "_links": {
//             "previous": {
//                 "href": "/v2/animals?limit=6&page=1&type=dog"
//             },
//             "next": {
//                 "href": "/v2/animals?limit=6&page=3&type=dog"
//             }
//         }
//     }
// }
>>>>>>> working user wishes
