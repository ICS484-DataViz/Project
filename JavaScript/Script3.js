const inputFileMac = document.querySelector('#file');
const dataMac = [];
const mac = [];
const macTotal = [];

inputFileMac.addEventListener("change", async () => {
  const excelFile = inputFileMac.files[0];

  dfd.readCSV(excelFile).then((df) => {
    const tempDate = [];
    const games = df.name.getColumnData;
    const releaseDate = df.release_date.getColumnData;
    const platform = df.platforms.getColumnData;

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

    const macTrace = [{
      x: macX,
      y: macY,
      mode: 'lines+markers',
      name: 'Mac'
    }];

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


    Plotly.newPlot('MacGames', macTrace, macLayout);
  })

});

const doWorkMac = (value) => {
  const temp = mac.filter(item => item === value); // find the all genre === value from dummy
  const name = temp[0]; // gets the name of that genre
  const data = {}; // temp holder
  data[name] = temp.length; // asigns data = { 'genreName' : total number of genre}
  macTotal.push(data);
};

