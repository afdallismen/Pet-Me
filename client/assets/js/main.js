$(document).ready(function() {
    getAnimalData()
})


function getAnimalData() {
    console.log('hahaha')
    console.log(data.animals.length)
    console.log(data.animals[0].name)

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

        $('.cardview-container').append(`
        <div class="cardview border">
            <div class="p-2">
                <div class="cardview-image">
                    <img src="${pet[i].photos[0].medium}" alt="">
                </div>
            </div>
            <div class="px-2 cardview-name">
                ${pet[i].name}
            </div >
            <div class="px-2 f-10">
                ${pet[i].gender}, ${pet[i].breeds.primary}
            </div>
            <div class="px-2 flex flex-end">
                <button type="button" class="btn btn-primary btn-sm paw-button py-0 px-1" onclick="getPetDetail('${pet[i].id}')"><i class="fas fa-paw"></i> </button>
            </div>
        </div>
        `)
    }
}

function getPetDetail(data) {
    //GET https://api.petfinder.com/v2/animals/{id}
    //findOne
    $('.detail-name').text(`${data.name}`)
    $('.detail-description').text(`${data.age} . ${data.gender} . ${data.size}`)
    $('.detail-image').attr('src', data.photos[0].medium)
    

    $('.detail-about').empty()
    $('.detail-about').append('Contact: ' + data.contact.email + '<br>')
    $('.detail-about').append('Phone: ' + data.contact.phone + '<br>')
    $('.detail-about').append('Address: ' + data.contact.address + '<br>')
}

function searchThePet(){
    console.log('haha')
    console.log($('#search-input').val())
}


