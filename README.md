# UnitedRemoteChallenge

This project is a challenge assigned by United Remote.
This project is about retrieving and listing some data of Github repositories, using the Github API.
The project goal is to list most rated Github repositories of the last 30 days, including:
* the name of the repository
* The description associated to the repository
* The owner's avatar
* The number of stars and open issues

This project is developed under Angular 2 (v. 8.2.5)

## Features

* Listing the most rated repositories that were created the last 30 days
* Infinite scrolling: Loading repositories on scrolling down the page

It also implements: 
* Routing
* Structured to module by feature (only the repository list for now)
* Lazy loading of modules and their components (not much impact for now because the app is small and contains only 2 modules)

## Approach
This project is implemented using a classical approach of angular for the infinite scrolling, which is based on directives and RxJS operators.
It can be done also, using the virtual scrolling feature of Angular material.

## Import

To be able to test it on your machine, you need to :
* Import the project to your IDE
* Run `npm install` to install all dependencies of the project

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

