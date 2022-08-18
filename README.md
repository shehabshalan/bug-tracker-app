# What is this?
it is a bug tracker with multi-level authentication and authorization using JWT. it is built with Node.js, Express.js, and MongoDB for the api, and React.js and Material UI for the frontend.

**Demo**: https://document-library-api.herokuapp.com/

*Please allow for 20 seconds or so for the demo. it uses Heroku's free plan and it could take time to boot up.*

### Requirements
- Node v16
- React v18

## How to run?
**Clone the repo**. 

  ```
  git clone https://github.com/shehabshalan/document-library
  ```
Navigate to the document-library
  ```
  cd document-library
  ```
**Backend**:
- Navigate to backend folder
  ```
  cd backend
  ```
- Install packages using  npm 
    ```
  npm install
  ```
- Create .env file in the root folder (below command uses windows cmd)
  ```
  type . > .env
  ```
- Run the backend
  ```
  npm start
  ```
**Frontend**:
- Navigate to frontend folder
  ```
  cd frontend
  ```
- Install packages using npm
    ```
  npm install
  ```
- Run the frontend
  ```
  npm start
  ```
## Assumptions:
- There is no authentication hence the system is built for a single user, but files can shared with others.
- Not all files will be previewed.

## How to test?
- if both backend and frontend are running correctly, then you can navigate to localhost:3000.
- upload a file or files using the upload area. 
- each file such PDF / Excel / Word/ txt/ pictures documents will be assigned a corresponding icon based on the file type.
- you will instantlly get the uploaded file/files in the document area. 
- click on download to download or click on share to share the file for a specified duration. 
- set the specified duration as you wish but make it one minute from your current time so you can see the link expiring after that 1 minute.
- you will get a generated link, copy the link and paste it in a new tab. 
- come back after one minute and try the copied link again. it should show that the link has expired.

## Architecture

![architecture](https://user-images.githubusercontent.com/30008865/177472581-72341a49-766b-4f94-8c52-30bc97840223.png)

## Improvements
- Adding authentication to allow more users and have each user only get their own uploads.
- File validation such as type, size etc.
- Document preview for all document types allowed, currently only images and pdfs support preview.
- Web viewer for documents. This is to allow users to view documents inside the browser.
- UI tweaks.

## Inside look:

![Animation](https://user-images.githubusercontent.com/30008865/177664882-4849d693-ce5d-47d9-8623-34dc224e3f05.gif)


## Core Tech Stack:
| Tech stack  | Version |
| ------------- | ------------- |
| React.js  | 18.2.0  |
| Node.js  | 16.13.2  |
| Express.js  | 4.18.1  |
| MongoDB using mongoose  | 6.4.2  |
| Cloudinary  | 1.30.0  |
| MUI  | 5.8.6  |
