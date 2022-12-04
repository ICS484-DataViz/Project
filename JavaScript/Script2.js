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

    tempData.forEach(function (elements) {
      const temp = {};
      Object.assign(temp, elements);
      temp['title'] = temp[0];
      temp['PosRating'] = temp[1];
      temp['NegRating'] = temp[2];
      temp['LaunchYear'] = temp[3];
      temp['Publisher'] = temp[4];
      temp['totalRatings'] = temp[1] + temp[2];
      delete temp[0];
      delete temp[1];
      delete temp[2];
      delete temp[3];
      delete temp[4];

      data.push(temp);
    });

    const dataRatingPos = data.sort(sortPosRating);
    const mostPopularGames = dataRatingPos.filter((items) => ((items.PosRating / items.totalRatings) * 100) >= 80); // if at least 80% of total reviews is pos
    const dataRatingsNeg = data.sort(sortNegRating);
    const leastPopularGames = dataRatingsNeg.filter((items) => ((items.PosRating / items.totalRatings) * 100) <= 60); // if rating is less than 39 then its least liked

    console.log("Most Pop: ", mostPopularGames);
    const topGames = mostPopularGames.slice(0, 10);
    const leastGames = leastPopularGames.slice(0, 10);
    console.log("Least Pop: ", leastPopularGames);

    const nameOfGame = topGames.map((items) => items.title);
    const gamesPosRatings = topGames.map((items) => items.PosRating);
    const gamesNegRatings = topGames.map((items) => items.NegRating);

    const nameOfGame2 = leastGames.map((items) => items.title);
    const gamesPosRatings2 = leastGames.map((items) => items.PosRating);
    const gamesNegRatings2 = leastGames.map((items) => items.NegRating);

    const trace1 = [
      {
          x: nameOfGame,
          y: gamesPosRatings,
          type: 'bar',
        name: 'Positive Ratings'
      },
      {
        x: nameOfGame,
        y: gamesNegRatings,
        type: 'bar',
        name: 'Negative Ratings'
      }
    ];

    const trace2 = [
      {
        x: nameOfGame2,
        y: gamesPosRatings2,
        type: 'bar',
        name: 'Positive Ratings'
      },
      {
        x: nameOfGame2,
        y: gamesNegRatings2,
        type: 'bar',
        name: 'Negative Ratings'
      }
    ];

    const layout1 = {
      title: 'Top 10 Popular Games',
      showlegend: true,
      height: 1100,
      width: 1000,
      xaxis: {
        tickangle: -45,
        text: 'Games'
      }
    };

    const layout2 = {
      title: 'Top 10 Least Popular Games',
      showlegend: true,
      height: 1100,
      width: 1000,
      xaxis: {
        tickangle: -45,
        text: 'Games'
      }
    };

    Plotly.newPlot('MostLikedGames', trace1, layout1);
    Plotly.newPlot('MostHatedGames', trace2, layout2);
  });





const sortPosRating = (a, b) => {
  return b.PosRating - a.PosRating;
}

const sortNegRating = (a, b) => {
  return b.NegRating - a.NegRating;
}

const sortYear = (a, b) => {
  return b.LaunchYear - a.LaunchYear;
}









