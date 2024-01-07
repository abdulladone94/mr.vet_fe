import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
// import LoginPage from './auth/login';
import DoctorTable from '@/components/Table/DoctorTable';
import { Space, Typography } from 'antd';
import BreadCrumb from '@/components/BreadCrumb';
import CaseCard from '@/components/Card/CasesCard';
import DateSearchFilters from '@/components/DateSearchFilter';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import api from '@/api';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const pathName = usePathname();

  // const url = "/doctors/6";
  const doctorId = parseInt(pathName.split('/').pop());
  console.log(pathName);

  const getReportsByDoctorId = async () => {
    try {
      const response = await api.report.reportByDoctorId({
        id: doctorId,
        pageNo: '1',
        noOfItem: '10',
      });
      setReports(response.data.results || []);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getReportsByDoctorId();
  }, []);
  console.log(reports);
  // console.log(reports[0].inspection);
  // console.log(reports[0].inspection.pet.breed.breed_name);
  // console.log(reports[0].inspection.pet.dob);
  // console.log(reports[0].inspection.pet.pet_name);
  // console.log(reports[0].inspection.image_confident_score);
  // console.log(reports[0].inspection.heat_map_url);
  // console.log(reports[0].inspection.image_url);
  // console.log(reports[0].inspection.disease.disease);

  return (
    <>
      <Head>
        <title>Cases</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <DateSearchFilters placeholder="Search cases" />

        <div className="grid grid-cols-3 gap-4">
          {reports?.map((data) =>
            reports.length === 0 ? (
              <h1>There is no cases available for this doctor</h1>
            ) : (
              <CaseCard
                name={data.inspection.pet.pet_name}
                age={'Date of Birth: ' + data.inspection.pet.dob}
                breed="German Shepherd"
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj5DTy38Tn--8rMY2LI3rpzV0_nQI1iHuKdw&usqp=CAU"
                disease={
                  'Predicted Disease: ' + data.inspection.disease.disease
                }
                score={
                  'Predicted Score: ' + data.inspection.image_confident_score
                }
                heatMap="https://caninebodybalance.com.au/canine/media/pages/services/thermal-imaging/4a22a1e6f5-1664780008/dog-thermal-imaging.jpg"
              />
            )
          )}
        </div>
      </main>
    </>
  );
}
