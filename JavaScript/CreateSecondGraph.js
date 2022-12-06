const getInput = document.querySelector('#file');
TESTING = document.getElementById('barGraphStacked');
const newData = [];

/**
 * This file will count the number of games with the genre, the games can be counted again if it has the genre.
 */
getInput.addEventListener("change", async () => {
    const excelFile = getInput.files[0];
    // Do all the work in here
    dfd.readCSV(excelFile).then((df) => {
        console.log(df);
        const tempDate = [];
        const games = df.name.getColumnData;
        const publishers = df.publisher.getColumnData;
        const developers = df.developer.getColumnData;
        const prices = df.price.getColumnData;
        const platforms = df.platforms.getColumnData;
        const genres = df.genres.getColumnData;

        const createTempGenres = [];
        const createTempPlats = [];
        const createTempPubs = [];
        const createTempDev = [];


        const newGenres = [];
        const newPlatform = [];
        const newPublishers = [];
        const newDevelopers = [];

        // handles splitting games with multiple genres
        genres.forEach(function name(params) {
            const temp = params.split(';'); // splits ["genreA;genreB"] --> ['genreA', 'genreB']
            newGenres.push(temp);

        });

        developers.forEach(function name(params) {
            const temp = params.toString().split(';'); // splits ["genreA;genreB"] --> ['genreA', 'genreB']
            newDevelopers.push(temp);

        });

        platforms.forEach(function name(params) {
            const temp = params.split(';'); // splits ["genreA;genreB"] --> ['genreA', 'genreB']
            newPlatform.push(temp);
        });

        publishers.forEach(function name(params) {
            const temp = params.toString().split(';'); // splits ["genreA;genreB"] --> ['genreA', 'genreB']
            newPublishers.push(temp);
        })

        for (let i = 0; i < genres.length; i++) {
            const temp = genres[i].split(';'); // splits ["genreA;genreB"] --> ['genreA', 'genreB']
            if (temp.length > 1) { // if has multiple genre
                for (let x = 0; x < temp.length; x++) {
                    createTempGenres.push(temp[x]); // push each individually into dummy
                }
            } else { // if there is only one genre
                createTempGenres.push(temp.toString());
            }
        }

        for (let i = 0; i < platforms.length; i++) {
            const temp = platforms[i].split(';'); // splits ["genreA;genreB"] --> ['genreA', 'genreB']
            if (temp.length > 1) { // if has multiple genre
                for (let x = 0; x < temp.length; x++) {
                    createTempPlats.push(temp[x]); // push each individually into dummy
                }
            } else { // if there is only one genre
                createTempPlats.push(temp.toString());
            }
        }

        for (let i = 0; i < publishers.length; i++) {
            const temp = publishers[i].toString().split(';'); // splits ["genreA;genreB"] --> ['genreA', 'genreB']
            if (temp.length > 1) { // if has multiple genre
                for (let x = 0; x < temp.length; x++) {
                    createTempPubs.push(temp[x]); // push each individually into dummy
                }
            } else { // if there is only one genre
                createTempPubs.push(temp.toString());
            }
        }

        for (let i = 0; i < developers.length; i++) {
            const temp = developers[i].toString().split(';'); // splits ["genreA;genreB"] --> ['genreA', 'genreB']
            if (temp.length > 1) { // if has multiple genre
                for (let x = 0; x < temp.length; x++) {
                    createTempDev.push(temp[x]); // push each individually into dummy
                }
            } else { // if there is only one genre
                createTempDev.push(temp.toString());
            }
        }

        // get me uniq datas
        const uniqGenres = new Set(createTempGenres);
        const uniqPlatform = new Set(createTempPlats);
        const uniqPublisher = new Set(createTempPubs);
        const uniqDeveloper = new Set(createTempDev);

        const tempData = games.map((element, index) => {
            return [games[index], newGenres[index], newPublishers[index], newDevelopers[index], newPlatform[index], prices[index]];
        });

        tempData.forEach(function (elements) {
            const temp = {};
            Object.assign(temp, elements);
            temp['Title'] = temp[0];
            temp['Genres'] = temp[1];
            temp['Publisher'] = temp[2];
            temp['Developer'] = temp[3];
            temp['Platforms'] = temp[4];
            temp['Price'] = temp[5];
            delete temp[0];
            delete temp[1];
            delete temp[2];
            delete temp[3];
            delete temp[4];
            delete temp[5];

            newData.push(temp);
        });
        const gens = Array.from(uniqGenres);
        const pubs = Array.from(uniqPublisher);
        const devs = Array.from(uniqDeveloper);

        const d = gens;
        // Remove Indie, since indie is the most common genre
        for (let i = 0; i < gens.length; i++) {

            if (gens[i] === 'Indie') {

                gens.splice(i, 1);
            }

        }
        let counter = 0;
        const publisherWithGen = [];
        let testingGen = [];
        let a = [];
        let a_counter = 0;
        const mainTEstGen = [];
        console.log(newData);

        // gets the games that matches the genre exlucding indie
        for (let i = 0; i < d.length; i++) {
            testingGen = [];
            counter = 0;
            newData.forEach(function name(params) {
                if (params.Genres.find((item) => item === gens[i])) {
                    counter++;
                    testingGen.push(params);
                }
            });
           
            mainTEstGen.push(testingGen);
            publisherWithGen.push(counter);


        }


        // gets games with indie
        let newCounter = [];
        let devCounter = [];
        mainTEstGen.forEach(function (element) {
            let c = 0;
            a_counter = 0;
            let dev_counter = 0;
            element.forEach(function (items) {
                for (let i = 0; i < d.length; i++) {

                    if (items.Genres.find((item) => item === d[i])) {
                        a_counter += items.Publisher.length;
    
                    }
                    if (items.Genres.find((item) => item === d[i])) {
                        dev_counter += items.Developer.length;

                    }
                  
        
                }
    
                if (items.Genres.find((item) => item === 'Indie')) {
                    c++;
                    
                }
            });
            a.push(a_counter);
            devCounter.push(dev_counter);
            newCounter.push(c);
        });




        const graph = [
            {
                type: 'bar',
                x: gens,
                y: publisherWithGen,
                name: 'Main Genre',
            },
            {
                type: 'bar',
                x: gens,
                y: newCounter,
                name: 'Indie Subgenre',
            },
            {
                type: 'bar',
                x: gens,
                y: a,
                name: 'Publisher',
            },
            {
                type: 'bar',
                x: gens,
                y: devCounter,
                name: 'Developers',
            },
        ];

        const myLayout = {
            title: 'Number of Games per Genres',
            wdith: 1000,
            font: {
                family: 'Raleway, sans-serif'
            },
            barmode: 'group',
            bargap: 0.15,
            bargroupgap: 0.1,
            yaxis: {
                title: 'Number of Games',
                titlefont: {
                    size: 16,
                    color: 'rgb(107, 107, 107)'
                },
                tickfont: {
                    size: 14,
                    color: 'rgb(107, 107, 107)'
                }
            },
            xaxis: {
                title: 'Main Genres',
                tickangle: 'auto',
                titlefont: {
                    size: 16,
                    color: 'rgb(107, 107, 107)'
                },
                tickfont: {
                    size: 14,
                    color: 'rgb(107, 107, 107)'
                }
            },
        };

        Plotly.newPlot(TESTING, graph, myLayout);








    });
});