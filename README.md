# Deploy

## Pre-installation

As per usual, latest Git and Node!

## Installation

* Clone this repo.
* Run `npm install` in both `client` and `server`.
* Create an `.env` file in both `client` and `server`.
	* Server `.env` should have:
		* `DB_URL`: An IP address or domain name of a MySQL server.
		* `DB_PORT`: MySQL server port.
		* `DB_NAME`: MySQL database name.
		* `DB_USER`: MySQL database admin username.
		* `DB_PASS`: MySQL database admin password.
		* `PORT`: Port on which to run this application. Defaults to 5000.
	* Client `.env` should have:
		* `REACT_APP_BOARD_NAME`: A name for your Kanban Board. Make it something fun!
		* `REACT_APP_API_URL`: A URL leading to your backend, e.g. `http://localhost:5000`.
* Run `npm start` from both `server` and `client`.
* Have a blast.
