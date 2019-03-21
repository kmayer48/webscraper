# NPR News Scraper

## All the News That's Fit to Scrape is an application that lets users scrape news articles from NPR.com. Users can then view and leave comments on saved articles. This app uses Cheerio to scrape news from NPR and stores them in MongoDB using Mongoose. 

### Check out the deployed version on [Heroku!](https://young-badlands-11704.herokuapp.com/)

# Prerequisites

    * Terminal or Gitbash
    * Node.js & NPM (Node Plugin Manager)
    * Mongodb
    * Clone down repo

##### Enter `npm install` in either Terminal or Gitbash to install neccessary packages to run this application.

# Instructions

#### Enter `node server.js` in either Terminal or Gitbash to intialize the server.

![](https://github.com/kmayer48/webscraper/blob/master/public/gifs/cli.gif)

#### Enter `http://localhost:3000 ` into your web browser of choice. You will land on the home page.

![](https://github.com/kmayer48/webscraper/blob/master/public/gifs/landing.gif)

#### Hit the `Scrape New Articles` button in the top right hand corner. This will use Cheerio to grab new articles from NPR.

![](https://github.com/kmayer48/webscraper/blob/master/public/gifs/scrape.gif)

#### Clicking on the `Save Article` button will store this in the database. You will be able to access your saved articles on the Saved Articles Page.

![](https://github.com/kmayer48/webscraper/blob/master/public/gifs/save.gif)

#### On the Saved Articles page you can use the comment button to create comments and also delete any saved articles. The changes will be updated in mongodb. Once you reopen the comment window the comment will display. 

![](https://github.com/kmayer48/webscraper/blob/master/public/gifs/comment.gif)

### Happy Scraping!

# Authors

### Kenny Mayer