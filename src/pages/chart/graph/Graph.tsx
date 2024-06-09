import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  PointElement,
  ChartOptions,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import useGraph from '../../../hooks/useApi/useGraph';
import { DocumentData } from 'firebase/firestore';
import { useEffect } from 'react';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  PointElement
);

// calculate length
const calculate = (rank: DocumentData) => {
  const arr = Array(10).fill(0);

  Object.values(rank).forEach((score) => {
    const idx = Math.min(Math.floor(score / 10), 9);
    arr[idx]++;
  });

  return arr;
};

// Bar data
const data = (rank: DocumentData) => {
  return {
    labels: Array.from(
      { length: 10 },
      (_, idx) => `${idx === 0 ? 0 : idx * 10 + 1} ~ ${idx * 10 + 10}점`
    ),
    datasets: [
      {
        label: '인원수',
        data: calculate(rank),
        borderColor: 'black',
        hoverBackgroundColor: '#495E57',
        backgroundColor: '#94a9a2',
      },
    ],
  };
};

/** 24/06/08 - graph page */
export default function Graph({ stack }: { stack: string }) {
  const { data: rank, isLoading, refetch } = useGraph(stack);

  useEffect(() => {
    if (stack) refetch();
  }, [stack]);

  if (isLoading) return <div>데이터를 불러오고 있습니다.</div>;
  if (!rank) return <div>데이터가 존재하지 않습니다.</div>;

  return (
    <div className='flex items-center w-full h-full p-5'>
      <Bar datasetIdKey='id' data={data(rank)} />
    </div>
  );
}
