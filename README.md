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
    <li><a href="#Incomplete Tasks">Tasks I Did Not Complete</a></li>
    <li><a href="#Known Bugs">Known Bugs In Application And How I Fixed Them</a></li>
    <li><a href="#changes-for-concurrent-env">Changes I Would Make If App Was Running In Concurrent Environment</a></li>
    <li><a href="#coding-decisions-and-reasoning">Coding Decisions Made Throughout The Application</a></li>
  </ol>
</details>

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
   git clone https://github.com/devari123/reactpokedex.git
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




<!-- USAGE -->
## Usage

Once the app is available and running on your local machine, you will be able to:

* View The Sprites, Stats, Names and Id Of Every Pokemon In The PokeDex
* Search For Any Pokemon in the PokeDex Using Their Name Or Their Number
* View Your Past Searches and Click On Any One Of Those Previous Entries To Search Using That Phrase Again. The only searches that will not be saved to the search history log are searches that the application automatically detects as not being a valid pokemon, aka, a search phrase with a mix of letters and numbers or a number that is longer than 4 digits long.

<p align="right">(<a href="#readme-top">back to top</a>)</p>




<!-- INCOMPLETE TASKS -->
## incomplete-tasks

Allthough the application fulfills every business and technical requirement, and even has more functionality than what was asked for, there are practices that I find absolutel necessary in coding that I didn't completely address with this project due to the fact that it had a time limit. A few of those practices include:
* Making sure every part of the UI/UX is responsive and fits all screen sizes. I didn't do any intensive work to make sure the application was responsive since it wasn't listed as a requirement
* Addressing the bugs I've noticed within the application, which I referenced in <a href="#Known Bugs">Known Bugs In Application And How I Fixed Them</a>
* Breaking sections of code out into reusable components where it makes sense. I did create multiple reusable components to help improve code readability, however, I would and could have created more reusable components if I had the time to do so, especially in a real world project since I know reusable components can potentially make it easier to read the code, build on top of the code, and expand upon the application overall in the long and short term.
* I would have also done a lot more with the data gathered from the API and made the app look nicer than it does currently, even though it doesn't look too bad as is.

<p align="right">(<a href="#readme-top">back to top</a>)</p>




<!-- KNOWN BUGS -->
## Known Bugs

Here are the bugs that I've noticed in the application and how I've fixed them:
Bigger Bugs:
* LocalStorage is not actually holding the search values across page refresh or browser close due to an if statement that I fixed in commit https://github.com/devari123/reactpokedex/commit/a4a9c104b65ad74ce35d66c798c4f432ff77b2e5
* When a user clicks the back or next buttons rapidly over and over, the displaying of the pokemon can become skewed. To fix this, I came up with and implemented a solution in the commit at https://github.com/devari123/reactpokedex/commit/2b620bceb6af7c775a14531f25f5dd52c65606d6, which involved me moving the dispatch(setFirstIndex......) function inside of the asynchronous function inside of useEffect, and creating an additional state value to tell the application which of the next or back buttons were pressed.
* There needs to be a max-height style applied to the search history log to allow the entire search history to be viewed instead of being cut off by the screen if it is a long list as seen in https://github.com/devari123/reactpokedex/commit/b47e41c8578183a7abc22191de77a04f820dce9d

Smaller Bugs:
* When a user clicks the view pokemon button, the application takes them to the top of the page to see the pokemon's information, however, when a user clicks the image for the pokemon, the user isn't taken to the top of the page. To fix, I would make sure the logic for the onClick function of each image is the exact same as the logic for the onClick function of the view pokemon button
* There is one or two background colors that make it harder to see the white text of the application. I would change these ofr the benefit of the user.
* I would let the user know that if their search contained a mix of letters and numbers, something the app automatically detects as an invalid pokemon identifier, that particular search value will not be saved to their search history log. To do this, I would simply add that message to the error message that already pops up when a user enters a phrase that includes a mix of numbers and letters.
* Sometimes when a pokemon is selected or searched for and that pokemon's image shows up, if a user is still at the top of the page, it's possible that if they attempt to click an image to show a new pokemon, it will not work because the iamge of the selected pokemon is blocking the top of some of the clickable images below. To fix this, I would simply change the z-index of the clickable images so that it would be clickable at all times when user is still at the top of the page and an individual pokemon image is being displayed.
* When there is no search history log, the user clicking view search history causes the phrase to change to close search history, even though no search history appears since there's nothing to show. Disabling the view search history button when there is no search history is the solution for this.

* Another potential solution for the pagination bug mentioned above in "bigger bugs" would include retrieving info for all the pokemon on initial page load, instead of just 50 pokemon. That would also cause less calls to be made to the API, although I would still limit the number of pokemon displayed per page and still include pagination. 

<p align="right">(<a href="#readme-top">back to top</a>)</p>




<!-- CHANGES I WOULD MAKE FOR APP IN CONCURRENT ENV -->
## changes-for-concurrent-env

Aside from the modifications I mentioned I would make in the previous "Incomplete Tasks" section, one thing I would do differently is look at the pros and cons of using localStorage to store all past searches made by a user. If the intention was to have that feature available for each user and it was deemed as necessary, I would look into using cookies as this would be a more effective way to store data as it can't be as easily manipulated, and it would actually show up for each user regardless of what device they were using or not using.

<p align="right">(<a href="#readme-top">back to top</a>)</p>




<!-- CODING DECISIONS MADE THROUGHOUT THE APP  -->
## coding-decisions-and-reasoning

In regards to the coding choices I made, I made sure to treat this as if it was something running on production and being used by multiple people. I leveraged multiple react hooks to make sure the application was using and employing good, efficient coding practices, and inside of my code I made comments on why I used certain hooks in different places
