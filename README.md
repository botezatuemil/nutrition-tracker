
# NutriTrack

A fullstack application that makes counting macros really easy, with the option to add your macros and water intake consumption.




## Screenshots

### Authentification

The user can make a new account or register with the mail and password. When the user makes a new account a new entry is made 
in postgres database. On login, the server generates a JWT token which will be stored on local storage, on client side. 

When an api request is made on frontend, a middleware checks if the token is correct and not expired.

![signin](https://user-images.githubusercontent.com/74835450/194261366-443ab846-b988-4449-b08d-7cdaaacf1c00.png)

![signup](https://user-images.githubusercontent.com/74835450/194256308-371aaea6-4f03-4fb5-bd6c-6d8d7f7f1d8f.png)


### Macro calculator

On this page the user can save his profile based on these indicators and uses Mifflin-St Jeor Equation to calculate the appropriate amount of macros.

![macro](https://user-images.githubusercontent.com/74835450/194256493-e118e329-483d-41da-a9ac-35612fc34c30.png)

### Journal 

On journal page you can add a new category:
- Breakfast
- Lunch 
- Fastfood
- Dinner
- Snack

#### Functions
- Add a new meal with the macros set by you
- Delete meal
- Save meal on recipe page if you need it later
- Create a copy on selected meal
- Add a recipe from recipe page
- See the last added products queue
- Delete category with modal for safety
- Choose any date you want to add a new category

The footer automatically updates, the amount of macros on add or delete and let the user know the current goal and the remaining calories for this day.

![journal](https://user-images.githubusercontent.com/74835450/194256529-e73f9119-0f56-487d-8968-39bcee387f34.png)

![add-meal](https://user-images.githubusercontent.com/74835450/194256778-a1a01711-8695-49c1-9505-465a6a8c591d.png)

![last-added](https://user-images.githubusercontent.com/74835450/194256721-ceb057e6-5aa2-4d2b-98fe-b85853003b64.png)

![saved-meals](https://user-images.githubusercontent.com/74835450/194256865-35a4eed8-d1b7-4c6f-93e6-514485490749.png)

### Recipe page

Add a new recipe with food's macros, delete it and sort it by calories.

![recipe](https://user-images.githubusercontent.com/74835450/194256569-2885692c-699e-43c7-8e55-db533d769209.png)

### Hydration factors

#### Functions:

- Add and edit your daily water intake goal
- Add how much water you drinked on any date you want and updates the current remaining chart
- Chart to visualise how much water you drinked today
- Bar column Chart to see your history of water intake between any date the user chooses

![water](https://user-images.githubusercontent.com/74835450/194256615-b417c3c0-af25-49cb-ada7-214d25887f34.png)

### Meal history

This page shows a line graph of how many macros were consumed from a start date to an end date.

![history](https://user-images.githubusercontent.com/74835450/194257597-6263049e-4bca-4580-b161-56474cc1d94b.png)

## Tech Stack

**Client:** React, Redux Toolkit, TailwindCSS, Chakra UI

**Server:** Node, Express

**Database:** PostgreSQL and Prisma ORM


