This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## OverView
This is an app where you can play games and select a background for those games

The home screen consists of 4 game options to choose from and a button to choose a background image. Click on a game to load the game and click on the back button to go back to the homepage

## Background Image Gallery
Click on the 'select background' button to enter the background image gallery. Here, you have four tabs to choose from. Simply click on the background you choose and the background will change. Click on the selected background image again to remove the background image


## MasterMind
Once you click on the 'MasterMind' game option, it will take you to a board resembling the board game (except with six guesses instead of twelve for extra challenge). MasterMind is a classic codeBreaking board game in which someone sets a secret code using four colours. There are 6 colors to choose from; red, orange, yellow, green, blue and white. Instead of a player choosing a secret code, it is randomly generated

    1. Enter a guess
        Place any combination of colors into the slots in the highlighted row. To place a color in a slot, select a color from the right-hand side of the screen and click on the desired slot. To remove a color from a slot, click on that color with that color selected on the right-hand side. When all slots on the highlighted row are filled, the guess button above the board will turn blue. When the 'Guess' button is blue, you can enter the guess in the highlighted row by pressing that button.

    2. Recieve feedback
        Once you enter your guess, you will see 0-4 pegs to the right of your guess and the next row will be highlighted. There are two types of pegs: red and white. White pegs mean that one of the colors you entered is in the secret code. For example, if the secret code is 'green, green, blue, red' and one of the colors you entered was green, but is in the wrong spot, you get a white pin. If you got both of the green colors in the wrong spot, you get 2 white pins. Red pins mean that you have the correct color in the correct spot. For example, if the secret code is the same as in the example with the white pegs and you get a green color in the right spot, you get a red peg.

    3. Repeat
        Your previous guesses give you information on what the secret code could be. When you guess the secret code or run out of guesses, a win message will pop up as well as the option to restart


## Checkers
Checkers is a popular 2-player game on an 8 by 8 grid checkered with black and white squares. Each player starts with 12 pieces filling the 3 rows of black squares closest to their side

    1. Moving your piece
        Your movement range includes squares that touch corners with the square you are on. For regular pieces, the movement range only includes spaces that are not 'backwards' from your piece. a space is 'backwards' from your piece when it is closer to the side of the board that your pieces started on than the piece you are moving. Pieces can move to spaces in your movement range that are not occupied by another piece. You can move or jump a piece using a highlighted piece by clicking it then clicking on one of the ghost pieces.

    2. Jumping a piece
        You can jump a piece if a black square in your movement range that is occupied by the opposite player if the square they sit on touches an empty black square in the same direction that you are jumping. When you jump a piece, you move to the empty space past it then you can remove the piece you jumped. From here, if you meet the conditions for jumping another piece, you enter a 'jump chain' mode, which means you can jump another piece. You can exit jump chain mode by clicking on the selected piece again.

    3. Kings
        When your pieces reach the other side of the board, you can turn them into kings. Kings follow the same rules as regular pieces except their movement range includse 'backwards' spaces.

    4. Winning
        You win a game when your all of your opponent's pieces are gone. You Tie a game if neither player can move.


## Trivia
This is a simple trivia game featuring several different category options (random, movies, music, science and nature, geography, and history). 

    1. Select a category
        There are several categories to choose from. Simply click on one of the categoty options to bring up a question along with a back button you can use to return to the select category scteen.

    2. Select an answer
        click on one of these option to open a question with several answer options. Click the answer you think is correct. Once an answer is selected, it will be highlighted with blue and the confirm option will be highlighted with green. Once the confirm button is clicked, the answer you clicked will be highlighted a bright color and have a box shadow. The other answers will be highlighted with a dull color. If an option is highlighted with green, it means it is the correct answer. If it is highlighted in red, it is an incorrect answer.

    3. Move on to a new question
        Once you have confirmed an answer, you wil have the option to move on to a different question of the same category.


## Connect Four
Connect Four is a 2 player game that takes place on a seven by six board. The goal is to align 4 pieces vertically, horizontally, or forty five degrees diagonally. If the box shadow on the board is red, it is red's turn. If the box shadow is yellow, it is yellow's turn

    1. Place a piece
        Place a piece by clicking on any column. A piece will appear at the bottom of the column

    2. Winning Conditions
        If a player gets 4 pieces stacked on top of each other, horizontally adjacent to each other, or diagonally plus or minus forty five degrees from each other, the player will recieve a win message as well as an option to reset their game
        