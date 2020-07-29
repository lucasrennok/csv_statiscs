let drop_area = document.querySelector('.droppable');
let upload_button = document.getElementById("upload");

FileList = undefined;
let file_names = [];
let csv_data = [];
upload_button.addEventListener("click", uploadFiles);

function callback(files) {
  let drop = document.getElementById("drop_f");
  let number = files.length;
  drop.innerHTML = number + " Files Selected";
  FileList = files;
}

const checkFiles = (FileList) => {
  for (let file of FileList) {
    let extension = "" + file.name[file.name.length - 4] + file.name[file.name.length - 3] + file.name[file.name.length - 2] + file.name[file.name.length - 1];
    if (file.type == "application/vnd.ms-excel" || extension == ".csv") {
      console.log("OUTPUT: Okay, it's a CSV file:", file.name);
      let reader = new FileReader();
      reader.readAsText(file);
      reader.addEventListener("loadend", function () {
        for (let nm of file_names) {
          if (nm == file.name){
            console.log("ERROR: FILES WITH THE SAME NAMES!");
            window.alert("OUTPUT: There are some files with the same names. Put the files again.")
            return -1;
          }
        }
        console.log("OUTPUT: NEW FILE SAVED");
        file_names[file_names.length] = file.name;
        csv_data[csv_data.length] = reader.result;
        if(!compatibleCSVs){
          return -1;
        }
        //console.log(reader.result);
      });
    } else {
      console.log("ERROR: NOT A CSV FILE!");
      window.alert("OUTPUT: Put only CSV files. Put the files again.");
      return -1;
    }
  }
  return 0;
}

makeDroppable(drop_area, callback);


function uploadFiles() {
  if (FileList == undefined) {
    window.alert("No Files");
    return;
  }
  else if(checkFiles(FileList)==-1){
    let drop = document.getElementById("drop_f");
    drop.innerHTML = "Put your files here.";
    FileList = undefined;
    csv_data = [];
    file_names = [];
    return;
  }
  console.log("Uploaded");
  
  const upload_div = document.getElementById("upload_div");
  
  upload_div.style.display = "none";
}

//confere compatibilidade dos csvs
function compatibleCSVs() {
  if(csv_data.length>1){
    //compara ultimo com primeiro
  }
  return true;
}

