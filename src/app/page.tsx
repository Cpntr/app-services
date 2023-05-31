"use client"

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDatabase, faSpinner, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Footer } from '@/components/Footer';
import { Table } from '@/components/Table';

interface RawData {
  ConsumedQuantity: string;
  Cost: string;
  Date: string;
  InstanceId: string;
  MeterCategory: string;
  ResourceGroup: string;
  ResourceLocation: string;
  Tags: {
    'app-name': string;
    environment: string;
    'business-unit': string;
  };
  UnitOfMeasure: string;
  Location: string;
  ServiceName: string;
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [rawData, setRawData] = useState<RawData[]>([]);
  const [searchQuery, setSearchQuery] = useState('Macao');
  const [filterCategory, setFilterCategory] = useState('Logic Apps');
  const [resourceCategories, setResourceCategories] = useState<string[]>([]);

  useEffect(() => {
    fetchResourceCategories();
  }, []);

  const fetchResourceCategories = async () => {
    try {
      const response = await fetch(
        'https://engineering-task.elancoapps.com/api/resources/'
      );
      const data = await response.json();
      setResourceCategories(data);
    } catch (error) {
      console.error('Error fetching resource categories:', error);
    }
  };

  useEffect(() => {
    if (searchQuery == '' && filterCategory !== '') {
      fetchByCatData();
    } else if (searchQuery !== '' && filterCategory == '') {
      setTimeout(() => {
        fetchByNameData();
      }, 1000)
    } else if (searchQuery !== '' && filterCategory !== '') {
      fetchByCatData();
    }
    else {
      setRawData([]);
    }
  }, [searchQuery, filterCategory]);

  const fetchByCatData = async () => {
    try {
      const response = await fetch(
        `https://engineering-task.elancoapps.com/api/resources/${filterCategory}`
      );
      const data = await response.json();
      setRawData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchByNameData = async () => {
    try {
      const response = await fetch(
        `https://engineering-task.elancoapps.com/api/applications/${searchQuery}`
      );
      const data = await response.json();
      setRawData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterCategory(event.target.value);
  };

  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl md:text-4xl uppercase">Filter data of App services</h1>
        <Link
          className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
          href="/rawdata"
        >
          <FontAwesomeIcon icon={faDatabase} />
        </Link>
      </header>

      <main className="min-h-screen">
        <div className="bg-white shadow-lg rounded-md p-4 mb-4 text-gray-800">
          <div className='flex flex-col md:flex-row justify-between items-center mb-4'>
            <div className="flex items-center">
              <label htmlFor="searchInput" className="mr-2">
                Search by Name:
              </label>
              <div className="flex relative">
                <input
                  type="text"
                  id="searchInput"
                  value={searchQuery}
                  onChange={handleSearch}
                  className="border border-gray-300 rounded px-2 py-1"
                />
                <FontAwesomeIcon icon={faSearch} className="absolute right-0 top-0 mt-2 mr-2 text-gray-500" />
              </div>
            </div>

            <div className="flex items-center">
              <label htmlFor="categorySelect" className="mr-2">
                Filter by Category:
              </label>
              <select
                id="categorySelect"
                value={filterCategory}
                onChange={handleFilter}
                className="border border-gray-300 rounded px-2 py-1 w-full md:w-auto"
              >
                <option value=""></option>
                {resourceCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center sm:h-auto">
              <FontAwesomeIcon icon={faSpinner} className="animate-spin text-3xl" />
            </div>
          ) : (

            <div className="overflow-x-auto">

              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-center">App Name</th>
                    <th className="text-center">Consumed Quantity</th>
                    <th className="text-center">Meter Category</th>
                    <th className="text-center">Resource Location</th>
                    <th className="text-center">Environment</th>
                    <th className="text-center">Business Unit</th>
                    <th className="text-center">Resource Group</th>
                    <th className="text-center">Unit Of Measure</th>
                    <th className="text-center">ServiceName</th>
                    <th className="text-center">Location</th>
                    <th className="text-center">Date</th>
                    <th className="text-center">Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {rawData.map((data, index) => (
                    <tr
                      key={data.InstanceId + index}
                      className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
                    >
                      <Table data={data} />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
