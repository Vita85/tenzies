import { useState, useEffect } from "react";

function App() {
  //-------------фішки-кнопки(створюємо і повертаємо нові рандомні)
  const [dices, setDiсes] = useState([]); //1)тут зберігатимуться фішки(кнопки)
  const [isWin, setIsWin] = useState(false);
  const createDices = () => {
    //2)фун-я яка створює фішки по новій
    const newDices = []; //3) і записує нові фішки в новий масив
    for (let i = 0; i < 10; i++) {
      //4) перебираємо новий масив
      newDices.push({
        //5) в цей новий масив буде пушитися новий об'єкт
        number: Math.ceil(Math.random() * 6), //а)рандомне число від 1 до 6
        id: i, //б) за  id буде i з циклу,індекс кожного елемента в масиві
        isLocked: false, //в) поле, фун-я яка відповідає за вже перевернуту фішку(зелену), по дефолту фішка типу перевернута
      });
    }
    setDiсes(newDices); //попередній масив замінили на новий створений
  };
  //7)так як нам потрібно функцію createDices викликати всього 1 раз, коли юзер завантажив сторінку, то ми можемо викликати її всередині  useEffect,
  useEffect(() => {
    createDices();
  }, []);

  //чи всі фішки мають однакове значення
  
  useEffect(() => {
    if (dices.length) {
      const allLocked = dices.every((dice) => dice.isLocked);

      const sameValue = dices.every((dice) => dice.number === dices[0].number);
  
      if (allLocked && sameValue) {
        setIsWin(true);
      }
    }
    
  }, [dices]);

  //----Працюємо з кнопкою Roll, вона має перебрати всі фішки які не заблоковані. У нас є масив dices, і ми знаємо методи масивів, на основі яких ми можемо змінювати старий масив і повертати новий на основі старого. Для цього пропишемо фун-ю onClickRollDices
  const onClickRollDices = () => {
    setDiсes((prevDices) => {
      // в ній викличемо setDiсes-змінимо наш масив гри з об'єктами, на основі старого масиву (prevDices-старого значення і повернемо:)
      return prevDices.map((dice) => {
        //старий масив, в якому візьмемо кожну фішку і переробляємо
        if (dice.isLocked === true) {
          //якщо isLocked === true, тобто закрита фішка,тоді поверни її ж)
          return dice;
        } else {
          return {
            ...dice, //id i isLocked залишаться старі,але number буде знову нове рандомне число
            number: Math.ceil(Math.random() * 6),
          };
        }
      });
    });
  };

  //---------Прописуємо фун-ю, яка буде блокувати фішки

const onClickLockDice = (id) => { //ця функ-я має змінити стейт dices
  setDiсes(prevDices => {
    return prevDices.map((dice) => {
      if(dice.id === id) {
        return {
          ...dice, 
          isLocked: !dice.isLocked,
        }
      } else {
        return dice //інакше просто поверни ту саму dice
      }
    });
  }); //тому тут ми викликаємо  setDiсes і в нього передаємо старе значення  і map повертаємо новий масив на основі старого, а мапимо ми кожну окрему фішку. І прописуємо, що якщо dice.id фішки збігається з id яке ми передали в const onClickLockDice = (id),якщо таке знаходить, тоді ми повертаємо об'єкт в який висипаємо  ...dice, а isLocked: ставимо на обернене значення-якщо не заблокована-заблокуй, інакше- розблокуй. А НА САМУ КНОПКУ МИ ПІДКЛЮЧАЄМО цю функцію і передаємо в неї id, бо по іншому ми конкретку кнопку не витягнемо
}

const onClickNewGame = () => {
  createDices() ;
  setIsWin(false);
}
  return ( 
    <div className="App">
      <div className="wrapper">
        <div className="tenz-background">
          <div className="container">
            <h1>Tenzies</h1>
            <p>
              Roll until all dice are the same. Click each die to freeze it at
              its current value between rolls.
            </p>
            <div className="box-buttons">
              {/* 8) тепер ми замість діва з кнопками використаємо масив dices, мапимося по ньому і повертаємо рандомну кнопку по number*/}
              {dices.map((dice) => {
                //9) (dice) відповідає за кожен окремий об'єкт
                return (
                  <button
                    className={dice.isLocked ? "dice locked" : "dice"}
                    key={dice.id}
                    onClick={() => onClickLockDice(dice.id)}
                  >
                    {dice.number}
                  </button>
                ); //отримаємо кнопки з рандомним числом і для класу locked ми пропишемо, що якщо фішка заблокована, то поверни клас  locked (зелену), інакше просто клас dice
              })}
            </div>
            <button className="roll-btn" onClick={isWin ? onClickNewGame : onClickRollDices}>
             {isWin ? "New Game" : "Roll"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
