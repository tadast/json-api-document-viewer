# [{json:api}](https://jsonapi.org) document viewer.

The flat {json:api} structure is a good way to express complex, sometimes circular relationships between objects in your API responses. However the same flatness makes it difficult for humans to "parse" these relationships. This project aims to visualise object relationships by visually nesting them.

This is a very much work in progress project: it lacks some essential features and has some crucial bugs.

Built using [React Starterify](https://github.com/Granze/react-starterify).

## Usage

Clone this project `git clone https://github.com/tadast/json-api-document-viewer.git && cd json-api-document-viewer`

__Install the dependencies:__

`npm install`

__Test:__

`npm test`

__Development mode with livereload:__

`npm run watch` or just `npm start`

__When you are done, create a production ready version of the JS bundle:__

`npm run build`

__Deploy on Github pages with one command:__

`npm run deploy`

## License

[MIT License](http://opensource.org/licenses/MIT)
