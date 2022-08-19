# What is this?
it is a bug tracker with multi-level authentication and authorization using JWT. it is built with Node.js, Express.js, and MongoDB for the api, and React.js and Material UI for the frontend.

**Demo**:https://bug-tracker-ui.netlify.app/
*Please allow for 20 seconds or so for the demo. it uses Heroku's free plan and it could take time to boot up.*

**API Documentation**: https://documenter.getpostman.com/view/22906593/VUqoQJjQ


### Requirements
- Node v16
- React v18

## How to run?
**Clone the repo**. 

  ```
  git clone https://github.com/shehabshalan/document-library
  ```
Navigate to the saas-bug-tracker
  ```
  cd saas-bug-tracker
  ```
**API**:
- Navigate to api folder
  ```
  cd bug-tracker-api
  ```
- Install packages using yarn 
    ```
  yarn install
  ```
- Create .env file in the root folder (below command uses windows cmd)
  ```
  type . > .env
  ```
- Run the api
  ```
  yarn dev
  ```
**Frontend**:
- Navigate to frontend folder
  ```
  cd bug-tracker-ui
  ```
- Install packages using npm
    ```
  npm install
  ```
- Run the frontend
  ```
  npm start
  ```

## How it works?
- if both backend and frontend are running correctly, then you can navigate to localhost:3000.
- Sign up and you will be given admin privileges
- Login and add members to your space in the members tab and they will be given user privileges.
- The dashboard will have a breakdown of the top projects along with charts about tickets organized by type, status, and priority.
- Create a project and add members to it. 
- Create a ticket and assign a member to it. 
- A member can navigate to his tickets tab to see tickets that belong to him.
- A ticket can be viewed, created and updated by anyone. 
- A project can be viewed, created by anyone. 
- A member can only be created by an admin.

## Architecture



## Inside look:

Admin View
![admin](https://user-images.githubusercontent.com/30008865/185532980-106d0bec-bdb4-4e72-9b77-0c681d9cd142.gif)


Member View
![member](https://user-images.githubusercontent.com/30008865/185532991-657ab125-3d2c-4966-abac-daa3f2a6807b.gif)



## Core Tech Stack:
| Tech stack  | Version |
| ------------- | ------------- |
| React.js  | 18.2.0  |
| React Query  | 4.0.10  |
| Node.js  | 16.13.2  |
| Express.js  | 4.18.1  |
| MongoDB using mongoose  | 6.4.2  |
| MUI  | 5.8.6  |

