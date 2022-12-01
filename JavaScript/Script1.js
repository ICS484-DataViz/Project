TESTER = document.getElementById('myDiv');
TABLE = document.getElementById('myTable');
const inputFile = document.querySelector('#file');
const t = []; // holds the total for each genres
const dummy = []; // temp holder


inputFile.addEventListener("change", async () => {
    const excelFile = inputFile.files[0]
    // Do all the work in here
    dfd.readCSV(excelFile).then((df) => {
        const title = df.name.getColumnData;
        const id = df.appid.getColumnData;
        const genre = df.genres.getColumnData;
        const releaseDate = df.release_date.getColumnData;
        const genreYearDF = new dfd.DataFrame({'release_date': releaseDate});
        const total = [];

        genreYearDF.addColumn('genres', genre, {inplace: true})

        // grabs the years from the date column of the csv file
        for (let i = 0; i < releaseDate.length; i++) {
          const input = releaseDate[i].split('/');
          const dateObject = new Date(input[2] + '-' + input[0] + '-' + input[1]);
          const year = dateObject.getFullYear();

          /*
          Need to have each genre have its own set
          For each genre set, loop and get total for each year
          Will make an interactive table by choosing which genre and will show a chart showing years as the x axis
            and how much games of the selected genre was released for each year as the y axis
          */

          /*
          for (let z = 0; z < genre.length; z++) {

          }
          releaseDate[i] = year;

          */
        }

        console.log(genre);
        console.log(releaseDate);

        // handles splitting games with multiple genres
        for (let i = 0; i < genre.length; i++) {
            const temp = genre[i].split(';'); // splits ["genreA;genreB"] --> ['genreA', 'genreB']
            if (temp.length > 1) { // if has multiple genre
                for (let x = 0; x < temp.length; x++) {
                    dummy.push(temp[x]); // push each individually into dummy
                }
            } else { // if there is only one genre
                dummy.push(temp.toString());
            }
        }
        const uniqGenres = new Set(dummy); // gets the uniq genres, total 29 uniq genres


        uniqGenres.forEach(doWork); // totals up each genres
        t.sort((a, b) => // sorts the genres by size
            Object.values(a)[0] < Object.values(b)[0] ? 1 : Object.values(a)[0] > Object.values(b)[0] ? -1 : 0)
        const x = [];
        const y = [];
        for (let a = 0; a < 13; a++) {
            x.push(Object.keys(t[a]).toString());
            y.push(Object.values(t[a])[0]);
        }
        console.log(x);
        console.log(y);
        const tableVal = [
            x, y
        ];

        const trace1 = {
            x: x,
            y: y,
            type: 'bar',
        };

        const table1 = {
            type: 'table',
            header: {
                values: ['Genre', 'Total'],
                align: "center",
                line: { width: 1, color: 'black' },
                fill: { color: "grey" },
                font: { family: "Arial", size: 12, color: "white" }
            },
            cells: {
                values: tableVal
            }
        };



        const layout = {
            title: 'Steam Games Data by Genres(Bar)',
            showlegend: false,
            height: 900,
            width: 1000
        };

        const table_layout = {
            title: 'Steam Games Data by Genres(Table)',
            height: 900,
            width: 1000
        };

        const data = [trace1];
        const tableData = [table1];
        Plotly.newPlot('myDiv', data, layout);
        Plotly.newPlot(TABLE, tableData, table_layout);
    })
})


const doWork = (value) => {
    const temp = dummy.filter(item => item === value); // find the all genre === value from dummy
    const name = temp[0]; // gets the name of that genre
    const data = {}; // temp holder
    data[name] = temp.length; // asigns data = { 'genreName' : total number of genre}
    t.push(data);
};


