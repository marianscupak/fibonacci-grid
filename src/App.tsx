import './App.css';
import { Grid } from './components/Grid.tsx';

const GRID_WIDTH = 50;
const GRID_HEIGHT = 50;

function App() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Grid width={GRID_WIDTH} height={GRID_HEIGHT} />
    </div>
  );
}

export default App;
