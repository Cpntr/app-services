"use client"

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Footer } from '@/components/Footer';
import { getRawData } from '@/app/rawdata/useServer';
import { Card } from '@/components/Card'

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

export default function RawDataPage() {
  const [loading, setLoading] = useState(true);
  const [rawData, setRawData] = useState<RawData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getRawData();
      const data = await response;
      setRawData(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl md:text-4xl uppercase">Raw data of App services</h1>
        <Link href="/" className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
          passHref>

          <FontAwesomeIcon icon={faHome} />

        </Link>
      </header>

      {loading ? (
        <div className="flex justify-center items-center sm:h-auto">
          <FontAwesomeIcon icon={faSpinner} className="animate-spin text-3xl" />
        </div>
      ) : (
        <main className="min-h-screen">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {rawData.map((data) => (
              <Card key={data.InstanceId} data={data} />
            ))}
          </div>
        </main>
      )}
      <Footer />
    </>
  );
};

