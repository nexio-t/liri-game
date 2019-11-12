# liri

Liri is a language interpretation and recognition interface that takes certain users commands as inputs and outputs results from those commands. 

## Getting Started

The instructions below will allow you to demo this project on your local machine. 

### Prerequisites

Have access to your terminal and basic familiarity with node.js

```
Give examples
```

### Installing

After cloning to your local machine, run the following within the folder in your terminal: 

```
npm install 
```

And repeat

```
until finished
```

End with an example of getting some data out of the system or using it for a little demo

## Running liri 

Liri takes in four commands: 
- movie-this
- spotify-this-song
- concert-this 
- do-what-it-says 

The first three commands fetch results from the OMDB, Spotify, and Bands In Town APIs, respectively. The last command read the text contained in the random.txt file, which you are free to modify to any of the other commands. 

An example movie-this command would be: 

```
node liri.js movie-this Inception
```

The results for that command will appear as follows: 

You may use the same structure in the example to run commands for artists whose concerts you'd like to see (concert-this), songs or artists who songs you'd like more information on (spotify-this-song), and general information about movies (movie-this). 

```
node liri.js do-what-it-says
```
The default results for that command will appear as follows: 


Again, "it" here is a reference to the text within the random.txt file. You may modify it to run other commands as you please. 



Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Tomas Gear** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc
