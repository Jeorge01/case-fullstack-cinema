# Case 8 fullstack cinema

With this site you'll be able to book seats to watch different movies. A user will be able to sign up, sign in, sign out, add bookings, remove bookings and even change it's user data. 

## local installation

If you want to use on your local device you can do so by following these following steps. You will need Visual Studio Code and a browser of your own choice.

1. Download this reposetory to your computer where you can find it again.
2. Open Visual Studio Code.
3. To open the downloaded reposetory in Visual Studio Code you need to click on "file" -> "Open folder..." and then you choose the folder with the reposetory.
4. Once you've opened the reposetory you need to open a terminal. Visual Studio Code has a built in terminal which also puts you in the right directory when you open it. To open it click on "View" -> "terminal".

5. We need to install some modules before we can run the code. Type the following command in the terminal to download them.

```
npm install
```

7. After you've install the modules you we need to start both backend and frontend. there should be an icon where you can split the terminal (shortcut is Ctrl+Shift+5). In one of the terminal you can type the following command.

```
cd backend/
```

and in the other terminal this:

```
cd frontend/
```
Now it should have chnaged the directory to these onces

case/case-fullstack-cinemaV38/backend
case/case-fullstack-cinemaV38/frontend

8. After you've done that you can type the following command in both of the terminals. One is to run the backend and one is to run the frontend.

```
npm run dev
```
9. When you've done that the backend ternimal should say "Server is listening on port 3123" and the frontend terminal something like this:

---

VITE v4.5.0  ready in 515 ms

  ➜  Local:   http://localhost:5173/

  ➜  Network: use --host to expose

  ➜  press h to show help

---

If it does that the server should be up and running on this URL: http://localhost:5173/


## Use

A User can pick a movie to watch, get some information about the movie and then pick a time they want to watch. After that they will be able to pick up t 6 seats that they want to book. A User can sign up so they don't have to add contact details but they will also be able to cancel if you've already booked seats.



