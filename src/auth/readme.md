1. Navigate to the /auth controller, and trigger the @Get() endpoint 'google'.
   (This will redirect to the google sign in page)
   Example:
   http://localhost:3000/auth/google

2. After Successful Sign in, google will go to

http://localhost:3000/auth/google/callback?code=CODE

    1. (This endpoint will validate the CODE) //TODO:
    2. WIll find the user in the database whosse googleId is the profile.id
    3. if not found it will create the user
    4. it will do this using the google.strategy.ts

3. This will in tru
