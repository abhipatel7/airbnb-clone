import { FC, useState } from 'react';
import Image from 'next/image';
import {
  GlobeAltIcon,
  MenuIcon,
  SearchIcon,
  UserCircleIcon,
  UsersIcon,
} from '@heroicons/react/solid';
import { DateRangePicker, RangeKeyDict } from 'react-date-range';
import { useRouter } from 'next/router';
import { ParsedUrlQueryInput } from 'querystring';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

interface Props {
  placeholder?: string;
}

const Header: FC<Props> = ({ placeholder }) => {
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [numberOfGuests, setNumberOfGuests] = useState(1);

  const onDateChange = (rangesByKey: RangeKeyDict) => {
    setStartDate(rangesByKey.selection.startDate);
    setEndDate(rangesByKey.selection.endDate);
  };

  const selectionRange = {
    startDate,
    endDate,
    key: 'selection',
  };

  const onLogoClick = () => router.push('/');

  const onCancel = () => setSearchTerm('');

  const onSearch = () =>
    router.push({
      pathname: '/search',
      query: {
        location: searchTerm,
        startDate: startDate?.toISOString(),
        endDate: endDate?.toISOString(),
        numberOfGuests,
      } as ParsedUrlQueryInput,
    });

  return (
    <header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md p-5 md:px-10">
      <div
        onClick={onLogoClick}
        className="relative flex items-center h-10 cursor-pointer my-auto"
      >
        <Image
          src="/airbnb-logo.svg"
          alt="airbnb-logo"
          objectFit="contain"
          objectPosition="left"
          layout="fill"
        />
      </div>

      <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-sm">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-5 bg-transparent outline-none flex-grow text-sm text-gray-600 placeholder-gray-400"
          type="text"
          placeholder={placeholder || 'Start your search'}
        />
        <SearchIcon className="hidden md:inline-flex h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer md:mx-2" />
      </div>

      <div className="flex space-x-4 items-center justify-end text-gray-500">
        <p className="hidden md:inline cursor-pointer">Become a host</p>
        <GlobeAltIcon className="hidden md:inline h-6 cursor-pointer" />

        <div className="flex items-center space-x-2 border-2 p-2 rounded-full">
          <MenuIcon className="h-6" />
          <UserCircleIcon className="h-6" />
        </div>
      </div>

      {searchTerm && (
        <div className="flex flex-col col-span-3 mx-auto">
          <DateRangePicker
            ranges={[selectionRange]}
            minDate={new Date()}
            rangeColors={['#FD5B61']}
            onChange={onDateChange}
          />

          <div className="flex items-center border-b mb-4">
            <h2 className="text-2xl flex-grow font-semibold">
              Number of Guests
            </h2>
            <UsersIcon className="h-5" />
            <input
              value={numberOfGuests}
              onChange={(e) => setNumberOfGuests(+e.target.value)}
              min={1}
              type="number"
              className="w-12 p-2 text-lg outline-none text-red-400"
            />
          </div>
          <div className="flex">
            <button onClick={onCancel} className="flex-grow text-gray-500">
              Cancel
            </button>
            <button onClick={onSearch} className="flex-grow text-red-400">
              Search
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
