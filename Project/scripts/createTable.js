const createTable = (parentElement) => {
    let data;
    return {
      build: (dataInput) => {
        data = dataInput;
      },
      render: () => {
        let htmlTable = "<table>";
        htmlTable += data.map((row) => 
          "<tr>" + row.map((col) => 
            "<td>" + col + "</td>"
          ).join("")
        ).join("") + "</tr>";
        htmlTable += "</table";
        parentElement.innerHTML = htmlTable;
      }
    }
  }
  //da modificare
  