import { useCallback, useEffect, useState } from 'react';
// import colors from './colors/random_color_array';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
function getDarkColor() {
  var letters = '0123456789ABCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.round(Math.random() * 15)];
  }
  return color;
}

const getQuotes = async () => {
  const quotesURL =
    'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';
  try {
    const response = await fetch(quotesURL);
    const data = await response.json();
    return data.quotes;
  } catch (err) {
    console.log(err);
    return err;
  }
};

function App() {
  const [quotes, setQuotes] = useState(null);
  const [currentQuote, setCurrentQuote] = useState(null);
  const [currentColor, setCurrentColor] = useState(null);

  const getRandomQuote = useCallback(() => {
    const randomIndex = getRandomInt(0, quotes.length);
    setCurrentQuote(quotes[randomIndex]);
  }, [quotes]);

  const getRandomColor = () => {
    const color = getDarkColor();
    setCurrentColor(color);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getQuotes();
      setQuotes(data);
    };
    if (!quotes) fetchData();
    else {
      getRandomQuote();
      getRandomColor();
    }
  }, [quotes, getRandomQuote]);

  const getNewQuote = () => {
    getRandomQuote();
    getRandomColor();
  };

  return (
    <div
      className='container-fluid'
      style={{
        background: currentColor,
        transition: 'background 400ms linear',
      }}
    >
      <div className='row align-items-center justify-content-center min-vh-100'>
        <div
          id='quote-box'
          className='col p-4 border rounded'
          style={{
            maxWidth: '540px',
            background: '#eee',
            color: currentColor,
          }}
        >
          {currentQuote ? (
            <>
              <p id='text' className='fs-3 text-center'>
                <FontAwesomeIcon
                  icon={faQuoteLeft}
                  style={{ marginRight: '8px' }}
                />
                {currentQuote.quote}
              </p>
              <p id='author' className='text-end'>
                - {currentQuote.author}
              </p>
            </>
          ) : (
            <p>Loading...</p>
          )}
          <div className='d-flex justify-content-between'>
            <a
              href={`https://twitter.com/intent/tweet/?text=${currentQuote?.quote} -${currentQuote?.author}`}
              id='tweet-quote'
              target='_blank'
              rel='noreferrer noopener'
              className='btn'
              style={{
                background: currentColor,
                color: 'white',
                transition: 'background 400ms linear',
              }}
            >
              <FontAwesomeIcon icon={faTwitter} size='lg' />
            </a>
            <button
              type='button'
              id='new-quote'
              className='btn'
              onClick={getNewQuote}
              style={{
                background: currentColor,
                color: 'white',
                transition: 'background 400ms linear',
              }}
            >
              New quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
