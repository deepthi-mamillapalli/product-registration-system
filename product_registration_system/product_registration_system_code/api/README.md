# ExpressApiRest

[![Build Status](https://travis-ci.org/Tony133/ExpressApiRest.svg?branch=master)](https://travis-ci.org/Tony133/ExpressApiRest)

Simple Example Api Rest with Express JS Framework and mongodb

## Run app

```
	$ DEBUG=ExpressApiRest:* npm start
```

## Getting with Curl 

```
    $ curl -H 'content-type: application/json' -v -X GET http://localhost:3000/api/books 
    $ curl -H 'content-type: application/json' -v -X GET http://localhost:3000/api/books/:id
    $ curl -H 'content-type: application/json' -v -X POST -d '{"title":"Foo bar","price":"19.99"}' http://localhost:3000/api/books 
    $ curl -H 'content-type: application/json' -v -X PUT -d '{"title":"Foo bar","price":"19.99"}' http://localhost:3000/api/books/:id
    $ curl -H 'content-type: application/json' -v -X DELETE http://localhost:3000/api/books/:id
```
