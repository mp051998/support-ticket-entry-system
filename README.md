# Support Ticket Entry System

The Support Ticket Entry System is a React application that allows users to add and view support tickets, as well as manage support agents.

## NOTE: This is the frontend of the application. The backend can be found [here](https://github.com/mp051998/support-ticket-entry-system-backend).

## Features

- Ticket Creation: Users can create new support tickets by providing relevant information.
- Ticket Viewing: Users can view a list of all support tickets, including their details and current status.
- Ticket Status Updates: Support agents can update the status of tickets, such as marking them as in progress or resolved.
- Search and Filtering: Users can search for specific tickets based on various criteria, such as ticket ID, title, or status.
- Agent Management: Users can view a list of all support agents as well as add them.

## Installation

1. Clone the repository: `git clone https://github.com/mp051998/support-ticket-entry-system.git`
2. Navigate to the project directory: `cd support-ticket-entry-system`
3. Install dependencies: `npm install`

## Setup .env file

Before running the app, make sure to set up a `.env` file in the project root directory. Ensure the .`.env` file has the following variables:

```
REACT_APP_BACKEND_URL=<backend_server_url> # This is the url of the backend server
```

## Usage

1. Start the development server: `npm start`
2. Open your browser and visit `http://localhost:3000` to access the application.

