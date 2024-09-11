import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import WeatherDisplayMain from './components/WeatherDisplayMain.tsx';
import UserLocationInput from './components/UserLocationInput.tsx';
import { Card } from '@/components/ui/card.tsx';
import { ModeToggle } from './components/ui/mode-toggle.tsx';

function App() {
  // const [location, setLocation] = useState(null);
  const [city, setCity] = useState<string>('');
  // if screen < 450 px, set width and height to 95%
  return (
    <>
      <Card
        className='relative min-w-[95vw] sm:min-w-[306px] min-h-[95vh] sm:min-h-[528px] flex 
      flex-col items-center justify-around gap-[0vh] sm:gap-[0] pt-20'
      >
        <ModeToggle />
        <Routes>
          <Route path={'/'} element={<UserLocationInput setCity={setCity} />} />
          <Route
            path={'/location/:lat/:long'}
            element={<WeatherDisplayMain city={city} />}
          />
          {/* <Route path={'/location/:lat/:long'} element={<DropdownDisplay />} /> */}
          {/*  <Route path={'/'} element={<DropdownDisplay />} /> */}
        </Routes>
        {/* <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>*/}
      </Card>
    </>
  );
}

export default App;
