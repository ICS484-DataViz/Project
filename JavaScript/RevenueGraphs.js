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
    }); // --> [ [...games], [...genres], [...publishers], [...devs], [...prices], [...MinUsers]]

    const tempUniqsGenres = new Set(createTempGenres);
    const uniqGenres = Array.from(tempUniqsGenres);

    const totalRevPerGenre = [];
    const revsPerGenrePubs = [];
    uniqGenres.forEach(function (items) {
      let total = 0;
      tempData.forEach(function (element) {

        if (element[1].find((gen) => gen === items)) { // if genre === 'Action' example
          const rev = Math.round(element[4] * element[5]);
          const temps = [element[0], items, element[2], rev]; // --> ['Game title', 'genre', 'publisher', 'total rev']
          //console.log(items, element[2], rev);
          revsPerGenrePubs.push(temps);
          total += rev;
        }
      });
      totalRevPerGenre.push(total);
      // console.log(items, total)
    });

    const getMaxGameRevPerGen = [];
    const getNameGameRevPerGen = [];
    uniqGenres.forEach(function (elemets) {
      const maxDisplay = 10;
      const testingMax = revsPerGenrePubs.filter((elements) => elements[1] === elemets && (elements[1] !== 'Free to Play'));
      if (testingMax.length !== 0) {
        const removeZeros = testingMax.filter((items) => items[3] !== 0);
        const temp = removeZeros.sort(sortPrice);
        const final = temp.slice(0, maxDisplay);
        const prices = final.map((item) => item[3]);
        const namesss = final.map((item) => item[0]);
        console.log(prices);
        getMaxGameRevPerGen.push(prices);
        getNameGameRevPerGen.push(namesss);
      }
    });


    //console.log(totalRevPerGenre, revsPerGenrePubs);
    console.log(getMaxGameRevPerGen);
    const noFree = uniqGenres.filter((gens) => gens !== 'Free to Play');

    const trace1 = {
      x: noFree,
      y: [
          getMaxGameRevPerGen[0][0],
        getMaxGameRevPerGen[1][0],
        getMaxGameRevPerGen[2][0],
        getMaxGameRevPerGen[3][0],
        getMaxGameRevPerGen[4][0],
        getMaxGameRevPerGen[5][0],
        getMaxGameRevPerGen[6][0],
        getMaxGameRevPerGen[7][0],
        getMaxGameRevPerGen[8][0],
        getMaxGameRevPerGen[9][0],
        getMaxGameRevPerGen[10][0],
        getMaxGameRevPerGen[12][0],
        getMaxGameRevPerGen[13][0],
        getMaxGameRevPerGen[14][0],
        getMaxGameRevPerGen[15][0],
        getMaxGameRevPerGen[16][0],
        getMaxGameRevPerGen[17][0],
        getMaxGameRevPerGen[18][0],
        getMaxGameRevPerGen[19][0],
        getMaxGameRevPerGen[20][0],
        getMaxGameRevPerGen[21][0],
        getMaxGameRevPerGen[22][0],
        getMaxGameRevPerGen[23][0],
        getMaxGameRevPerGen[24][0],
        getMaxGameRevPerGen[25][0],
        getMaxGameRevPerGen[26][0],
        getMaxGameRevPerGen[27][0],
      ],
      name: '1st',
      type: 'bar'
    };

    const trace2 = {
      x: noFree,
      y: [
        getMaxGameRevPerGen[0][1],
        getMaxGameRevPerGen[1][1],
        getMaxGameRevPerGen[2][1],
        getMaxGameRevPerGen[3][1],
        getMaxGameRevPerGen[4][1],
        getMaxGameRevPerGen[5][1],
        getMaxGameRevPerGen[6][1],
        getMaxGameRevPerGen[7][1],
        getMaxGameRevPerGen[8][1],
        getMaxGameRevPerGen[9][1],
        getMaxGameRevPerGen[10][1],
        getMaxGameRevPerGen[12][1],
        getMaxGameRevPerGen[13][1],
        getMaxGameRevPerGen[14][1],
        getMaxGameRevPerGen[15][1],
        getMaxGameRevPerGen[16][1],
        getMaxGameRevPerGen[17][1],
        getMaxGameRevPerGen[18][1],
        getMaxGameRevPerGen[19][1],
        getMaxGameRevPerGen[20][1],
        getMaxGameRevPerGen[21][1],
        getMaxGameRevPerGen[22][1],
        getMaxGameRevPerGen[23][1],
        getMaxGameRevPerGen[24][1],
        getMaxGameRevPerGen[25][1],
        getMaxGameRevPerGen[26][1],
        getMaxGameRevPerGen[27][1],
      ],
      name: '2nd',
      type: 'bar'
    };

    const trace3 = {
      x: noFree,
      y: [
        getMaxGameRevPerGen[0][2],
        getMaxGameRevPerGen[1][2],
        getMaxGameRevPerGen[2][2],
        getMaxGameRevPerGen[3][2],
        getMaxGameRevPerGen[4][2],
        getMaxGameRevPerGen[5][2],
        getMaxGameRevPerGen[6][2],
        getMaxGameRevPerGen[7][2],
        getMaxGameRevPerGen[8][2],
        getMaxGameRevPerGen[9][2],
        getMaxGameRevPerGen[10][2],
        getMaxGameRevPerGen[12][2],
        getMaxGameRevPerGen[13][2],
        getMaxGameRevPerGen[14][2],
        getMaxGameRevPerGen[15][2],
        getMaxGameRevPerGen[16][2],
        getMaxGameRevPerGen[17][2],
        getMaxGameRevPerGen[18][2],
        getMaxGameRevPerGen[19][2],
        getMaxGameRevPerGen[20][2],
        getMaxGameRevPerGen[21][2],
        getMaxGameRevPerGen[22][2],
        getMaxGameRevPerGen[23][2],
        getMaxGameRevPerGen[24][2],
        getMaxGameRevPerGen[25][2],
        getMaxGameRevPerGen[26][2],
        getMaxGameRevPerGen[27][2],
      ],
      name: '2nd',
      type: 'bar'
    };



    var data = [trace1, trace2, trace3];

    var layout = {barmode: 'stack'};

    Plotly.newPlot('testRee', data, layout);

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

const sortPrice = (a, b) => {
  return b[3] - a[3];
}