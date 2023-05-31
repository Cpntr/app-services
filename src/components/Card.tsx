"use client"

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

export const Card: React.FC<{ data: RawData }> = ({ data }) => {
  return (
    <div className="bg-white shadow-lg rounded-md p-4 mb-4 text-gray-800">
      <h3 className="text-xl font-bold mb-2">{data.Tags['app-name']}</h3>
      <p className="text-gray-600">Consumed Quantity: <b>{data.ConsumedQuantity}</b></p>
      <p className="text-gray-600">Meter Category: <b>{data.MeterCategory}</b></p>
      <p className="text-gray-600">Resource Location: <b>{data.ResourceLocation}</b></p>
      <p className="text-gray-600">Environment: <b>{data.Tags.environment}</b></p>
      <p className="text-gray-600">Business Unit: <b>{data.Tags['business-unit']}</b></p>
      <p className="text-gray-600">Resource Group: <b>{data.ResourceGroup}</b></p>
      <p className="text-gray-600">Unit Of Measure: <b>{data.UnitOfMeasure}</b></p>
      <p className="text-gray-600">ServiceName: <b>{data.ServiceName}</b></p>
      <p className="text-gray-600">Location: <b>{data.Location}</b></p>
      <p className="text-gray-600">Date: <b>{data.Date}</b></p>
      <p className="text-gray-600">Cost: <b>{data.Cost}</b></p>
    </div>
  );
};
