const getNewInput = document.querySelector('#file');
RevGraph = document.getElementById('REVGRAPH');
const RevData = [];

/**
 * This file will count the number of games with the genre, the games can be counted again if it has the genre.
 */
getNewInput.addEventListener("change", async () => {
    const excelFile = getNewInput.files[0];
    // Do all the work in here
    dfd.readCSV(excelFile).then((df) => {
        console.log(df);
        const tempDate = [];
        const games = df.name.getColumnData;
        const publishers = df.publisher.getColumnData;
        const developers = df.developer.getColumnData;
        const prices = df.price.getColumnData;
        const genres = df.genres.getColumnData;
        const users = df.owners.getColumnData;

        const newGenres = [];
        const newPublishers = [];
        const newDevelopers = [];
        const minUsers = [];
        const createTempGenres = [];


        // handles splitting games with multiple genres
        genres.forEach(function name(params) {
            const temp = params.split(';'); // splits ["genreA;genreB"] --> ['genreA', 'genreB']
            newGenres.push(temp);

        });

        users.forEach(function (items) {
           const temp = items.split('-');

            minUsers.push(temp[0]);
        });

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

        developers.forEach(function name(params) {
            const temp = params.toString().split(';'); // splits ["genreA;genreB"] --> ['genreA', 'genreB']
            newDevelopers.push(temp);

        });

        publishers.forEach(function name(params) {
            const temp = params.toString().split(';'); // splits ["genreA;genreB"] --> ['genreA', 'genreB']
            newPublishers.push(temp);
        });

        const tempData = games.map((element, index) => {
            return [games[index], newGenres[index], newPublishers[index], newDevelopers[index], prices[index], minUsers[index]];
        });

        const tempUniqsGenres = new Set(createTempGenres);
        const uniqGenres = Array.from(tempUniqsGenres);

        const totalRevPerGenre = [];
        const revsPerGenrePubs = [];
        uniqGenres.forEach(function (items) {
            let total = 0;
           tempData.forEach(function (element) {

               if (element[1].find((gen) => gen === items)) {
                   const rev = element[4] * element[5];
                   const temps = [element[0], items, element[2], rev];
                   //console.log(items, element[2], rev);
                   revsPerGenrePubs.push(temps);
                   total += rev;
               }
           });
            totalRevPerGenre.push(total);
           // console.log(items, total)
        });

        console.log(totalRevPerGenre, revsPerGenrePubs);

        const revGrap = [
            {
                type: 'bar',
                x: uniqGenres,
                y: totalRevPerGenre,
            }
        ];

        const revLayOut = {
            title: 'Total Revenue',
            font: {
                family: 'Raleway, sans-serif'
            },
            yaxis: {
                title: 'Number of Games Sold',
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
            }
        };

        Plotly.newPlot(RevGraph, revGrap, revLayOut);





        // console.log(tempData, uniqGenres, totalRev);

    });
});