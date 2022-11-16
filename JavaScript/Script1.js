TESTER = document.getElementById('myDiv');
const inputFile = document.querySelector('#file');
const t = [];
const dummy = [];


inputFile.addEventListener("change", async () => {
    const excelFile = inputFile.files[0]
    // Do all the work in here
    dfd.readExcel(excelFile).then((df) => {
       // df.head().print();
       const tittle = df.name.getColumnData;
       const genre = df.genres.getColumnData;
       const total = [];
       console.log(genre);

       // handles spliting games with multiple genres
       for(let i = 0; i < genre.length; i++) {
            const temp = genre[i].split(';'); // splits ["genreA;genreB"] --> ['genreA', 'genreB']
            if (temp.length > 1) { // if has multiple gerne
                for(let x = 0; x < temp.length; x++) {
                    dummy.push(temp[x]); // push each individually into dummy
                }
            } else { // if there is only one genre
                dummy.push(temp.toString());
            }
       }
       const uniqGenres = new Set(dummy); // gets the uniq genres, total 29 uniq genres
       

       uniqGenres.forEach(doWork);
       const x = [];
       const y = [];
       for (let a = 0 ; a < t.length; a++) {
            x.push(Object.keys(t[a]).toString());
            y.push(Object.values(t[a])[0]);
       }
       console.log(x);
       console.log(y);

       const trace1 = {
            x: x,
            y: y,
            type: 'bar',
       };

       const layout = {
        title: 'Marker Size',
        showlegend: false,
        height: 900,
        width: 1000
      };

       const data = [trace1];
        Plotly.newPlot('myDiv', data, layout);

       //const t = dummy.filter(item => item === uniqGenres);
      // console.log(t);

    })
})

const a = 2;
const b = 3;

const answer = (a, b) => {
    console.log(a);
    console.log(b);

};

const doWork = (value) => {
   const temp = dummy.filter(item => item === value);
   const name = temp[0];
   const data = {};
   data[name] = temp.length;
   t.push(data);
};


var trace1 = {
    x: [1, 2, 3, 4],
    y: [10, 15, 13, 17],
    mode: 'markers',
    type: 'scatter'
  };
  
  var trace2 = {
    x: [2, 3, 4, 5],
    y: [16, 5, 11, 9],
    mode: 'lines',
    type: 'scatter'
  };
  
  var trace3 = {
    x: [1, 2, 3, 4],
    y: [12, 9, 15, 12],
    mode: 'lines+markers',
    type: 'scatter'
  };
  
  var data = [trace1, trace2, trace3];
  
