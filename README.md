# all-day-test

## description
Query the characters from the "Game of Thrones" public API at [api of ice and fire](https://anapioficeandfire.com/Documentation), and host an API with a set of endpoints that contains cross referenced character info and quotes belonging to the character.

The quotes document is found in the local repository [quotes.json](./docs/quotes.json) file, and needs to be cross referenced with the characters obtain from the public API.

## rules
* You can use any library from [npmjs.com](https://www.npmjs.com)
* Use promises when at all possible
* Searching for information on the internet is allowed
* It's ok to ask questions and clarification while going through this exercise

## acceptance
* All character documents from [api of ice and fire](https://anapioficeandfire.com/Documentation) must have the quotes from
[quotes.json](./docs/quotes.json) combined into it.
* You must use express to stand up a local API with the following endpoints:
    * GET /characters
    * GET /characters/id
    * GET /characters?offset=10&limit=10
    * GET /characters?name="Jon Snow"
* Make a pull request into your respective branches(ryan, nathan), and resolve code review comments.  Exercise completes when your code is merged.
