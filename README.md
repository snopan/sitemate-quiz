# sitemate-quiz

The following is the solution to a quiz provided by sitemate

## Requirement

The quiz was to create a simple REST API Server + Client for Issues

ssues can be hard-coded JSON objects with just 3 attributes: id, title + description. 

The client + server should accept or send these hardcoded JSON objects according to each API call: Create, Read, Update & Delete.

### REST API Server
The server should support these 4 standard operations: 
* Create: accepts a JSON object & prints/logs the object
* Read: returns a static JSON object
* Update: accepts a JSON object & prints/logs the object
* Delete: prints/logs out the object or id to delete

### REST API Client
The client should support the same 4 standard operations:
* Create: sends a JSON object to the server
* Read: requests a JSON object & prints it out
* Update: sends a JSON object to the server
* Delete: requests the server delete an issue 

## Solution
The REST API Server and Client is written in node js, where
Server uses express
Client uses axios and prompts

To run the project please navigate to each directory `/client` and `/server`
then install dependencies
`npm install`
and run the program
`npm run start`