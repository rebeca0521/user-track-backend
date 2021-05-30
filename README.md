# user-track-backend

## API DOC

### api-1: User Track ⾜跡列表

[GET] https://user-track-backend.herokuapp.com/users

Query:

-   phone
-   code
-   page
-   limit

### api-2: Create a new User Track

[POST] https://user-track-backend.herokuapp.com/users

request body:

```
{
    "code": "351061574005530",
    "phone": "0956000531",
    "time": "2021-05-30T20:20:00"
}
```

### api-3: Update User Track

[PUT] https://user-track-backend.herokuapp.com/users

Query:

-   id
    request body:

```
{
    "code": "351061574005530",
    "phone": "0956000531",
    "time": "2021-05-30T20:20:00"
}
```

### api-4: 透過 code 查詢到過之所有電話, 不考慮時間區間

[GET] https://user-track-backend.herokuapp.com/users/:code
