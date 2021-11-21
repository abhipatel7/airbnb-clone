import { format } from 'date-fns';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { ParsedUrlQueryInput } from 'querystring';

import Footer from '../components/Footer';
import Header from '../components/Header';
import InfoCard from '../components/InfoCard';
import { ISearchResult } from '../interfaces';

interface Props {
  searchResults: ISearchResult[];
}

const filterOptions = [
  'Cancellation Flexibility',
  'Type of Place',
  'Price',
  'Rooms and Beds',
  'More Filters',
];

const Search: NextPage<Props> = ({ searchResults }) => {
  const router = useRouter();

  const { location, startDate, endDate, numberOfGuests }: ParsedUrlQueryInput =
    router.query;

  const formattedStartDate =
    startDate && format(new Date(startDate.toString()), 'dd MMMM yy');

  const formattedEndDate =
    endDate && format(new Date(endDate.toString()), 'dd MMMM yy');

  const range = `${formattedStartDate} - ${formattedEndDate}`;

  return (
    <div>
      <Header
        placeholder={`${location} | ${range} | ${numberOfGuests}  ${
          numberOfGuests && +numberOfGuests > 1 ? 'guests' : 'guest'
        }`}
      />

      <main className="flex ">
        <section className="flex flex-col flex-grow pt-14 px-6">
          <p className="text-xs">
            300+ Stays - {range} - for {numberOfGuests} number of{' '}
            {numberOfGuests && +numberOfGuests > 1 ? 'guests' : 'guest'}
          </p>

          <h1 className="text-3xl font-semibold mt-2 mb-6">
            Stays in {location}
          </h1>

          <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
            {filterOptions.map((option) => (
              <p className="button" key={option}>
                {option}
              </p>
            ))}
          </div>

          {searchResults?.map((result: ISearchResult) => (
            <InfoCard key={result.title} result={result} />
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Search;

export const getServerSideProps = async () => {
  const searchResults = await fetch('https://jsonkeeper.com/b/5NPS').then(
    (res) => res.json()
  );

  return {
    props: {
      searchResults,
    },
  };
};
