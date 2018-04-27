## POInterest - Civil Maps coding challenge

Using the Google Places API to show places close to you based on a query.

### Demo

You can demo POInterest [here](http://ourbeacn.com.s3-website-us-west-2.amazonaws.com/).
Just type in what you're looking for, press enter, and see the names of the places, ranked by distance. 

### Running Locally

Make sure you have npm installed.

1. Clone the repository
2. Run `npm start`

### Files authored

Mostly everything I coded is in `src/App.js`. If I had more time, 
I would split each component into its own file to stay organized. 

### Challenges I faced
* Loading the Google Places API in a React environment. I 
haven't worked with inline scripts for APIs with React. This 
[link](https://www.fullstackreact.com/articles/how-to-write-a-google-maps-react-component/) helped. 
Everything in `src/api` was found there.
* Getting photos. It seems that Google's documentation for 
place photos  is outdated. Specifically, there was no `photo_reference` 
in the `photos` array of each result.

### Next steps
* Figure out photos. I put a bit of time into this 
before giving up for right now. You can see what 
I tried in the commented out code of `App.js`
* Fix a bug where you search a second time and the blocks don't align.
* Implement pinned posts.
* Style everything up. I didn't prioritze this in the prototype.
