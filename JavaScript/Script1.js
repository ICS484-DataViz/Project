TESTER = document.getElementById('myDiv');
TABLE = document.getElementById('myTable');
const inputFile = document.querySelector('#file');
const t = []; // holds the total for each genres
const dummy = []; // temp holder
const multiplayer = [];
const multiplayerTotal = [];
const singleplayer = [];
const singleplayerTotal = [];

// Do all the work in here
inputFile.addEventListener("change", async () => {
  const excelFile = inputFile.files[0];
  dfd.readCSV(excelFile).then((df) => {
    const title = df.name.getColumnData;
    const id = df.appid.getColumnData;
    const genre = df.genres.getColumnData;
    const releaseDate = df.release_date.getColumnData;
    //const multiYearDF = new dfd.DataFrame({'release_date': releaseDate});
    const categories = df.categories.getColumnData;
    // let multiplayerDF = null;
    let counter = 0;
    //multiplayerDF.print();

    // genreYearDF.addColumn('genres', genre, {inplace: true})

    // grabs the years from the date column of the csv file
    for (let i = 0; i < releaseDate.length; i++) {
      const input = releaseDate[i].split('/');
      const temp = categories[i].split(';');
      const dateObject = new Date(input[2] + '-' + input[0] + '-' + input[1]);
      const year = dateObject.getFullYear();
      let holder = null;
      if (temp.length > 1) {
        for (let x = 0; x < temp.length; x++) {
          if (temp[x] === 'Multi-player') {
            // holder = temp[x];
            multiplayer.push(year);
          }
        }
      }
    }

    const uniqYearMultiplayer = new Set(multiplayer);
    uniqYearMultiplayer.forEach(doWorkMultiplayer);
    multiplayerTotal.sort((a, b) => // sorts the genres by size
      Object.keys(a) > Object.keys(b) ? 1 : Object.keys(a) < Object.keys(b) ? -1 : 0)
    console.log(multiplayerTotal);

    const multiplayerX = [];
    const multiplayerY = [];
    for (let a = 0; a < multiplayerTotal.length; a++) {
      multiplayerX.push(Object.keys(multiplayerTotal[a]).toString());
      multiplayerY.push(Object.values(multiplayerTotal[a])[0]);
    }

    const multiplayerTrace = {
      x: multiplayerX,
      y: multiplayerY,
      mode: 'lines+markers',
      name: 'Multi-player'
    };

    for (let i = 0; i < releaseDate.length; i++) {
      const input = releaseDate[i].split('/');
      const temp = categories[i].split(';');
      const dateObject = new Date(input[2] + '-' + input[0] + '-' + input[1]);
      const year = dateObject.getFullYear();
      if (temp.length > 1) {
        for (let x = 0; x < temp.length; x++) {
          if (temp[x] === 'Single-player') {
            singleplayer.push(year);
          }
        }
      }
    }

    const uniqYearSingleplayer = new Set(singleplayer);
    uniqYearSingleplayer.forEach(doWorkSingleplayer);
    singleplayerTotal.sort((a, b) => // sorts the genres by size
      Object.keys(a) > Object.keys(b) ? 1 : Object.keys(a) < Object.keys(b) ? -1 : 0)
    console.log(singleplayerTotal);

    const singleplayerX = [];
    const singleplayerY = [];
    for (let a = 0; a < singleplayerTotal.length; a++) {
      singleplayerX.push(Object.keys(singleplayerTotal[a]).toString());
      singleplayerY.push(Object.values(singleplayerTotal[a])[0]);
    }

    const singleplayerTrace = {
      x: singleplayerX,
      y: singleplayerY,
      mode: 'lines+markers',
      name: 'Single-player'
    };

    /*
    if (holder != null) {
      if (counter == 0) {
        multiplayerDF = new dfd.DataFrame([[year, holder]]);
        // multiplayerDF.print();
        counter++;
        holder = null;
      }
      else {
        multiplayerDF = multiplayerDF.append([[year, holder]], [counter]);
        counter++;
        holder = null;
      }
    }
  }
 
  multiplayerDF.sortValues('0', {inplace: true});
 
  console.log(multiplayerDF);
 
  */

    /*
    for (let i = 0; i < categories.length; i++) {
      const temp = categories[i].split(';');
      if (temp.length > 1) {
        for (let x = 0; x < temp.length; x++) {
          if (temp.length[x] === 'Multi-player') {
  
          }
        }
      }
    }
    */

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

    // console.log(genre);
    // console.log(releaseDate);

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

    const scatterLayout = {
      title: 'Single-player Vs Multi-player Release Count by Years',
      xaxis: {
        title: 'Years'
      },
      yaxis: {
        title: 'Count'
      },
      hovermode: 'x unified',
      height: 900,
      width: 1000
    }

    const data = [trace1];
    const tableData = [table1];
    const scatterData = [multiplayerTrace, singleplayerTrace];
    Plotly.newPlot('myDiv', data, layout);
    Plotly.newPlot(TABLE, tableData, table_layout);
    Plotly.newPlot('scatterDiv', scatterData, scatterLayout);
  })

});


const doWork = (value) => {
  const temp = dummy.filter(item => item === value); // find the all genre === value from dummy
  const name = temp[0]; // gets the name of that genre
  const data = {}; // temp holder
  data[name] = temp.length; // asigns data = { 'genreName' : total number of genre}
  t.push(data);
};

const doWorkMultiplayer = (value) => {
  const temp = multiplayer.filter(item => item === value); // find the all genre === value from dummy
  const name = temp[0]; // gets the name of that genre
  const data = {}; // temp holder
  data[name] = temp.length; // asigns data = { 'genreName' : total number of genre}
  multiplayerTotal.push(data);
};

const doWorkSingleplayer = (value) => {
  const temp = singleplayer.filter(item => item === value); // find the all genre === value from dummy
  const name = temp[0]; // gets the name of that genre
  const data = {}; // temp holder
  data[name] = temp.length; // asigns data = { 'genreName' : total number of genre}
  singleplayerTotal.push(data);
};


