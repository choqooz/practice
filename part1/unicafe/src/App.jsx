import { useState } from 'react';

const Button = ({ handleClick, text, value }) => {
  return (
    <>
      <button onClick={handleClick}> {text} </button> {value} <br />
    </>
  );
};

const Statics = ({ total, value1, value2, value3 }) => {
  return (
    <>
      {total === 0 ? (
        <p>No feedback given</p>
      ) : (
        <>
          <h2>Statics</h2>
          <table>
            <tbody>
              <tr>
                <td>Good</td>
                <td>{value1}</td>
              </tr>

              <tr>
                <td>Neutral</td>
                <td>{value2}</td>
              </tr>

              <tr>
                <td>Bad</td>
                <td>{value3}</td>
              </tr>

              <tr>
                <td>Total</td>
                <td>{value1 + value2 + value3}</td>
              </tr>

              <tr>
                <td>Average</td>
                <td>{total / (value1 + value2 + value3)}</td>
              </tr>

              <tr>
                <td>Positive</td>
                <td>{(value1 / (value1 + value2 + value3)) * 100}</td>

                <td>%</td>
              </tr>
            </tbody>
          </table>
        </>
      )}
    </>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);

  const handleClickGood = () => {
    setGood(good + 1);
    setTotal(total + 1);
  };
  const handleClickNeutral = () => setNeutral(neutral + 1);
  const handleClickBad = () => {
    setBad(bad + 1);
    setTotal(total - 1);
  };

  return (
    <div>
      <Button handleClick={handleClickGood} text={'Good'} value={good} />
      <Button
        handleClick={handleClickNeutral}
        text={'Neutral'}
        value={neutral}
      />
      <Button handleClick={handleClickBad} text={'Bad'} value={bad} />
      <Statics total={total} value1={good} value2={neutral} value3={bad} />
    </div>
  );
};

export default App;
