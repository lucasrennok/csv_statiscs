
//Get a Random Color
const getRandomColor = () => {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

//Create the vector colors
const generateColors = (len) => {
    let colors = []
    for(let i=0; i<len; i++){
        colors[colors.length] = getRandomColor();
    }
    return colors;
}

//this function will receive the data and create the graphs
const generateGraphs = (statistics) => {
    let keys = []
    let values = []
    let col_history = ""
    console.log("Generating Graphics...");
    for(let [col,dat] of statistics){
        console.log("COLUMN NAME: ", col);
        for(let [col2,dat2] of dat){
            if(col!=col_history){  //criar chart no html e armazenar dados appendChild
                let new_chart = document.createElement("canvas")
                let newBut = document.createElement("button")
                let div_stats = document.getElementById("div_stats")
                new_chart.setAttribute("width", "40%");
                new_chart.setAttribute("height", "40%");
                new_chart.setAttribute("id", "chart"+col);
                new_chart.setAttribute("padding", "1%");
                new_chart.setAttribute("margin", "auto");
                new_chart.setAttribute("margin-top", "0px");
                newBut.setAttribute("id", "but"+col);
                newBut.textContent = col;
                col_history=col;
                keys = [];
                values = [];
                div_stats.appendChild(newBut);
                newBut.addEventListener("click", function(){
                    let element = document.getElementById("chart"+col);
                    let el_but = document.getElementById("but"+col);
                    if(element.style.display=="none"){
                        element.style.display="block";
                        el_but.style.backgroundColor = "black";
                    }else{
                        element.style.display="none";
                        el_but.style.backgroundColor = "grey";
                    }
                });
                div_stats.appendChild(new_chart);
            }
            keys[keys.length]=col2;
            values[values.length]=dat2;
        }
        let el = document.getElementById("chart"+col);
        let t = 'pie';
        let show = true;
        let colors = generateColors(keys.length)
        if(keys.length>10){
            t = 'bar';
            show = false;
        }
        let chart = new Chart(el, {
            type: t,
            data: {
                datasets:[{
                    data: values,//values
                    backgroundColor: colors,//colors...
                    borderColor: 'gray',
                    borderWidth: 1
                }],
                labels: keys//keys
            },
            options:{
                title: {
                    fontColor: 'rgb(32, 32, 32)',
                    fontFamily: 'Ubuntu',
                    display: true,
                    fontSize: 15,
                    text: col
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                },
                legend: {
                    display: show
                }
            }
        });
        chart.draw();
        el.style.display = "none";
        console.log("Added Chart")
    }

}

//This function will work with the data received to generate the statistics data
const generateStatistics = (data_matrix,column_vector) => {
    console.log(data_matrix);
    console.log(column_vector);
    //first: the graphics
    let line;
    let statistics = new Map();
    for(let i=0; i<column_vector.length; i++){
        line = new Map();
        for(let j=0; j<data_matrix.length; j++){
            let name_col = data_matrix[j][column_vector[i]];
            if(line.has(name_col)===false){
                line.set(name_col,1);
            }else{
                line.set(name_col,line.get(name_col)+1);
            }
        }
        statistics.set(column_vector[i], line);
    }

    console.log("OUTPUT: ", statistics);
    generateGraphs(statistics);
}

