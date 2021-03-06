## About 
Jiayokliao is a medication reminder app that helps sets timely reminder to notify users to take their scheduled medications. This app is also linked to a database of medication details to provide useful information for users on certain medications they are taking. The app also records the quantity of medications users currently have and would remind users when the quantity goes low. 

## Installation 
For the project to run locally on your machine: 
1. <code>npm install</code> to install necessary packages 
2. <code> npx sequelize db:create </code> to set up your database 
3. <code> npx sequelize db:migrate </code> to initiate database migration
4. <code> npx sequelize db:seed:all </code> to initiate seeding of data

## Walkthrough 
<h4> 1. User login </h4>
<img src='https://user-images.githubusercontent.com/94110588/176987772-eb75272a-a926-43b5-943a-205fac946417.png' alt='login page' width='300'/>

<h4> 2. Home page </h4>
<img src='https://user-images.githubusercontent.com/94110588/176987777-a409b974-5888-4906-8da0-0775124e1dc1.png' alt='home page' width='300'/>

<h4> 3. Medication Recording form  </h4>'
<img src='https://user-images.githubusercontent.com/94110588/176987788-27167496-a0ac-4812-9579-1068bf8b6b77.png' alt='form' width='300'/>
<img src='https://user-images.githubusercontent.com/94110588/176987790-80e11487-f74b-439e-bdd1-49e6ba7bd217.png' alt='form' width='300'/>

<h4> 4. Medication library (For searching medications)  </h4>
<img src='https://user-images.githubusercontent.com/94110588/176987801-d685b42b-2138-4269-8ab9-0d3b67b6e5a0.png' alt='library' width='300'/>

<h4> 5. Scheduled notification appears </h4>
<img src='https://user-images.githubusercontent.com/94110588/176987809-358a26e1-fc19-4e2c-9c3c-9cfd080f8b9b.png' alt='notification'/>

## Built with 

#### Frontend 
- ReactJS 

#### Backend 
- NodeJs 
- ExpressJs
- Sequelize/Postgres 

#### Functionalities 
- Cron 
- Firebase Cloud messaging 

#### Styling
- ChakraUI 

## ERD 
https://dbdiagram.io/d/6261578c1072ae0b6ac507e3

## Contact
Cheena - cheena94sing@gmail.com 
