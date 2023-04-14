import './App.css';
import { useEffect, useState } from "react";

function App() {
  const [value, setValue] = useState(18);
  const [mines, setMines] = useState([]);
  const [clickState, setClickState] = useState(false);

  useEffect(() => {
    createMines();
  }, []);

  const handleChange = (event) => {
    setValue(+event.target.value);
    createMines();
  }

  const createMines = () => {
    let arr = [];
    let line = [];
    for (let i = 0; i < value; i++) {
      line = [];
      for (let j = 0; j < value; j++) {
        line.push({
          mined: Math.floor(Math.random() * 5 - 3) > 0 ? true : false,
          hidden: true,
          coordinates: [i, j],
          flag: false,
        });
      }
      arr.push(line);
    }

    for (let i = 0; i < value; i++) {
      for (let j = 0; j < value; j++) {
        let counter = 0;

        counter += checkIfMined(arr, i, j-1);
        counter += checkIfMined(arr, i-1, j);
        counter += checkIfMined(arr, i-1, j-1);
        counter += checkIfMined(arr, i, j+1);
        counter += checkIfMined(arr, i+1, j);
        counter += checkIfMined(arr, i+1, j+1);
        counter += checkIfMined(arr, i-1, j+1);
        counter += checkIfMined(arr, i+1, j-1);

        arr[i][j].totalNearMines = counter;
      }
    }

    setMines(arr);
    console.log(arr);
  }

  const checkIfMined = (arr, i, j) => {
    if (arr[i]?.[j]?.mined) {
          return 1;
    }
    return 0;
  }

  const showCells = (newMines, i, j) => {
    newMines[i][j].hidden = false;
    if (newMines[i][j].totalNearMines || newMines[i][j].mined) {
      return newMines;
    }

    if (!newMines?.[i-1]?.[j]?.totalNearMines && !newMines?.[i-1]?.[j]?.mined && newMines?.[i-1]?.[j] && newMines[i-1][j].hidden) {
      showCells(newMines, i-1, j);
    } else if (newMines?.[i-1]?.[j]?.totalNearMines) {
      newMines[i-1][j].hidden = false;
    }

    if (!newMines?.[i]?.[j-1]?.totalNearMines && !newMines?.[i]?.[j-1]?.mined && newMines?.[i]?.[j-1] && newMines?.[i]?.[j-1]?.hidden) {
      showCells(newMines, i, j-1);
    } else if (newMines?.[i]?.[j-1]?.totalNearMines) {
      newMines[i][j-1].hidden = false;
    }

    if (!newMines?.[i]?.[j+1]?.totalNearMines && !newMines?.[i]?.[j+1]?.mined && newMines?.[i]?.[j+1] && newMines[i][j+1].hidden) {
      showCells(newMines, i, j+1);
    } else if (newMines?.[i]?.[j+1]?.totalNearMines) {
      newMines[i][j+1].hidden = false;
    }

    if (!newMines?.[i+1]?.[j]?.totalNearMines && !newMines?.[i+1]?.[j]?.mined && newMines?.[i+1]?.[j] && newMines[i+1][j].hidden) {
      showCells(newMines, i+1, j);
    } else if (newMines?.[i+1]?.[j]?.totalNearMines) {
      newMines[i+1][j].hidden = false;
    }

    if (newMines?.[i+1]?.[j-1]?.totalNearMines) {
      newMines[i+1][j-1].hidden = false;
    }
    if (newMines?.[i-1]?.[j+1]?.totalNearMines) {
      newMines[i-1][j+1].hidden = false;
    }
    if (newMines?.[i+1]?.[j+1]?.totalNearMines) {
      newMines[i+1][j+1].hidden = false;
    }
    if (newMines?.[i-1]?.[j-1]?.totalNearMines) {
      newMines[i-1][j-1].hidden = false;
    }

    return newMines;
  }

  const showCell = (event) => {

    let i = +event.target.getAttribute("data-i");
    let j = +event.target.getAttribute("data-j");

    if (mines[i][j].mined && !clickState) {
      alert("YOU LOOOSE");
    }

    if (clickState) {
      mines[i][j].flag = !mines[i][j].flag;
    }


    let newMines = [...mines];

    setMines(showCells(newMines, i, j));
    console.log(mines[i][j].hidden);
  }

  return (
    <div className="App">
        <input
          id="range-input"
          type="range"
          min="1"
          max="20"
          step="1"
          onChange={handleChange}
        />
        <p id="scale">{value}x{value}</p>
      {/* </div> */}

      <button className='state' onClick={() => setClickState(!clickState)}>
        {clickState ? "CLICKS" : "FLAGS"}
      </button>

      <div className="mines-field">
        {mines.map((cellsLine, index) =>
          <div className='mines-row' key={index}>
            {cellsLine.map((cell, index) =>
              <div
              className="cell"
              key={index}
              data-i={cell.coordinates[0]}
              data-j={cell.coordinates[1]}
              onClick={showCell}
              >
                {!cell.hidden
                  ?
                    cell.flag
                    ? "*"
                    : !cell.mined
                        ?
                          cell?.totalNearMines
                            ? cell?.totalNearMines
                            : ""
                        : "aAA"
                  : ""
                }
                {}
                </div>
            )}
          </div>)
        }
      </div>

    </div>
  );
}

export default App;
