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

This component allows the user to create a new student record by entering the required information into the controlled form (created using Formik). Formik has validations in place so the student's first name may not include any special characters with the exception of an apostrophe (which may be present in some first names), and the student's last name may not include any numbers or special characters (with the exception of a hyphen, for students with hyphenated last names).


### App.js

This is the top-level component which is responsible for rendering the NavBar component as well as holding the router, which in turn is responsible for rendering the following components at the following routes:
- Home.js (route: '/')
- SignUp.js (route: '/signup')
- Students.js (route: '/students')
- StudentPage.js (route: '/students/:id')
- AccommodationSearch.js (route: '/accommodations')
- Comments.js (route: '/comments/:studentId/:accommodationId')
- EditStudent.js (route: '/edit_student/:studentId')
- DeleteStudent.js (route: '/delete_student/:studentId')

The remaining components are rendered inside one of these components.

### Comments.js

This component renders the student's accommodation (that was registered via a click) on the page using a UseEffect fetch request that fires when the page first loads. There is a dropdown which allows you to select a comment to add to that accommodation. If the accommodation already has a comment, selecting a new comment and clicking submit will update the comment on the accommodation. This is important as the comments are rating the effectiveness of the accommodation, and so two different comments on the same accommodation would be conflicting.

### DeleteStudent.js

This component is rendered when the user clicks the "delete student" button underneath a student's name on a previous page. This component then serves as an additional layer of confirmation that the user wishes to delete the student (as opposed to the user clicking the button accidentally). Once the user clicks the "submit" button in this component, the entire student record will be deleted. This is necessary to remove student records at the end of the school year, as well as mid-year if students transfer or if their 504 expires.

### EditStudent.js

This component is rendered when the user clicks the "edit student" button on the previous page. The user can input the updated student information and submit it. This is necessary in case the user inputs the student's name or grade incorrectly when they create the record.

### Home.js

The home page acts as a "main menu" with links leading to each of the various features the user may want to employ. It is the parent of the "AddStudent" component, which is conditionally rendered at the bottom of the Home page only when the user clicks the "add student" button.

### Login.js

The Login component holds the controlled form (created using Formik) where the user can input their login info. The Login component is also the parent of the "SignUp" component, which is conditionally rendered at the bottom of the Login page only when the user clicks the "sign up" button. The "user" state variable (passed to Login as props from App.js) is then updated to reflect that the user is logged in and can access all features on the website.

### NavBar.js

This component holds the navigation bar which displays at the top of each web page when the user is logged in. The entire component is conditionally rendered based on the present of the "user" state variable, which is set in the Login component upon successful login. The user state variable is passed as props to the NavBar component from App.js.

### SignUp.js

This component is conditionally rendered at the bottom of the Login.js component when the user clicks the "sign up" button. It is comprised of a controlled form (built using Formik) which include validations for the username (must be at least 6 characters, no special characters), password (must be at least 7 characters), confirm password (must match password), first name (maximum length 15 characters), and last name (maximum length 20 characters). When submitted, this form will send a fetch request to the back end to ensure the user's data is added to the database.

### StudentCard.js

This component holds the logic to display each student's information in a uniform fashion. It is rendered by the Students.js component using a map function.

### StudentPage.js

This component renders the information only for the student whose name was clicked (whose ID is in the URL for this page). It renders the student's information upon page load utilizing a fetch request inside of UseEffect. The accommodations for the student listed are clickable, and upon clicking the Comments.js component will be rendered for the specific accommodation that was clicked (for that particular student only). This component also renders all of the classes for the student who is being displayed. Finally, this component holds two different controlled forms (made using Formik) which are responsible for adding additional accommodations for the student, and adding additional classes for the student.

### Students.js

This component renders the list of students for the user who is currently logged in. This component has a button "add student" which conditionally renders the "add student" component to allow the user to add a new student. It makes a fetch request for all of the students for the user who is currently logged in and renders them by rendering the StudentCard.js component for each student (using a map function). 

### app.py

This is the file which holds all of the Resources that represent the various API endpoints necessary to carry out all of the requests described in the components listed above. Below is a description of each resource within this file:

