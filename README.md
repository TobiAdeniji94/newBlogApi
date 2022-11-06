# newBlogApi
This is an api for a blog app

## Setup
* Install Nodejs, mongoDB
* Pull this repo
* Update env with .env
* run ``` npm run start ```

# Base URL


***


# Models
***

## User
Fields | data Type | constraints
---| --- | --- |
id | ObjectId | required
first_name | String | required
last_name | String | required
email | String | required
password | String | required

## Blog Post
Fields | data Type | constraints
---| --- | --- |
title | String | required
description | String | required
tags | String | required
author | String | required
state | String | required, enum ["draft", "published"]
read_count | Number | 
reading_time | Number | 
body | String | required
timestamps | dateTime |

## APIs


### Register User
* Route:  /auth/register
* Method: POST
* Body: 
```
{
    "first_name": "toyosi",
    "last_name": "adeniji",
    "email": "toyosiiade@gmail.com",
      "password": "1234567899"
}
```
* Responses

Success
```
{
  "message": "Registration successful",
  "data": {
    "userData": {
      "first_name": "toyosi",
      "last_name": "adeniji",
      "email": "toyosiiade@gmail.com",
      "password": "$2b$10$Mk.b65hvVFtzltupPnu.c.DDqUqLJ0P.toDrT9.ozXxIaG85iP/Jq",
      "_id": "6367c0c677ec91264672b449",
      "createdAt": "2022-11-06T14:12:22.981Z",
      "updatedAt": "2022-11-06T14:12:22.981Z",
      "__v": 0
    }
  }
}
```

***

### Login User
* Route: /auth/login
* Method: POST
* Body: 

```
{
  "email": "toyosiiade@gmail.com",
  "password": "1234567899"
}
```
* Responses

Success
```
{
  "message": "Login succcessful",
  "data": {
    "userData": {
      "_id": "6367c0c677ec91264672b449",
      "first_name": "toyosi",
      "last_name": "adeniji",
      "email": "toyosiiade@gmail.com",
      "password": "$2b$10$Mk.b65hvVFtzltupPnu.c.DDqUqLJ0P.toDrT9.ozXxIaG85iP/Jq",
      "createdAt": "2022-11-06T14:12:22.981Z",
      "updatedAt": "2022-11-06T14:12:22.981Z",
      "__v": 0
    }
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjYzNjdjMGM2NzdlYzkxMjY0NjcyYjQ0OSIsImZpcnN0X25hbWUiOiJ0b3lvc2kiLCJsYXN0X25hbWUiOiJhZGVuaWppIiwiZW1haWwiOiJ0b3lvc2lpYWRlQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJE1rLmI2NWh2VkZ0emx0dXBQbnUuYy5ERHFVcUxKMFAudG9EclQ5Lm96WHhJYUc4NWlQL0pxIiwiY3JlYXRlZEF0IjoiMjAyMi0xMS0wNlQxNDoxMjoyMi45ODFaIiwidXBkYXRlZEF0IjoiMjAyMi0xMS0wNlQxNDoxMjoyMi45ODFaIiwiX192IjowfSwiaWF0IjoxNjY3NzQzOTQ4LCJleHAiOjE2Njc3NDc1NDh9.jERswApxydoA0GuvgF5Dy2DdYl9XzduEXZYd2PlwXW4"
}
```

***

### Create Blog Post
* Route: /blogs/create
* Method: POST
* Header
    * Authorizaton: ${token}
* Body:

```
{
  "title": "My First API",
  "description": "Writing my First API",
  "author": "Toyosi Adeniji",
  "body": "I downloaded MongoDB, NodeJS...",
  "tags": "API, First, MongoDB"
}
```

* Response

Success
```
{
  "message": "Blog created successfully",
  "data": {
    "title": "My First API",
    "description": "Writing my First API",
    "author": "Toyosi Adeniji",
    "state": "draft",
    "tags": [
      "API, First, MongoDB"
    ],
    "body": "I downloaded MongoDB, NodeJS...",
    "_id": "6367d095977baa543b5189cc",
    "createdAt": "2022-11-06T15:19:49.495Z",
    "updatedAt": "2022-11-06T15:19:49.495Z",
    "reading_time": 1,
    "__v": 0
  }
}
```

***

### Update Post State
* Route: /blogs/:id/update
* Method: PATCH
* Header
    * Authorizaton: ${token}
* Body:

```
{
  "state": "published"
}
```
* Response

Success

