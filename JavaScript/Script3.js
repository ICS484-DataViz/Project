const data = [];


// Do all the work in here
dfd.readCSV('../../DataStuff/steam.csv').then((df) => {
  console.log(df);
  const tempDate = [];
  const games = df.name.getColumnData;
  const posRating = df.positive_ratings.getColumnData;
  const negRating = df.negative_ratings.getColumnData;
  const releaseDate = df.release_date.getColumnData;
  const publisher = df.publisher.getColumnData;
  releaseDate.forEach(function (dates) {
    tempDate.push(new Date(dates).getFullYear());
  })
  const getYearsOnly = tempDate;
  const tempData = games.map((element, index) => {
    return [games[index], posRating[index], negRating[index], getYearsOnly[index], publisher[index]];
  });

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

  const nameOfGame = topGames.map((items) => items.title);
  const gamesPosRatings = topGames.map((items) => items.PosRating);
  const gamesNegRatings = topGames.map((items) => items.NegRating);

  const trace1 = [
    {
      x: years,
      y: macGames,
      type: 'line',
      name: 'Mac Games vs Years'
    },
    {
      x: years,
      y: macGames,
      type: 'line',
      name: 'Mac Games vs Years'
    }
  ];

  const layout1 = {
    title: 'Mac Game Throughout the Year',
    showlegend: true,
    height: 1100,
    width: 1000,
    xaxis: {
      tickangle: -45,
      text: 'Games'
    }
  };

  Plotly.newPlot('MacGames', trace1, layout1);
});

