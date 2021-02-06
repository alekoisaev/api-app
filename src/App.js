import React, {useState, useEffect} from 'react';

function App() {

  const [gameStart, setGameStart] = useState(false);
  const [result, setResult] = useState([]);
  const [currIndex, setCurrIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [diff, setDiff] = useState('')
  const [category, setCategory] = useState(0)


  let url = `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${diff}&type=multiple`;

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setResult(data.results);
        console.log(url)
      });
  }, [url]);



  const handleDiff = (prop) => {
    let slct = document.getElementById('category1').value;
    setCategory(slct);
    console.log(slct, category)
    setDiff(prop);
    setGameStart(true);
  }
  
  const handleAnswer = (answer) => {
    setCurrIndex(currIndex + 1);

    if (answer === result[currIndex].correct_answer) {
      setScore(score + 1);
    }
  }

  const handleRestart = () => {
    setCurrIndex(0);
    setScore(0);
    setDiff('');
    setGameStart(false);
  }


  return (!gameStart) ? (
    <div className="mx-auto w-75 m-5 p-5 text-center bg-primary text-white rounded">
      <h2>Choose Difficulty and Category: </h2>
      <div>
      <select class="form-control" id="category1" name="categorylist">
        <option value="18">Computer Science</option>
        <option value="9">General Knowledge</option>
        <option value="21">Sport</option>
        <option value="23">History</option>
      </select>
      </div>
      <button
        className="btn btn-success m-2"
        onClick={() => handleDiff('easy')}>
        Easy
        </button>

      <button
        className="btn btn-warning m-2"
        onClick={() => handleDiff('medium')}>
        Medium
        </button>

      <button
        className="btn btn-danger m-2"
        onClick={() => handleDiff('hard')}>
        Hard
        </button>
    </div>
  ) : currIndex >= result.length ? (
    <div className="mx-auto w-75 m-5 p-5 text-center bg-primary text-white rounded">
      <h2>Your score was: {score}/10</h2>
      <button className="btn btn-success m-3 p-3" onClick={handleRestart}>Restart</button>
    </div>
  ) : result.length > 0 ? (
    <div className="mx-auto w-75 m-5 p-5 text-center bg-primary text-white rounded">
      <div>
        <p>Question - {currIndex + 1}/10</p>
        <h2 className="m-3" dangerouslySetInnerHTML={{__html: result[currIndex].question}}></h2>
      </div>
      <div>
        <button className="btn btn-info m-2" onClick={() => (handleAnswer(result[currIndex].correct_answer))}>{result[currIndex].correct_answer}</button>
        <button className="btn btn-info m-2" onClick={() => (handleAnswer(result[currIndex].incorrect_answers[0]))}>{result[currIndex].incorrect_answers[0]}</button>
        <button className="btn btn-info m-2" onClick={() => (handleAnswer(result[currIndex].incorrect_answers[1]))}>{result[currIndex].incorrect_answers[1]}</button>
        <button className="btn btn-info m-2" onClick={() => (handleAnswer(result[currIndex].incorrect_answers[2]))}>{result[currIndex].incorrect_answers[2]}</button>
      </div>
    </div>
  ) : (
    <h2>Loading...</h2>
  )
}

export default App;
