# CMG Engineering Audition

## Lines of thought

The main idea of development was to keep it simple and effective.

The idea then was to start with a more functional concept, creating functions to fulfill the objective of extracting data from a string.

The point is that even from a functional concept, the idea was also to cherish the code pattern and an organization of folders.

The calculations core was in an isolated folder, thus, it is a little simpler to include new calculation methods for the future and other types.

We also have the advantage of typescript, which guarantees the delivery of types in the input and output values of functions, and jest, which ensures that the code respects the initial thought criteria.

### Improvements

One of the main chances of improvement would be concerning the parsing of our input string.

I believe that we have a chance to improve the reading and exporting of data to make it easier to read and maintain.

## How to run

### development

The project can be executed running
`yarn start`

That command will start the `init` function that will read the `input-log.log` in the root of the project and will output the value;

### build

We can build the project with
`yarn build`

That command will generate a new folder called `dist` in the root of the project

### tests

```
yarn test // command that runs the tests once

yarn test:watch // command that runs the tests and watch for changes

yarn test:coverage // command that runs the test and export a coverage
```

## Feedbacks

I would be very grateful if you can give me any kind of feedback regarding the code, it's a way to improve as a developer 😊
