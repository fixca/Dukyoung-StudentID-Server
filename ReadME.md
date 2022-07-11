# Dukyoung-StudentID-Server

## Install
```
npm install
npm start
```

## API
### Logging
--- 
### URL
> /api/logging
### BODY
|KEY|DESC|TYPE|
|------|---|---|
|key|An API key|string|
|id|A specific ID for each student|string|
|room_id|A specific ID for each room|string|
|timestamp|A timestamp based on Unix timestamp|int|
### RESULT
Success
|KEY|DESC|TYPE|
|------|---|---|
|success|success code (boolean style int) should be 1 if success|int|

Failure
|KEY|DESC|TYPE|
|------|---|---|
|success|success code (boolean style int) should be 0 if failed|int|
|failure|failure code (check below section for more information)|int|

Failure code
|CODE|DESC|
|------|---|
|0|Invalid querys|
|1|Invalid KEY|
|2|Internal server error|
|3|Too many requests|

All failure code will be replaced to status code.   
