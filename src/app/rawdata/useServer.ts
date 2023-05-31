
export const getRawData = async () => {
  const res = await fetch("https://engineering-task.elancoapps.com/api/raw");
  return res.json();
};
