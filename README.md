# Time Tracker - Frontend

This repository contains the front-end part of a time management application. 
The application allows you to manage your tasks by keeping track of the time each task is estimated to take and by adding a list of operations to each task.

## Features

- Create and manage tasks
- Add estimated completion times to each task
- Add a list of operations for each task

## Prerequisites

- Node.js
- npm
- API Key from the backend service

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Obtaining API Key

To have access to the backend part of the application, you need to apply for an API Key. You can do this by visiting the following URL: https://todo-api.coderslab.pl/apikey/create

### Installation

1. Clone the repository
```
git clone https://github.com/bewpage/workshop-timetracker
```
2. Navigate into the project directory
```
cd your-project-name
```
3. Install the dependencies
```
npm install
```
4. Create a `.env` file in the root of your project and insert your API Key and API Host.
```
REACT_APP_API_KEY=YOUR_API_KEY
REACT_APP_API_HOST=https://todo-api.coderslab.pl
```
Replace `YOUR_API_KEY` with the API Key you received from the above step.

5. Start the application
```
npm start
```
The application will start on http://localhost:3000

## Built With

- React.js
- TypeScript
- Create-React-App

## Contributing

If you have any suggestions or bugs to report, please open an issue in this repository. We appreciate your contributions!

## License

This project is licensed under the MIT License - see the LICENSE file for details.
