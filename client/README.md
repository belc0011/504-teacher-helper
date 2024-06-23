# 504 Teacher's Helper

## Introduction
This project is a fully functional web application designed to help teachers keep track of all of their 504 students' accommodations. Using this website you can create an account, add students to your account, add accommodations to each student, and add comments to each student's accommodations. This allows you to do the following things:
- Pull up a student to see a full list of their accommodations
- Leave comments on accommodations such as "helpful" or "remove" when you think of it, then view those comments at a later date when preparing for the next 504 meeting
- Search by accommodation to see things like which students should receive a copy of guided notes, etc.
- Add classes to each student's record
- Delete student records (if a student transfers)

The front-end is built with React (a Javascript library for building User Interfaces) and the back-end is built using Flask (a Python web framework) with the assistance of Flask RESTful to provide RESTful API's. 

## Important Files

### AccommodationSearch.js

This component allows the user to select an accommodation from the drop-down menu and search the database for all of the students who have that accommodation. It returns and displays a list of ONLY their students who have that specific accommodation. It accomplishes this by submitting a fetch request to the AccommodationSearch API, then rendering the results to the page.

### AddStudent.js

This component allows the user to create a new student record by entering the required information into the controlled form (created using Formik). Formik 


### helpers.py

The helpers.py file holds all of the methods responsible for carrying out the requests made by the user when prompted. A brief description of each method is provided below.

- create_team: Creates a new Team object and persist the changes to the database. It prompts the user for the team name as well as the coach's name, then utilizes the create method to ensure the changes are persisted to the backend.
- print_all_teams: Generates an ordered list of all available teams for the selected division, which allows the user to use a number in order to select a specific team.
- get_all_players: Generates an ordered list of all players belonging to the specified team, which allows the user to use a number in order to select a specific player.
- exit_program: Calls the built-in exit() function provided by Python to stop the script and return to the terminal.
- team_info_printer: Displays the name and current coach for a team based on the user input. Includes logic to handle invalid selections, re-prompting the user to choose a number corresponding to a team in the list or to choose "0" to exit the program.
- division_info_printer: Displays the menu for teh selected division, including division's name for confirmation.
- add_new_player: Provides the appropriate user prompts to gather the information necessary to create a new Player object and persist it to the database by calling the create method for the Player class.
- coach_info: Prints the coach's name for the selected team.
- set_coach: Allows the user to change the coach's name for the selected team, then persists the changes to the database by calling the update method for the Team class.
- delete_player: Allows the user to delete a player from a team by selecting the number corresponding to the player they wish to delete in the list. Permanently deletes in the backend by calling the delete method in the Player class.
- update_player: Allows the user to change the spelling of the name of a player on the team (method included to make correcting typos more easily). Persists changes to the backend by calling the update method in the Player class.
- team_size: Displays the total number of players on the team currently.
- player_search: Allows user to search for a player by name rather than having to select each team and generate a list of players one team at a time. Set to automatically title case the user's input so they do not have to worry about capitalization.
- print_all_division: Prints name of all divisions currently in database.
- create_division: Allows the user to create a new division not currently in the database.
- team_search: Allows the user to serach for a team to determine which division it is in.

### init.py

The init model imports the sqlite3 module from Python to allow the CLI to connect to and interact with a database. It also holds the connection object (named CONN) and the cursor object (named CURSOR). 

### player.py

This is the Player class which holds all of the logic necessary for creating new instances of the Player class. This CLI models a one-to-many relationship, where one team has many players. As a result, the Player class has an additional attribute "team_id" which serves as the foreign key in the database table, linking each player to a specific team. This model holds modules necessary for creating a new member of the Player class and saving it to the database, updating existing Player objects and persisting those changes, deleting existing Player objects (and removing them from the database), as well as finding players using various attributes.

### team.py

This is the Team class which holds all of the logic necessary for creating new instances of the Team class, storing them in a dictionary, and persisting them to the database. It has modules responsible for saving (saving a new Team object to the database and adding it to the dictionary), updating (allowing changes to an existing Team object to be persisted to the database), deleting (removing an existing team object from the database, as well as the dictionary), as well as many modules useful for finding Team objects using different attributes.

### seed.py

This file provides seed data to showcase the functionality of the CLI without the user having to first enter a bunch of teams and players.


## Usage

The project is available using the following steps:
- git clone https://github.com/belc0011/soccer-league-manager
- pipenv install (to install dependencies)
- pipenv shell (to enter virtual environment)
- python lib/seed.py (optional, if you want to seed the database prior to usage)
- python lib/cli.py