- SignUp: This resource receives the "POST" request sent by the SignUp.js component and creates a new user in the database. The resource then adds the user_id from the newly created entry in the "users" database table to the session object so that the user will remain logged in and can visit the rest of the pages for this domain without having to login each time a new page loads.

- LogIn: This resource first queries the database to find if there are any entries with the same username as the user input. Once found, it then utilizes the "authenticate" validation setup within the User model to ensure that the password entered matches the password stored in the database (in its encoded form). Once confirmed, it updates the session object with the user_id so the user can navigate the website without having to log back in each time they load a new page. If the user's username is not found, or if their password does not match, it returns 401: unauthorized.

- CheckSession: This resource gets the user_id from the session object and queries the users database table to ensure the user_id is valid. If so, it returns a 200 code, if not it returns 401: unauthorized. This endpoint is utilized by the App.js component to authenticate the user and populate the "User" state variable which is passed as props to many child components.

- Logout: This resource sets the user_id attribute on the session object to "None".

- Students: This resource has a "get" and "post" method. The "get" method retrieves all of the students from the 'students' database table that have the user ID which matches the user_id stored in the session object. That way each user sees only their own students, not the students of other users. The "post" method allows the user to create a new "student" record and store it in the 'students' database table.

- StudentById: This resource performs all four CRUD operations. The "get" method retrieves a specific student's record (by id) and returns it as JSON. The "post" method adds classes to a student's record by first creating a new "classes" object, then querying the 'students' database to find the appropriate student, and storing that new classes object in that student's database record. The "patch" method allows the user to send updated info for a student record (such as new spelling of name or different grade). The "delete" method allows you to delete a student record based on the id of the student sent in the request.

- AddAccommodation: This resoursce creates a new accommodation object based on the description provided in the request, then queries the students database to find the student the accommodation belongs to (based on the id submitted in the request) and appends the new accommodation to the current list of the student's accommodations.

- AccommodationSearch: This resource receives an accommodation description as well as a student ID in the request, and it creates a SQL query statement to search the student_accommodation association table for all of the accommodations with the same description as the request object. Then, it cycles through the list of accommodations returned and only includes the accommodations with a matching student ID to the request object. It returns the list of student names from that list as JSON.

- AddComment: This resource first queries the 'accommodations' database table to find the accommodation object matching the accommodation ID submitted in the request, which will be used to provide the appropriate response. Then it creates a SQL statement to add the comment sent in the request to the appropriate entry in the student_accommodation association table (it does this by searching for both the student_id and the accommodation_id). Then it returns the updated accommodation object (including the added comment) as JSON.

- JoinTableStudent: This resource creates a SQL statement to query the student_accommodation association table for all the records with the student ID which matches the student ID submitted in the request. This creates a list of objects which hold the association ID only along with the corresponding comment for each association ID. Then it queries the 'students' database for the appropriate student record. After that, it cycles through the list of objects returned from the student_association table and uses the Association ID to find the corresponding Association object (by querying the 'associations' table). It uses all of this to create a response dictionary with all of the accommodations (including description, ID and comments) for the requested student.

### models.py

This file holds all of the models necessary to create the appropriate databases. Below is a brief description of each model.

- The student_accommodation association table holds the many-to-many relationship between students and accommodations, since many different students can have the same accommodation, and many different accommodations can belong to the same student. It includes the additional attribute "comment" so that when a comment is attached to an accommodation, it is specific for that accommodation AND that student.

- The Student class has the following attributes: ID (primary key), first name, last name, grade, and user ID (foreign key which references the 'users' table).
- The Accommodation class has the following attributes: ID (primary key) and description.
- The User class has the following attributes: ID (primary key), first name, last name, username, and password-hash. The password-hash property is encrypted using bcrypt, and cannot be read. The User model also includes an "authenticate" method which compares the username and password (encrypted) to the database entries to ensure they match. 
- The Classes class has the following attributes: ID (primary key), name, and student ID (foreign key which references the 'students' table).

## Usage

The project is available using the following steps:
- git clone https://github.com/belc0011/504-teacher-helper
- pipenv install (to install backend dependencies)
- pipenv shell (to enter virtual environment)
- in a new terminal, cd into the client directory then run npm install to install frontend dependencies
- python app.py to run the server (from the server directory)

