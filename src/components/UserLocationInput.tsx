/// <reference types="vite-plugin-svgr/client" />
import AsciiArt from './AsciiArt';
import PlacesAutoComplete from './PlacesAutoComplete';
import { CardContent, CardFooter, CardHeader } from '@/components/ui/card.tsx';
import classicBoom from '../assets/images/booms/classic_boom.jpg';
import GlobeSVG from '../assets/images/globe.svg?react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { APIProvider } from '@vis.gl/react-google-maps';

interface Props {
  setCity: (city: string) => void;
}

function UserLocationInput({ setCity }: Props) {
  const navigate = useNavigate();
  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>(null);

  useEffect(() => {
    if (selectedPlace && selectedPlace.geometry && selectedPlace.name) {
      const { geometry } = selectedPlace;
      const city = selectedPlace.name;
      const lat = geometry.location?.lat();
      const lng = geometry.location?.lng();

      if (lat && lng) {
        setCity(city);
        navigate(`/location/${lat}/${lng}`);
      }
    }
  }, [selectedPlace, navigate, setCity]);
  return (
    <>
      <CardHeader
        id='title'
        className='flex justify-start p1-4 font-bold 
      text-2xl tracking-tighter mr-12 absolute top-[-5px]'
      >
        DANGOL&apos;WEATHER
      </CardHeader>
      <CardContent className='flex flex-col items-center justify-center min-h-[40%] sm:scale-100 scale-105'>
        <div className='flex flex-row justify-center'>
          <div className='w-[var(--g1-size)] h-[var(--g1-size)]'>
            <GlobeSVG
              height={'100%'}
              width={'100%'}
              className='animate-spin-slow'
            />
          </div>
          <div className='w-[var(--g2-size)] h-[var(--g2-size)]'>
            <GlobeSVG
              height={'100%'}
              width={'100%'}
              className='animate-spin-slower animate-reverse-spin'
            />
          </div>
        </div>
        <form className='flex flex-col items-center space-y-2 mt-4'>
          <APIProvider
            apiKey={import.meta.env.VITE_GMAPS_API_KEY}
            solutionChannel='GMP_devsite_samples_v3_rgmautocomplete'
          >
            <PlacesAutoComplete onPlaceSelect={setSelectedPlace} />
          </APIProvider>
        </form>
      </CardContent>
      <CardFooter>
        <AsciiArt src={classicBoom} height={256} width={256} fontSize={0.5} />
      </CardFooter>
    </>
  );
}

export default UserLocationInput;
