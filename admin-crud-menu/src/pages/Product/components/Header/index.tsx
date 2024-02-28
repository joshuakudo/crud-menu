import React, { useState } from 'react'
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import SelectOption from '../../../../components/SelectOption';
import { useDebounceEffect, useUpdateEffect } from '../../../../hooks';
import { Combobox } from '@headlessui/react';
import { ISelectOption } from '../../../../interface/common';

interface IProps extends JSX.IntrinsicAttributes {
  setSearch: React.Dispatch<React.SetStateAction<string>>
  handleSearch?: () => void
  filterBy?: ISelectOption[]
  setFilterBy: React.Dispatch<React.SetStateAction<ISelectOption>>
  selectedFilter?: ISelectOption
  setSelectedSubFilter?: React.Dispatch<React.SetStateAction<ISelectOption>>
  callback?: (inputValue: string, page: number, prevOptions: ISelectOption[]) => Promise<ISelectOption[]>;
  isLastPage?: boolean;
  setStartDate?: React.Dispatch<React.SetStateAction<Date | ''>>
  setEndDate?: React.Dispatch<React.SetStateAction<Date | ''>>
  className?: string
  search: string
}

const Header: React.FC<IProps> = ({ search, className, isLastPage, callback, setSearch, handleSearch, filterBy, selectedFilter, setFilterBy, setSelectedSubFilter, setStartDate, setEndDate }) => {
  const [hideSubFilter, setHideSubFilter] = useState<boolean>(false);

  const handleOnChage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    setSearch(newVal);
  };

  useDebounceEffect(() => {
    if (search !== '') {
      handleSearch!()
    }
  }, [search]);


  return (
    <div>
      <div className="relative m-8 rounded-lg bg-white pt-5 pb-12 shadow sm:px-6 sm:pt-6">
        <div className="flex relative mb-1 mt-5 ">
          <div className="relative inline-block rounded-md shadow-sm lg:w-72 w-full">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon className="h-8 w-8 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              name="search"
              id="search"
              value={search}
              onChange={handleOnChage}
              className="block w-full h-14 border-2 rounded-md border-gray-300 pl-12 focus:border-custom-yellow-900 focus:ring-custom-yellow-900 text-lg"
              placeholder="Search"
            />
            {search && (
              <button className="absolute inset-y-0 right-0 flex items-center pr-3" onClick={() => setSearch('')}>
                <XMarkIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
              </button>
            )}
          </div>

          <div className="flex items-center flex-col h-16 ml-10 lg:my-0 md:flex-row">
            <div className="flex items-center h-16 w-full md:w-fit">
              <p className="md:mt-0 lg:ml-10 text-gray-500 text-lg pr-2">Filter By:</p>
            </div>
            <SelectOption
              options={filterBy!}
            />
          </div>

          <div>
          <button
            type="submit"
            className="ml-10 w-full bg-emerald-900 hover:bg-emerald-950 text-white border-transparent cursor-pointer py-3 h-14 mt-1 px-10 border rounded-md shadow-sm disabled:opacity-40 text-lg"
            onClick={handleSearch}
          >
            <span className="text-custom-white-900">Search</span>
          </button>
          </div>
 
        </div>
      </div>
      </div>
      )
}

      export default Header