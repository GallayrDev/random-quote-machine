import { useEffect, useState, useRef } from 'react';

function App() {
  const [quotes, setQuotes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const boxRef = useRef(null);

  useEffect(() => {
    fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.quotes && data.quotes.length > 0) {
          setQuotes(data.quotes);
          setCurrentIndex(Math.floor(Math.random() * data.quotes.length));
          console.log("Quotes is: " + quotes);
        } else {
           setQuotes([
          {
            quote: "Life isn’t about getting and having, it’s about giving and being.",
            author: "Kevin Kruse"
          }
        ]);
        setCurrentIndex(0);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Fetch error:', err);
        setError('Failed to load news.');
        setQuotes([
          {
            quote: "Life isn’t about getting and having, it’s about giving and being.",
            author: "Kevin Kruse"
          }
        ]);
        setCurrentIndex(0);
        setLoading(false);
      });
  }, []);

  const handleNewQuote = () => {
    // Change to the next quote
    setCurrentIndex((prev) => (prev + 1) % quotes.length);

    // Generate random colors
    const color1 = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    const color2 = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');

    // Change background and text color
    if (boxRef.current) {
      //boxRef.current.style.color = color2;
    }
document.body.style.transition = 'background-color 2s';
document.body.style.backgroundColor = color1;
  };

  const currentQuote = quotes[currentIndex];
  console.log('curent is '+JSON.stringify(currentQuote))
if (loading) return <p className='shadow-lg p-3 mb-5 rounded position-absolute top-50 start-50 translate-middle'>Loading...</p>;
  return (
    <div
      ref={boxRef}
      id="quote-box"
      className="card container shadow-lg p-3 mb-5 rounded position-absolute top-50 start-50 translate-middle"
      style={{ width: '26rem', backgroundColor: '#f8f9fa', color: '#000' }}
    >
      <div className="card-body">
        <figure>
          <blockquote className="blockquote">
            <p id="text">
              <i className="fa fa-quote-left me-2"></i>
              {currentQuote.quote}
              <i className="fa fa-quote-right ms-2"></i>
            </p>
          </blockquote>
          <figcaption id="author" className="blockquote-footer mb-5 text-end">
            {currentQuote.author || "Unknown Author"}
          </figcaption>
        </figure>

        <div className="d-flex position-relative">
          <a
            id="tweet-quote"
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(currentQuote.quote + ' — ' + currentQuote.author)}`}
            target='_blank'
            className="btn btn-primary position-absolute mt-3 bottom-0 start-0"
          >
            <i className="fa fa-twitter"></i>
          </a>
          <button
            id="new-quote"
            onClick={handleNewQuote}
            className="btn btn-primary position-absolute bottom-0 end-0"
          >
            New Quote
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
