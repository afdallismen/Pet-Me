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
        email: String
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
        email: String
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
