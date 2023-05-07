import { IconDivide, IconEqual, IconMinus, IconParentheses, IconPlus, IconSquareRoot, IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { OperationService } from "../lib/services/OperationService";
import { User } from "../lib/types";

const Calculator = ({ 
  user,
  setUser,
  setBalance,
  setAlert
}: {
  user: User | undefined,
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>,
  setBalance: React.Dispatch<React.SetStateAction<number>>,
  setAlert: React.Dispatch<React.SetStateAction<string>>
}) => {
  const [input, setInput] = useState("0");
  const [parenthesesCount, setParenthesesCount] = useState(0);

  const operators = ['+', '-', '*', '/', '.', 'sqrt(', 'random_string'];

  const [isLoadingInput, setIsLoadingInput] = useState(false);

  const operationService = new OperationService();

  useEffect(() => {
    if (user && user.balance && user.balance < 0) {
      setAlert("Balance insufficient for calculation.");
      setUser((prevUser) => {
        if (prevUser) {
          return {
            ...prevUser,
            balance: 0
          }
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const endsWithOperator = (value?: string) => {
    if (input === undefined) {
      return false
    }

    if (!value) return operators.some((operator) => input.toString().endsWith(operator));
    return operators.some((operator) => input.toString().endsWith(operator)) && input.toString().endsWith(value);
  }

  const handleClick = (value: string) => {
    if (input === undefined || input === "Error" ||
      (input.length === 1 && input === "0")) {
      setInput(value);
    } else if (endsWithOperator(value)) {
      return;
    } else if (value === "parentheses") {
      if (parenthesesCount % 2 === 0) {
        setInput((input) => input + "(");
      } else {
        setInput((input) => input + ")");
      }
      setParenthesesCount((parentheses) => parentheses + 1);
    } else if (value === "sqrt(" && !endsWithOperator()) {
      setInput((input) => input + value);
      setParenthesesCount((parentheses) => parentheses + 1);
    } else if (input === "" && value === ".") {
      setInput("0.");
    } else if (endsWithOperator() && value === ".") {
      setInput((input) => input + "0.");
    } else {
      setInput((input) => input + value);
    }
  };

  const handleClear = () => {
    setInput("0");
    setParenthesesCount(0);
  };

  const handleRandomString = () => {
    setIsLoadingInput(true);
    operationService.getRandomString()
      .then(({ random_string, balance }) => {
        setIsLoadingInput(false);
        setInput(random_string);
        setBalance(balance);
      })
      .catch((err) => {
        setIsLoadingInput(false);
        setInput("Error");
        console.error(err);
      })
  }

  const handleCalculate = () => {
    try {
      if (input === "Error" || input.includes("undefined")) {
        setInput("");
        return
      }

      setIsLoadingInput(true);
      operationService.calculate(input)
        .then((res) => {
          setInput(res.result);
          setUser((prevUser) => {
            if (prevUser) {
              return {
                ...prevUser,
                balance: res.balance
              }
            }
            return prevUser;
          });
          setBalance(res.balance);
          setIsLoadingInput(false);
        })
        .catch((err) => {
          setInput("Error");
          console.error(err.message);
          setIsLoadingInput(false);
          if (err.message === 'Request failed with status code 402') {
            setAlert("Balance insufficient for calculation.");
          }
        })


    } catch (error) {
      setInput("Error");
    }
  };

  return (
    <div className="container mx-auto max-w-xs py-8">
      {/* <button className="btn" onClick={() => {setIsLoadingInput(!isLoadingInput)}}>a</button> */}
      <div className="bg-black rounded-lg shadow-lg p-4">
        {isLoadingInput === true ? (
          <div className="bg-primary text-right text-4xl font-bold mb-4 p-5 rounded w-full flex justify-center items-center h-full">
            <progress className="progress w-56 "></progress>
          </div>
        ) : (
          <input className="bg-primary text-right text-4xl font-bold mb-4 p-1 rounded w-full"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleCalculate();
              }
            }}
          />
        )}
        <div className="grid grid-cols-4 gap-4">
          <button
            className="btn btn-outline-primary"
            onClick={handleClear}
          >
            AC
          </button>
          <button
            className="btn btn-outline-primary"
            onClick={() => handleClick("sqrt(")}
          >
            <IconSquareRoot />
          </button>
          <button
            className="btn btn-outline-primary"
            onClick={handleRandomString}
          >
            Rand
          </button>
          <button
            className="btn btn-outline-primary"
            onClick={() => handleClick("/")}
          >
            <IconDivide />
          </button>
          <button className="btn btn-primary" onClick={() => handleClick("7")}>
            7
          </button>
          <button className="btn btn-primary" onClick={() => handleClick("8")}>
            8
          </button>
          <button className="btn btn-primary" onClick={() => handleClick("9")}>
            9
          </button>
          <button
            className="btn btn-outline-primary"
            onClick={() => handleClick("*")}
          >
            <IconX />
          </button>
          <button className="btn btn-primary" onClick={() => handleClick("4")}>
            4
          </button>
          <button className="btn btn-primary" onClick={() => handleClick("5")}>
            5
          </button>
          <button className="btn btn-primary" onClick={() => handleClick("6")}>
            6
          </button>
          <button
            className="btn btn-outline-primary"
            onClick={() => handleClick("-")}
          >
            <IconMinus />
          </button>
          <button className="btn btn-primary" onClick={() => handleClick("1")}>
            1
          </button>
          <button className="btn btn-primary" onClick={() => handleClick("2")}>
            2
          </button>
          <button className="btn btn-primary" onClick={() => handleClick("3")}>
            3
          </button>
          <button
            className="btn btn-outline-primary"
            onClick={() => handleClick("+")}
          >
            <IconPlus />
          </button>
          <button className="btn btn-primary" onClick={() => handleClick("0")}>
            0
          </button>
          <button
            className="btn btn-outline-primary"
            onClick={() => handleClick(".")}
          >
            .
          </button>
          <button
            className="btn btn-outline-primary col-span"
            onClick={handleCalculate}
          >
            <IconEqual />
          </button>
          <button
            className="btn btn-outline-primary col-span"
            onClick={() => handleClick("parentheses")}
          >
            <IconParentheses />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;