const data = {
    "animals": [
        {
            "id": 44594627,
            "organization_id": "TX2252",
            "url": "https://www.petfinder.com/dog/gretta-44594627/tx/colleyville/salvaged-souls-pet-rescue-tx2252/?referrer_id=2dcdd47c-2adc-483f-8fc4-62787e502710",
            "type": "Dog",
            "species": "Dog",
            "breeds": {
                "primary": "Terrier",
                "secondary": null,
                "mixed": false,
                "unknown": false
            },
            "colors": {
                "primary": "Apricot / Beige",
                "secondary": null,
                "tertiary": null
            },
            "age": "Young",
            "gender": "Female",
            "size": "Small",
            "coat": "Medium",
            "attributes": {
                "spayed_neutered": false,
                "house_trained": true,
                "declawed": null,
                "special_needs": false,
                "shots_current": true
            },
            "environment": {
                "children": true,
                "dogs": true,
                "cats": true
            },
            "tags": [],
            "name": "Gretta",
            "description": "Gretta is a sweetheart!!!  She LOVES to cuddle on your lap, or just be anywhere near her human!  She is...",
            "photos": [
                {
                    "small": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/44594627/2/?bust=1556804470&width=100",
                    "medium": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/44594627/2/?bust=1556804470&width=300",
                    "large": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/44594627/2/?bust=1556804470&width=600",
                    "full": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/44594627/2/?bust=1556804470"
                },
                {
                    "small": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/44594627/1/?bust=1556804469&width=100",
                    "medium": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/44594627/1/?bust=1556804469&width=300",
                    "large": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/44594627/1/?bust=1556804469&width=600",
                    "full": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/44594627/1/?bust=1556804469"
                },
                {
                    "small": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/44594627/3/?bust=1556804470&width=100",
                    "medium": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/44594627/3/?bust=1556804470&width=300",
                    "large": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/44594627/3/?bust=1556804470&width=600",
                    "full": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/44594627/3/?bust=1556804470"
                },
                {
                    "small": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/44594627/4/?bust=1556804471&width=100",
                    "medium": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/44594627/4/?bust=1556804471&width=300",
                    "large": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/44594627/4/?bust=1556804471&width=600",
                    "full": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/44594627/4/?bust=1556804471"
                }
            ],
            "status": "adoptable",
            "published_at": "2019-05-02T13:37:07+0000",
            "contact": {
                "email": "info@salvagedsoulspetrescue.org",
                "phone": "(817) 988-3649",
                "address": {
                    "address1": null,
                    "address2": null,
                    "city": "Colleyville",
                    "state": "TX",
                    "postcode": "76034",
                    "country": "US"
                }
            },
            "_links": {
                "self": {
                    "href": "/v2/animals/44594627"
                },
                "type": {
                    "href": "/v2/types/dog"
                },
                "organization": {
                    "href": "/v2/organizations/tx2252"
                }
            }
        },
        {
            "id": 44594629,
            "organization_id": "NY237",
            "url": "https://www.petfinder.com/dog/zuma-44594629/ny/sidney/delaware-valley-humane-society-ny237/?referrer_id=2dcdd47c-2adc-483f-8fc4-62787e502710",
            "type": "Dog",
            "species": "Dog",
            "breeds": {
                "primary": "Labrador Retriever",
                "secondary": "Husky",
                "mixed": true,
                "unknown": false
            },
            "colors": {
                "primary": null,
                "secondary": null,
                "tertiary": null
            },
            "age": "Young",
            "gender": "Female",
            "size": "Extra Large",
            "coat": "Short",
            "attributes": {
                "spayed_neutered": true,
                "house_trained": true,
                "declawed": null,
                "special_needs": false,
                "shots_current": true
            },
            "environment": {
                "children": true,
                "dogs": true,
                "cats": true
            },
            "tags": [],
            "name": "Zuma",
            "description": null,
            "photos": [
                {
                    "small": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/44594629/1/?bust=1556804165&width=100",
                    "medium": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/44594629/1/?bust=1556804165&width=300",
                    "large": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/44594629/1/?bust=1556804165&width=600",
                    "full": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/44594629/1/?bust=1556804165"
                },
                {
                    "small": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/44594629/2/?bust=1556804178&width=100",
                    "medium": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/44594629/2/?bust=1556804178&width=300",
                    "large": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/44594629/2/?bust=1556804178&width=600",
                    "full": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/44594629/2/?bust=1556804178"
                },
                {
                    "small": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/44594629/3/?bust=1556804180&width=100",
                    "medium": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/44594629/3/?bust=1556804180&width=300",
                    "large": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/44594629/3/?bust=1556804180&width=600",
                    "full": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/44594629/3/?bust=1556804180"
                }
            ],
            "status": "adoptable",
            "published_at": "2019-05-02T13:36:47+0000",
            "contact": {
                "email": "dvhs.sidney@gmail.com",
                "phone": "(607) 563-7780",
                "address": {
                    "address1": "101 East Main Street",
                    "address2": "P.O. Box 182",
                    "city": "Sidney",
                    "state": "NY",
                    "postcode": "13838",
                    "country": "US"
                }
            },
            "_links": {
                "self": {
                    "href": "/v2/animals/44594629"
                },
                "type": {
                    "href": "/v2/types/dog"
                },
                "organization": {
                    "href": "/v2/organizations/ny237"
                }
            }
        },
        {
            "id": 44594617,
            "organization_id": "WA676",
            "url": "https://www.petfinder.com/dog/josie-44594617/wa/port-orchard/hello-pitty-rescue-wa676/?referrer_id=2dcdd47c-2adc-483f-8fc4-62787e502710",
            "type": "Dog",
            "species": "Dog",
            "breeds": {
                "primary": "American Staffordshire Terrier",
                "secondary": null,
                "mixed": false,
                "unknown": false
            },
            "colors": {
                "primary": "Black",
                "secondary": "White / Cream",
                "tertiary": null
            },
            "age": "Adult",
            "gender": "Female",
            "size": "Medium",
            "coat": "Short",
            "attributes": {
                "spayed_neutered": true,
                "house_trained": true,
                "declawed": null,
                "special_needs": false,
                "shots_current": true
            },
            "environment": {
                "children": null,
                "dogs": true,
                "cats": null
            },
            "tags": [],
            "name": "Josie",
            "description": "Josie is in need of a foster or adoptive home!\n\nWe had the opportunity to pull Josie from the San...",
            "photos": [
                {
                    "small": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/44594617/3/?bust=1556803810&width=100",
                    "medium": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/44594617/3/?bust=1556803810&width=300",
                    "large": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/44594617/3/?bust=1556803810&width=600",
                    "full": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/44594617/3/?bust=1556803810"
                },
                {
                    "small": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/44594617/1/?bust=1556803805&width=100",
                    "medium": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/44594617/1/?bust=1556803805&width=300",
                    "large": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/44594617/1/?bust=1556803805&width=600",
                    "full": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/44594617/1/?bust=1556803805"
                },
                {
                    "small": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/44594617/2/?bust=1556803808&width=100",
                    "medium": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/44594617/2/?bust=1556803808&width=300",
                    "large": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/44594617/2/?bust=1556803808&width=600",
                    "full": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/44594617/2/?bust=1556803808"
                },
                {
                    "small": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/44594617/4/?bust=1556803813&width=100",
                    "medium": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/44594617/4/?bust=1556803813&width=300",
                    "large": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/44594617/4/?bust=1556803813&width=600",
                    "full": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/44594617/4/?bust=1556803813"
                },
                {
                    "small": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/44594617/5/?bust=1556803911&width=100",
                    "medium": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/44594617/5/?bust=1556803911&width=300",
                    "large": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/44594617/5/?bust=1556803911&width=600",
                    "full": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/44594617/5/?bust=1556803911"
                }
            ],
            "status": "adoptable",
            "published_at": "2019-05-02T13:35:16+0000",
            "contact": {
                "email": "hellopittyrescue@gmail.com",
                "phone": "(208) 954-4699",
                "address": {
                    "address1": null,
                    "address2": null,
                    "city": "Port Orchard",
                    "state": "WA",
                    "postcode": "98366",
                    "country": "US"
                }
            },
            "_links": {
                "self": {
                    "href": "/v2/animals/44594617"
                },
                "type": {
                    "href": "/v2/types/dog"
                },
                "organization": {
                    "href": "/v2/organizations/wa676"
                }
            }
        }
    ],
    "pagination": {
        "count_per_page": 3,
        "total_count": 4944880,
        "current_page": 2,
        "total_pages": 1648294,
        "_links": {
            "previous": {
                "href": "/v2/animals?limit=3&page=1&type=dog"
            },
            "next": {
                "href": "/v2/animals?limit=3&page=3&type=dog"
            }
        }
    }
}



