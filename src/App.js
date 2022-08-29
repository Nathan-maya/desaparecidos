import './App.css';
import Header from './components/Header/Header';
import Highlights from './components/Highlights/Highlights';
import News from './components/News/News';
import Slider from './components/Slider/Slider';

function App() {
  return (
    <>
      <Header />
      <Slider />
      <News/>
      <Highlights/>
    </>
  );
}

export default App;
