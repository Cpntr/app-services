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
    'app-name'?: string;
    environment?: string;
    'business-unit'?: string;
  };
  UnitOfMeasure: string;
  Location: string;
  ServiceName: string;
}

export const Table: React.FC<{ data: RawData }> = ({ data }) => {
  const appName = data.Tags && data.Tags['app-name'] ? data.Tags['app-name'] : '';
  const appEnvironment = data.Tags && data.Tags.environment ? data.Tags.environment : '';
  const appBusinessUnit = data.Tags && data.Tags['business-unit'] ? data.Tags['business-unit'] : '';



  return (
    <>
      <td className="text-center p-4">{appName}</td>

      <td className="text-center p-4">{data.ConsumedQuantity}</td>

      <td className="text-center p-4">{data.MeterCategory}</td>

      <td className="text-center p-4">{data.ResourceLocation}</td>


      <td className="text-center p-4">{appEnvironment}</td>

      <td className="text-center p-4">{appBusinessUnit}</td>

      <td className="text-center p-4">{data.ResourceGroup}</td>

      <td className="text-center p-4">{data.UnitOfMeasure}</td>

      <td className="text-center p-4">{data.ServiceName}</td>

      <td className="text-center p-4">{data.Location}</td>

      <td className="text-center p-4">{data.Date}</td>
      <td className="text-center p-4">{data.Cost}</td>
    </>

  );
};
