# Design Ideology

Starting from the ground up, we will be discussing each framework that I used and why I chose to use it in this section, along with the overall project folder structure.

## Table of Contents

1. Express.js
2. React.js/Next.js/Material UI
3. MongoDB/Mongoose
4. Separation of back end and front end
5. File Structure

## 1. Express.js

One of the first languages that I learned was, in fact, JavaScript, and, more specifically, Node.js. Consequently, when I looked into learning about making websites/web servers, I stumbled upon Express.js as one of the most widely used libraries for hosting web servers for developers using Node.js, on top of being extremely lightweight and easy to use. For this project, I chose to use a technology that I was familiar with already and wanted to continue to expand on my knowledge in this field.

## 2. React.js/Next.js/Material UI

React.js came into popularity not long ago for its usage of states in the web world and expanded the capability that web developers could access with the technology that it introduced. Because I hadn't used React.js in a project before, I chose to use it in this one and learn as much as I could.

Next.js was a framework choice that is often used with React.js to handle many of the networking requirements that came with React.js (it *really* saved me a lot with the routing, which is, from what I know, not as simple in plain React.js). It also enabled a way for me to easily implement functions where data would be required from the backend server at run time instead of compile time (which, in simpler terms, just means that the website can get data when it loads rather than loading the same site every time you visit it). Of course, there are drawbacks to this, such as the slowdown in website access (which is a major component when search engines score your website), but I decided that it was a necessary drawback for my purposes. 

In line with Next.js, I used the Material UI design framework for all creative aspects, which is modeled after Google's design guidelines and allows me to add further customization onto its already existing capabilities.

With all of these combined technologies, I can now create effective React.js websites using Google's design guidelines (Material) while also not having to worry too much about the routing aspect with Next.js.

## 3. MongoDB/Mongoose

Somewhat alluded to in the README.md, I decided to use MongoDB as I wanted to have a taste of what NoSQL databases were like and what it meant to have data that would be stored non-relationally. In fact, for my project, there were a few aspects that drew on relations (which MongoDB implemented used references and populations). MongoDB also would allow me to add and remove different aspects/columns of each document (or row in relational databases) as needed to adjust to my needs as I worked on the application.

In terms of Mongoose, I decided to use this package to perform a type-checking feature so that all of the data would follow the same format when it was inserted into the database (and to make sure that I didn't accidentally put the wrong type in somewhere in the code). An index was also made in the users model (table) so that I can quickly search for a username case-insensitive (and much more effectively than other methods prove). Overall, many aspects of this database strucutre is still the same as relational databases, just with a much better capability at being able to be horizontally scaled rather than vertically scaled (which means that I can add more smaller servers to handle the server load rather than increasing the capabilities of one server).

## 4. Separation of back end and front end

Many modern systems choose to separate the back end system from the front end system as it allows for both servers to scale horizontally independent of each other and also allows servers to specialize in what they are doing rather than trying to do both at the same time. I chose to adopt this model as well in favor of this, which resulted in the front end server being hosted on port 3000 and the back end server being hosted on port 3001. However, this also caused some minor inconveniences that came with this, namely the CORS system, which was initially designed to help protect websites from unknown requests.

When users open up a website, they don't have an origin website that would need the web server to respond in any way other than to serve the website. However, when an API is called, it could be from the original website or from a different website. When called from by another website, this causes a security flaw where another website could see all of the data related to the current user. For example, if I were logged into Google on my computer and I inserted a simple script on my own website that would simply access Google, then Google could respond to the request with information that wasn't originally intended (e.g., cookies) that my website could then access. With the creation of the CORS policy, this is effectively eliminated and I can limit exactly what websites my API could return sensitive information to.

After addressing this issue, 

## 5. File Structure

### Overview

[`backend`](#backend)
  - routes

[`components`](#components)
  - items
  - pages

[`documentation`](#documentation)

[`models`](#models)

[`pages`](#pages)

[`public`](#public)
  - static
    - images

[`tmp`](#tmp)

### backend

The `backend` folder contains all of the routes necessary for the API to work. I utilized `express.Router()` to modularize all of the routes into each subfolder. In the main `index.js` file, I put all of the middleware in it (CORS policy, helmet [for extra protection against cross-site attacks], JSON & form parsing, etc.).

### components

For all components of each website, I used a `Layout.js` file to unify all of the pages under one format so that everything would have the same `Navbar.js` and `Footer.js` in it. The Layout then references each individual page in the `pages` folder, which would effectively change what each page's main content would be. Individual components that I thought had a rather long amount of code and could be modularized was put into the `items` folder.

### documentation

This folder contains all of the images that are used in the README.md.

### models

This folder contains all of the Mongoose models that would define the structure of each Model (table in relational databases) and would be used by the API when interacting with the database. This unifies all of the models being used by this project under one folder so that it can be easily accessed and changed.

One note that I would like to put here is that I utilized `refs` in Mongoose, which allowed me to emulate the relational behavior in relational databases, which I could populate with information from the `users` model from the `cookies` model if I ran something like `cookies.findOne({ cookie: cookie }).populate('user').exec()`. This would essentially make all information about the linked user available in the `returnObject.user` object.

### pages

This folder contains the main part of the routing for Next.js, which is based off of the file structure. In each of the files, it also contains server-side rendering necessary for the page before it is sent to the client (session verification for the `Navbar.js`).

### public

This folder contains files that would traditionally be known as static files, but the main folder currently holds files such as `robots.txt` (which is *not* properly implemented in this project, just present) and other static files. In the `static` folder, I have included images that users would upload as a part of their data and any images that would otherwise be used in the website as a part of the website.

### tmp

This folder currently holds a JSON file that would be sent to the user whenever they request their data.