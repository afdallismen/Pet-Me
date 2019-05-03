# Pet-Me

### Authentication

- [Registration](#registration)
- [Getting Access Token](#getting-access-token)




#### Registration

<hr>

**Method**: `POST`

**URL**: `/auth/register`

**Request Body**:
```javascript
{
    name: String,
    email: String,
    password: String
}
```

**Response Success**

**Status**: `201`

**Body**:
```javascript
{
    user: {
        _id: String,
        name: String,
        email: String,
        wishes: [ String ]
    }
}
```

**Response Failure**

**Status**: `500`

**Body**:
```javascript
{
    message: "Internal Server Error"
}
```



#### Getting Access Token

<hr>

**Method**: `POST`

**URL**: `/auth/login`

**Request Body**:
```javascript
{
    email: String,
    password: String
}
```

**Response Success**

**Status**: `201`

**Body**:
```javascript
{
    user: {
        _id: String,
        name: String,
        email: String,
        wishes: [ String ]
    },
    token: String
}
```

**Response Failure**

**Status**: `500`

**Body**:
```javascript
{
    message: "Internal Server Error"
}
```


#### Add wish

**Method**: `PUT`

**URL**: `/wishes`

**Request Body**:
```javascript
{
    pet_id: String
}
```

**Response Success**

**Status**: `200`

**Body**:
```javascript
{
    user: {
        _id: String,
        name: String,
        email: String,
        wishes: [ String ]
    }
}
```

**Response Failure**

**Status**: `500`

**Body**:
```javascript
{
    message: "Internal Server Error"
}
```



#### Remove Wish

<hr>

**Method**: `DELETE`

**URL**: `/wishes/:pet_id`

**Response Success**

**Status**: `200`

**Body**:
```javascript
{
    user: {
        _id: String,
        name: String,
        email: String,
        wishes: [ String ]
    }
}
```

**Response Failure**

**Status**: `500`

**Body**:
```javascript
{
    message: "Internal Server Error"
}
```
