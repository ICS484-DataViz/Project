const inputFileMac = document.querySelector('#file');
const dataMac = [];
const mac = [];
const macTotal = [];

inputFileMac.addEventListener("change", async () => {
  const excelFile = inputFileMac.files[0];

  dfd.readCSV('../../DataStuff/steam.csv').then((df) => {
    const tempDate = [];
    const games = df.name.getColumnData;
    const releaseDate = df.release_date.getColumnData;
    const platform = df.platform.getColumnData;
    releaseDate.forEach(function (dates) {
      tempDate.push(new Date(dates).getFullYear());
    })
    console.log(tempDate);
    const getYearsOnly = tempDate;
    const tempData = games.map((element, index) => {
      return [games[index], getYearsOnly[index], platform[index]];
    });

    console.log(getYearsOnly);

    tempData.forEach(function (elements) {
      const temp = {};
      Object.assign(temp, elements);
      temp['title'] = temp[0];
      temp['LaunchYear'] = temp[1];
      temp['Platform'] = temp[2];
      delete temp[0];
      delete temp[1];
      delete temp[2];

      dataMac.push(temp);
    });

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

    const macTrace = {
      x: macX,
      y: macY,
      mode: 'lines+markers',
      name: 'Mac'
    };

    const macLayout = {
      title: 'Mac Games Throughout the Year',
      xaxis: {
        title: 'Years'
      },
      yaxis: {
        title: 'Mac'
      },
      hovermode: 'x unified',
      height: 900,
      width: 1000
    }

    Plotly.newPlot('MacGames', macTrace, macLayout1);
  })

});

const doWorkMac = (value) => {
  const temp = mac.filter(item => item === value); // find the all genre === value from dummy
  const name = temp[0]; // gets the name of that genre
  const data = {}; // temp holder
  data[name] = temp.length; // asigns data = { 'genreName' : total number of genre}
  macTotal.push(data);
};

