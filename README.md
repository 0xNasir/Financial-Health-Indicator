# Financial-Health-Indicator
## Backend setup

- Clone the repository from github: https://github.com/0xNasir/Financial-Health-Indicator
- Now you will see two projects in the repository. 1. foundBoxBackend, and 2. foundBoxFrontend
- Goto the `foundBoxBackend` project root folder where `requirements.txt` file is located.
- Open the cmd/terminal in the root folder and run the command to create a python virtual environment.
    ```
  python -m venv myEnv
  ```
  Replace `myEnv` with your env name.
- Activate the environment using the following command.
    ```
  myEnv\Scripts\activate
  ```
- After activating the environment, install the project dependencies using the following command.
    ```
  pip install -r requirements.txt
  ```
- Your environment is ready to run the project. Now setup the database.
    ### Database setup
- Create a database in your postgreSQL. 
- Open the `foundBoxBackend` project root app folder where `settings.py` and `.env` file is located. Folder path will be like `foundBoxBackend/foundBoxBackend/`
- Now open the `.env` file and update the `DB_NAME`, `DB_USERNAME`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT` variable
    ### Continue backend setup
- Open the cmd/terminal in the root directory where `requirements.txt` file is located and run the following command to make the model/database migrations.
    ```
  python manage.py migrate
  python manage.py makemigrations health
  python manage.py migrate
  ```
  Run all these three commands in separately one by one. Don't run them at once.
- Now your project is ready to run. Just execute the following command to run the project.
    ```
  python manage.py runserver
  ```
  You project will run at port 8000. So you can access the backend using http://localhost:8000 or http://127.0.0.1:8000
- You can also browse the API at http://127.0.0.1:8000/docs

## Frontend setup

The frontend was developed using the [Angular CLI](https://github.com/angular/angular-cli) version 15.2.9.
So make sure that [node version 18](https://nodejs.org/dist/v18.17.1/) and Angular CLI version 15 is installed in your computer.
- To setup and run the frontend part, open the `foundBoxFrontend`.
- Locate where the `package.json` file is exist.
- Open the cmd/terminal there and run the following command.
    ```
    npm install
  ```
- Now you are ready to run the project. Just execute the following command.
  ```
  ng serve
  ```
- You project will run at port 4200. Now open the browser and visit http://127.0.0.1:4200

N.B: Make sure that you run the backend first. Otherwise frontend won't work properly.
