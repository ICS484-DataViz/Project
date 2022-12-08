const inputFileMac = document.querySelector('#file');
const dataMac = [];
const mac = [];
const macTotal = [];

inputFileMac.addEventListener("change", async () => {
  const excelFile = inputFileMac.files[0];

  dfd.readCSV(excelFile).then((df) => {
    console.log(df);
    const tempDate = [];
    const games = df.name.getColumnData;
    const releaseDate = df.release_date.getColumnData;
    const platform = df.platforms.getColumnData;
    const avg = df.average_playtime.getColumnData;
    console.log(avg);

    releaseDate.forEach(function (dates) {
      tempDate.push(new Date(dates).getFullYear());
    })
    const getYearsOnly = tempDate;
    const tempData = games.map((element, index) => {
      return [games[index], avg[index], getYearsOnly[index]];
    });

    // grabs the years from the date column of the csv file
    for (let i = 0; i < releaseDate.length; i++) {
      const input = releaseDate[i].split('/');
      const temp = platform[i].split(';');
      const dateObject = new Date(input[2] + '-' + input[0] + '-' + input[1]);
      const year = dateObject.getFullYear();
      let holder = null;
      if (temp.length > 1) {
        for (let x = 0; x < temp.length; x++) {
          if (temp[x] === 'mac') {
            mac.push(year);
          }
        }
      }
    }

    const uniqYearMac = new Set(mac);
    uniqYearMac.forEach(doWorkMac);
    macTotal.sort((a, b) => // sorts the genres by size
        Object.keys(a) > Object.keys(b) ? 1 : Object.keys(a) < Object.keys(b) ? -1 : 0)
    console.log(macTotal);

    const macX = [];
    const macY = [];
    for (let i = 0; i < macTotal.length; i++) {
      macX.push(Object.keys(macTotal[i]).toString());
      macY.push(Object.values(macTotal[i])[0]);
    }

    tempData.forEach(function (elements) {
      const temp = {};
      Object.assign(temp, elements);
      temp['title'] = temp[0];
      temp['AveragePlaytime'] = temp[1];
      temp['YearOnly'] = temp[2];
      delete temp[0];
      delete temp[1];
      delete temp[2];

      data.push(temp);
    });

    const avgPlayData = data.sort(sortAveragePlayTime);
    const highestPlayTime = avgPlayData.filter((items) => ((items.AveragePlaytime / 100) >= 100));

    console.log("Most PlayTime: ", highestPlayTime);
    const topGames = highestPlayTime.slice(0, 10);

    const nameOfGame = topGames.map((items) => items.title);
    const averagePlaytime = topGames.map((items) => items.AveragePlaytime);

    const macTrace = [{
      x: macX,
      y: macY,
      mode: 'lines+markers',
      name: 'Mac'
    }];

    const macLayout = {
      title: 'Mac Compatible Games Throughout the Years',
      xaxis: {
        title: 'Years'
      },
      yaxis: {
        title: 'Mac'
      },
      hovermode: 'x unified',
      height: 700,
      width: 1000
    }

    const averageTrace = [
      {
        x: nameOfGame,
        y: averagePlaytime,
        type: 'bar',
        name: 'Average Playtime'
      }
    ];

    const averageLayout = {
      title: 'Top 10 Games with the Highest Average Playtime',
      showlegend: true,
      height: 800,
      yaxis: {
        title: 'Average Playtime in Minutes',
      },
      xaxis: {
        title: 'Top 10 Games',
        text: 'Games'
    }}

    Plotly.newPlot('MacGames', macTrace, macLayout);
    Plotly.newPlot('AveragePlay', averageTrace, averageLayout);
  })

});

const doWorkMac = (value) => {
  const temp = mac.filter(item => item === value); // find the all genre === value from dummy
  const name = temp[0]; // gets the name of that genre
  const data = {}; // temp holder
  data[name] = temp.length; // asigns data = { 'genreName' : total number of genre}
  macTotal.push(data);
};

const sortAveragePlayTime = (a, b) => {
  return b.AveragePlaytime - a.AveragePlaytime;
};