import { useState } from "react";
import "./App.css";
import { Button } from "./component/Button";
import aa from './assets/aa.wav'

const operators = ["%", "/", "+", "-", "*"];
function App() {
  const [strToDisplay, setStrToDisplay] = useState("");
  const [lastOperator, setLastOperator] = useState("");
  const [isPrank, setIsPrank] = useState(false)

  const handleOnClick = (val) => {
    //reset pranks
    isPrank && setIsPrank(false)

    // avoid operator at the begining
    if (operators.includes(val) && !strToDisplay.length) {
      return;
    }

    // make only one operator
    if (operators.includes(val)) {
      setLastOperator(val);
      const lastChar = strToDisplay.slice(-1);
      if (operators.includes(lastChar)) {
        return setStrToDisplay(strToDisplay.slice(0, -1) + val);
      }
    }

    // reset display
    if (val === "AC") {
      return setStrToDisplay("");
    }

    // remove last char
    if (val === "C") {
      return setStrToDisplay(strToDisplay.slice(0, -1));
    }

    // show sum =
    if (val === "=") {
      const lastChar = strToDisplay.slice(-1); //gives last charater of the string

      if (operators.includes(lastChar)) {
        setStrToDisplay(strToDisplay.slice(0, -1));
      }

      return total();
    }

    if (val === ".") {
      const lastOperatorIndex = strToDisplay.lastIndexOf(lastOperator);
      const lastNumberSet = strToDisplay.slice(lastOperatorIndex);

      if (lastNumberSet.includes(".")) {
        return;
      }

      if (!lastOperator && strToDisplay.includes(".")) {
        return;
      }
    }

    setStrToDisplay(strToDisplay + val);
  };

  // totalling
  const total = () => {
    const pk = randomNumber();

    if (pk) {
      playAudio()
      setIsPrank(true)
      setStrToDisplay()
    }
    const ttl = eval(strToDisplay) + pk;
    setStrToDisplay(ttl.toString());
  };

  ///playing audio

  const playAudio =() =>{
   const audio = new Audio(aa)
   audio.play()
  }

  //create random number
  const randomNumber = () => {
    const num = Math.round(Math.random() * 10);
    return num <= 10 ? num : 0;
  };

  const btns = [
    // { cls: "display", label: "0.00" },
    { cls: "btn btn-ac", label: "AC" },
    { cls: "btn btn-c", label: "C" },
    { cls: "btn btn-perc", label: "%" },
    { cls: "btn btn-7", label: "7" },
    { cls: "btn btn-8", label: "8" },
    { cls: "btn btn-9", label: "9" },
    { cls: "btn btn-divide", label: "/" },
    { cls: "btn btn-4", label: "4" },
    { cls: "btn btn-5", label: "5" },
    { cls: "btn btn-6", label: "6" },
    { cls: "btn btn-x", label: "*" },
    { cls: "btn btn-1", label: "1" },
    { cls: "btn btn-2", label: "2" },
    { cls: "btn btn-3", label: "3" },
    { cls: "btn btn-minus", label: "-" },
    { cls: "btn btn-plus", label: "+" },
    { cls: "btn btn-0", label: "0" },
    { cls: "btn btn-dot", label: "." },
    { cls: "btn btn-equals", label: "=" },
  ];
  return (
    <div className="wrapper">
      <div className="calculator">
        <div className={isPrank ? "display prank" : "display"}>{strToDisplay || "0.00"}</div>
        {btns.map((item, i) => {
          return <Button key={i} {...item} func={handleOnClick} />;
        })}
      </div>
    </div>
  );
}

export default App;