<!-- GETTING STARTED -->
## Getting Started

To get a copy of this project on your local machine, follow these steps.

### Prerequisites

You will need npm if it is not already installed on your machine. To install npm, run the command below
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

Setting the app up for use requires two steps

1. Clone the repo
   ```sh
   git clone https://github.com/devari123/Project-Name.git
   ```
2. Install the necessary NPM packages
   ```sh
   npm install
   ```
3. To start using the application, use
   ```sh
   npm start
   ```
<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#incomplete-tasks">Tasks I Did Not Complete</a></li>
    <li><a href="#changes-for-concurrent-env">Changes I Would Make If App Was Running In Concurrent Environment</a></li>
    <li><a href="#coding-decisions-and-reasoning">Coding Decisions Made Throughout The Application</a></li>
  </ol>
</details>



<!-- USAGE -->
## Usage

Once the app is available and running on your local machine, you will be able to:

* View The Sprites, Stats, Names and Id Of Every Pokemon In The PokeDex
* Search For Any Pokemon in the PokeDex Using Their Name Or Their Number
* View Your Past Searches and Click On Any One Of Those Previous Entries To Search Using That Phrase Again.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- INCOMPLETE TASKS -->
## incomplete-tasks

Allthough the application fulfills every business and technical requirement, and even has more functionality than what was asked for, there are practices that I find absolutely necessary in coding that I didn't completely address with this project due to the fact that it had a time limit. A few of those practices include:
* Making sure every part of the UI/UX is responsive and fits all screen sizes. I didn't do any intensive work to make sure the application was responsive since it wasn't listed as a requirement
* Breaking sections of code out into reusable components where it makes sense. I did create multiple reusable components to help improve code readability, however, I would and could have created more reusable components if I had the time to do so, especially in a real world project since I know reusable components can potentially make it easier to read the code, build on top of the code, and expand upon the application overall in the long and short term.
* I would have also done a lot more with the data gathered from the API and made the app look nicer than it does currently, even though it doesn't look too bad as is.
* Address the somewhat small bugs I've noticed within the application

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CHANGES I WOULD MAKE FOR APP IN CONCURRENT ENV -->
## changes-for-concurrent-env

Aside from the modifications I mentioned I would make in the previous "Incomplete Tasks" section, one thing I would do differently is look at the pros and cons of using localStorage to store all past searches made by a user. If the intention was to have that feature available for each user and it was deemed as necessary, I would look into using cookies as this would be a more effective way to store data as it can't be as easily manipulated, and it would actually show up for each user regardless of what device they were using or not using.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CODING DECISIONS MADE THROUGHOUT THE APP  -->
## coding-decisions-and-reasoning

In regards to the coding choices I made, I made sure to treat this as if it was something running on production and being used by multiple people. I leveraged multiple react hooks to make sure the application was using and employing good, efficient coding practices, and inside of my code I made comments on why I used certain hooks in different places
