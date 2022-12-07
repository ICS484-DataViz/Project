TESTER = document.getElementById('myDiv');
TABLE = document.getElementById('myTable');
const inputFile = document.querySelector('#file');
const t = []; // holds the total for each genres
const dummy = []; // temp holder
const multiplayer = [];
const multiplayerTotal = [];
const singleplayer = [];
const singleplayerTotal = [];
const owner = [];
const ownerTotal = [];
const ownerSingle = [];
const ownerSingleTotal = [];

// Do all the work in here
inputFile.addEventListener("change", async () => {
  const excelFile = inputFile.files[0];
  dfd.readCSV(excelFile).then((df) => {
    const title = df.name.getColumnData;
    const id = df.appid.getColumnData;
    const genre = df.genres.getColumnData;
    const releaseDate = df.release_date.getColumnData;
    const categories = df.categories.getColumnData;
    const owners = df.owners.getColumnData;

    // genreYearDF.addColumn('genres', genre, {inplace: true})

    for (let i = 0; i < releaseDate.length; i++) {
      const input = releaseDate[i].split('/');
      const temp = categories[i].split(';');
      const ownerTemp = owners[i].split('-');
      const dateObject = new Date(input[2] + '-' + input[0] + '-' + input[1]);
      const year = dateObject.getFullYear();
      if (temp.length > 1) {
        for (let x = 0; x < temp.length; x++) {
          if (temp[x] === 'Multi-player' || 'Online Multi-Player' || 'Local Multi-Player') {
            owner.push({'year': year, 'owners': ownerTemp[0]});
            break;
          }
        }
      } else if (temp.length === 1) {
        if (temp[0] === 'Multi-player' || 'Online Multi-Player' || 'Local Multi-Player') {
          owner.push({'year': year, 'owners': ownerTemp[0]});
        }
      }
    }

    // grabs the years from the date column of the csv file
    for (let i = 0; i < releaseDate.length; i++) {
      const input = releaseDate[i].split('/');
      const temp = categories[i].split(';');
      const dateObject = new Date(input[2] + '-' + input[0] + '-' + input[1]);
      const year = dateObject.getFullYear();
      if (temp.length > 1) {
        for (let x = 0; x < temp.length; x++) {
          if (temp[x] === 'Multi-player' || 'Online Multi-Player' || 'Local Multi-Player') {
            multiplayer.push(year);
            break;
          }
        }
      } else if (temp.length === 1) {
        if (temp[0] === 'Multi-player' || 'Online Multi-Player' || 'Local Multi-Player') {
          multiplayer.push(year);
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

    uniqYearMultiplayer.forEach(doWorkMultiOwner);
    console.log(ownerTotal);
    ownerTotal.sort((a, b) => // sorts the genres by size
        Object.keys(a) > Object.keys(b) ? 1 : Object.keys(a) < Object.keys(b) ? -1 : 0)
    console.log(ownerTotal);

    const ownerMultiX = [];
    const ownerMultiY = [];

    for (let a = 0; a < ownerTotal.length; a++) {
      ownerMultiX.push(Object.keys(ownerTotal[a]).toString());
      ownerMultiY.push(Object.values(ownerTotal[a])[0]);
    }

    const ownerMultiTrace = {
      x: ownerMultiX,
      y: ownerMultiY,
      mode: 'lines+marker',
      name: 'Multi-player Owners',
      line: {
        dash: 'dot',
        width: 4
      }
    }

    for (let i = 0; i < releaseDate.length; i++) {
      const input = releaseDate[i].split('/');
      const temp = categories[i].split(';');
      const ownerTemp = owners[i].split('-');
      const dateObject = new Date(input[2] + '-' + input[0] + '-' + input[1]);
      const year = dateObject.getFullYear();
      if (temp.length > 1) {
        for (let x = 0; x < temp.length; x++) {
          if (temp[x] === 'Single-player') {
            ownerSingle.push({'year': year, 'owners': ownerTemp[0]});
          }
        }
      } else if (temp.length === 1) {
        if (temp[0] === 'Single-player') {
          ownerSingle.push({'year': year, 'owners': ownerTemp[0]});
        }
      }
    }

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
      } else if (temp.length == 1) {
        if (temp[0] === 'Single-player') {
          singleplayer.push(year);
        }
      }
    }

    console.log(singleplayer);

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

    uniqYearSingleplayer.forEach(doWorkSingleOwner);
    console.log(ownerSingleTotal);
    ownerSingleTotal.sort((a, b) => // sorts the genres by size
        Object.keys(a) > Object.keys(b) ? 1 : Object.keys(a) < Object.keys(b) ? -1 : 0)
    //console.log(ownerTotal);

    const ownerSingleX = [];
    const ownerSingleY = [];

    for (let a = 0; a < ownerSingleTotal.length; a++) {
      ownerSingleX.push(Object.keys(ownerSingleTotal[a]).toString());
      ownerSingleY.push(Object.values(ownerSingleTotal[a])[0]);
    }

    const ownerSingleTrace = {
      x: ownerSingleX,
      y: ownerSingleY,
      mode: 'lines+marker',
      name: 'Single-player Owners',
      line: {
        dash: 'dot',
        width: 4
      }
    }

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
      width: 800,
    }

    const scatterOwnerLayout = {
      title: 'Single-player Vs Multi-player Owner Count by Years',
      xaxis: {
        title: 'Years'
      },
      yaxis: {
        title: 'Count'
      },
      hovermode: 'x unified',
      height: 900,
      width: 800
    }

    const data = [trace1];
    const tableData = [table1];
    const scatterData = [multiplayerTrace, singleplayerTrace];
    const scatterOwnerData = [ownerMultiTrace, ownerSingleTrace];
    Plotly.newPlot('myDiv', data, layout);
    Plotly.newPlot(TABLE, tableData, table_layout);
    Plotly.newPlot('scatterDiv', scatterData, scatterLayout);
    Plotly.newPlot('scatterOwnerDiv', scatterOwnerData, scatterOwnerLayout);
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

const doWorkMultiOwner = (value) => {
  const temp = owner.filter(item => item.year === value);
  console.log(temp);
  const name = value;
  const data = {};
  //console.log(Object.values());
  data[name] = temp.reduce((total, current) => Number(total) + Number(current.owners), 0);
  ownerTotal.push(data);
};

const doWorkSingleplayer = (value) => {
  const temp = singleplayer.filter(item => item === value); // find the all genre === value from dummy
  const name = temp[0]; // gets the name of that genre
  const data = {}; // temp holder
  data[name] = temp.length; // asigns data = { 'genreName' : total number of genre}
  singleplayerTotal.push(data);
};

const doWorkSingleOwner = (value) => {
  const temp = ownerSingle.filter(item => item.year === value);
  console.log(temp);
  const name = value;
  const data = {};
  //console.log(Object.values());
  data[name] = temp.reduce((total, current) => Number(total) + Number(current.owners), 0);
  ownerSingleTotal.push(data);
};


