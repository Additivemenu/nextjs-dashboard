'use client';     // - This is a Client Component, which means you can use event listeners and hooks.

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation'; // to access the query params in url
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string }) {
  // hooks ----------------------------------------------
  const searchParams = useSearchParams();     // get url query params as js obj in real-time
  const pathname = usePathname();     // get url path name in real-time
  const { replace } = useRouter();    // replace: replace the current url with the new url for navigation


  // handlers ----------------------------------------------
  // ! useDebouncedCallback to avoid calling the api on every key stroke
  //  only run the code after a specific time once the user has stopped typing (300ms).
  const handleSearch = useDebouncedCallback((term) => {
    console.log(term);

    const params = new URLSearchParams(searchParams); // node js obj to handle query params
    params.set('page', '1');    // when the user types a new search query, you want to reset the page number to 1.

    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }

    replace(`${pathname}?${params.toString()}`); // ! replace the url with the new query params, this will trigger navigation
  }, 300);


  // jsx ----------------------------------------------
  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>

      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get('query')?.toString()}
      />

      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