```
{
  "message": "Blog successfully updated",
  "data": {
    "_id": "6367d095977baa543b5189cc",
    "title": "My First API",
    "description": "Writing my First API",
    "author": "Toyosi Adeniji",
    "state": "published",
    "tags": [
      "API, First, MongoDB"
    ],
    "body": "I downloaded MongoDB, NodeJS...",
    "createdAt": "2022-11-06T15:19:49.495Z",
    "updatedAt": "2022-11-06T15:21:10.885Z",
    "reading_time": 1,
    "__v": 0
  }
}
```

***

### Update Post
* Route: /blogs/:id/update
* Method: PATCH
* Header
    * Authorizaton: ${token}
* Body:

```
{
  "title": "Updated my First API",
  "description": "Fixing bugs in my First API",
  "tags": [ "API, First, MongoDB, Update, Bugs"],
  "body": "Ran tests on my API and I found bugs..."
}
```

* Response

Success
```
{
  "message": "Blog successfully updated",
  "data": {
    "_id": "6367d095977baa543b5189cc",
    "title": "Updated my First API",
    "description": "Fixing bugs in my First API",
    "author": "Toyosi Adeniji",
    "state": "published",
    "tags": [
      "API, First, MongoDB, Update, Bugs"
    ],
    "body": "Ran tests on my API and I found bugs...",
    "createdAt": "2022-11-06T15:19:49.495Z",
    "updatedAt": "2022-11-06T15:25:53.817Z",
    "reading_time": 1,
    "__v": 0
  }
}
```

***

### Get Post By Id
* Route: /blogs/:id
* Method: GET
* Response

Success
```
{
  "message": "Blog successfully fetched",
  "data": {
    "_id": "6367d095977baa543b5189cc",
    "title": "Updated my First API",
    "description": "Fixing bugs in my First API",
    "author": "Toyosi Adeniji",
    "state": "published",
    "tags": [
      "API, First, MongoDB, Update, Bugs"
    ],
    "body": "Ran tests on my API and I found bugs...",
    "createdAt": "2022-11-06T15:19:49.495Z",
    "updatedAt": "2022-11-06T15:25:55.959Z",
    "reading_time": 1
  }
}
```


*** 

### Get Posts By User
* Route: /blogs/:id/user-posts'
* Method: GET
* Header
    * Authorizaton: ${token}
* Query Params
    * limit default(20)
    * state
* Response

```
{
  "message": "Blogs successfully fetched",
  "data": [
    {
      "_id": "6367d095977baa543b5189cc",
      "title": "Updated my First API",
      "description": "Fixing bugs in my First API",
      "author": "Toyosi Adeniji",
      "state": "published",
      "tags": [
        "API, First, MongoDB, Update, Bugs"
      ],
      "body": "Ran tests on my API and I found bugs...",
      "createdAt": "2022-11-06T15:19:49.495Z",
      "updatedAt": "2022-11-06T15:25:55.959Z",
      "reading_time": 1,
      "__v": 0
    }
  ]
}
```

***

### Delete Post
* Route: /blogs/:id/delete
* Method: DELETE
* Header
    * Authorizaton: ${token}
* Response

Success
```
{
  "message": "Blog successfully deleted"
}
```

***
### Get All Posts
* Route: /blogs/
* Method: GET
* Query Param
    * limit (default 20)
    * author
    * state
    * title
    * tags
    * sort (-read_count || read_count || -reading_time || reading_time || -createdAt || createdAt )

* Responses

Success
```
{
  "message": "Blogs successfully fetched",
  "data": [
    {
      "_id": "6367dd70b152b299b94099e5",
      "title": "My First API",
      "description": "Writing my First API",
      "author": "Toyosi Adeniji",
      "state": "published",
      "tags": [
        "API, First, MongoDB"
      ],
      "body": "I downloaded MongoDB, NodeJS...",
      "createdAt": "2022-11-06T16:14:40.572Z",
      "updatedAt": "2022-11-06T16:16:15.747Z",
      "reading_time": 1,
      "__v": 0
    },
    {
      "_id": "6367dcc0bbb7929ffae766d2",
      "title": "Success",
      "description": "Writing second post",
      "author": "Toyosi Adeniji",
      "state": "draft",
      "tags": [
        "API, Second"
      ],
      "body": "This is my second post created with the API I wrote",
      "createdAt": "2022-11-06T16:11:44.221Z",
      "updatedAt": "2022-11-06T16:11:44.221Z",
      "reading_time": 1,
      "__v": 0
    }
  ]
}
```

***
### Tests
* To run test
     * run ```npm run test```
	

***
