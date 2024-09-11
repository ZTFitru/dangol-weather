// import { useState } from 'react';
import AsciiArt from './AsciiArt';
import GlobeSVG from '../assets/images/globe.svg?react';
import { useParams } from 'react-router-dom';

import { CardContent, CardFooter, CardHeader } from '@/components/ui/card';
//import { useState } from 'react';
import {
  weatherInfoObject,
  // weatherDataFormat,
  userSideWeatherInfo,
  weatherTranslateWeekly,
  determineBoomQuote,
  determineBoomImage,
} from '@/lib/utils';

import DropdownDisplay from './DropdownDisplay';
import { useEffect, useState } from 'react';

interface Props {
  city: string;
}

export type IDays = 0 | 1 | 2 | 3 | 4;

const WeatherDisplayMain = ({ city }: Props) => {
  const [weather5Day, set5Day] = useState<userSideWeatherInfo[] | []>([]);
  const [selectedDay, setSelectedDay] = useState<IDays>(0);
  const { lat, long } = useParams<{ lat: string; long: string }>();

  useEffect(() => {
    const get5Day = async () => {
      if (lat && long) {
        const latitude = parseFloat(lat);
        const longitude = parseFloat(long);

        try {
          const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude.toFixed(
            4
          )}&lon=${longitude.toFixed(4)}&units=imperial&appid=${
            import.meta.env.VITE_WEATHER_API_KEY
          }`;
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error('error retrieving weekly forcast');
          } else {
            const data: weatherInfoObject = await response.json();
            const weeklyForecast = weatherTranslateWeekly(data);
            set5Day(weeklyForecast);
          }
        } catch (err) {
          console.error(err);
        }
      }
    };
    void get5Day();
  }, [lat, long]);

  // const today = new Date();
  // const currentDay = today.toLocaleDateString();
  const currentWeather = weather5Day[selectedDay];
  const day = new Date(currentWeather?.date_text).toLocaleDateString();
  console.log(day);
  const boom = currentWeather ? determineBoomImage(currentWeather?.icon) : '';

  return (
    <>
      <CardHeader className='absolute top-0'>
        <DropdownDisplay
          weather5Day={weather5Day}
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
        />
      </CardHeader>
      <CardContent className='flex flex-col items-center justify-center min-h-[40%] sm:scale-100 scale-105'>
        <div className='flex flex-row justify-center my-4'>
          <GlobeSVG height={50} width={50} className='animate-spin-slow' />
          <GlobeSVG
            height={115}
            width={115}
            className='animate-spin-slower animate-reverse-spin'
          />
        </div>

        <div className='text-center'>
          <div className='text-lg font-bold'>{city}</div>
          <div>
            {currentWeather?.temp_min}°F -- {currentWeather?.temp_max}°F
            <div className='text-sm'>
              conditions:{' '}
              <span className='font-bold'>{currentWeather?.weather}</span>
            </div>
            <div className='italic text-sm'>{day}</div>
          </div>
        </div>
      </CardContent>
      <CardFooter className='flex art justify-center flex-col'>
        {boom && (
          <AsciiArt src={boom} height={256} width={256} fontSize={0.3} />
        )}
        <p className='quote text-right italic text-sm tracking-tighter text-wrap max-w-80 "'>
          &quot;{determineBoomQuote(currentWeather?.weather)}&quot; -Boomhauer
        </p>
      </CardFooter>
    </>
  );
};

export default WeatherDisplayMain;
