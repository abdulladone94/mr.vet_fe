import Head from 'next/head';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import { Modal, Space, Typography } from 'antd';
import DateSearchFilters from '@/components/DateSearchFilter';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import api from '@/api';
import { ExclamationCircleFilled } from '@ant-design/icons';
import CaseReport from '@/components/Card/CasesReport';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [reports, setReports] = useState([]);
  const [searchReportsRes, setSearchReportsRes] = useState();
  const [loading, setLoading] = useState(true);
  const [searchDate, setSearchDate] = useState({});

  const isDateValid = !!searchDate.fromDate;
  console.log(searchDate);

  const pathName = usePathname();
  const { confirm } = Modal;

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

  const searchReports = async () => {
    if (!isDateValid) return;
    try {
      const response = await api.report.searchReports({
        ...searchDate,
        id: doctorId,
        pageNo: 1,
        noOfItem: 10,
      });
      setSearchReportsRes(response.data.results || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getReportsByDoctorId();
  }, []);

  useEffect(() => {
    searchReports();
    console.log(searchDate);
  }, [searchDate]);

  const showConfirm = (id) => {
    confirm({
      title: 'Do you want to delete this report?',
      icon: <ExclamationCircleFilled />,
      okText: 'Yes',
      cancelText: 'No',
      okButtonProps: {
        style: {
          backgroundColor: '#f7a360',
          color: 'white',
        },
      },
      onOk() {
        handleDelete(id);
      },
    });
  };

  const handleDelete = async (id) => {
    try {
      await api.report.deleteReport({ id: `${id}` });
      getReportsByDoctorId();
    } catch (error) {
      console.log(error);
    }
  };

  const caseReportComponent = (data) => {
    const formatCreatedDate = data.created_at.split('T')[0];
    return (
      <CaseReport
        profileImage={data.inspection.pet.pet_image_url}
        createdDate={formatCreatedDate}
        name={data.inspection.pet.pet_name}
        dob={data.inspection.pet.dob}
        breed={data.inspection.pet.breed.breed_name}
        species={data.inspection.pet.species.species_name}
        gender={data.inspection.pet.gender}
        image={data.inspection.image_url}
        disease={data.inspection.disease.disease}
        heatMap={data.inspection.heat_map_url}
        healthStatus={data.inspection.health_status.health_status}
        score={data.inspection.domain_confident_score}
        username={data.inspection.user.username}
        email={data.inspection.user.email || '-'}
        button={() => showConfirm(data.id)}
      />
    );
  };

  return (
    <>
      <Head>
        <title>Cases</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <DateSearchFilters
          placeholder="Search cases"
          setSearchDate={setSearchDate}
        />

        {/* <div className="grid grid-cols-3 gap-4">
          {reports?.map(
            (data) => (
              // data === null ? (
              //   <h1>There is no cases available for this doctor</h1>
              // ) : (
              <div className="w-[340px] h-[400px]  rounded-md">
                <CaseCard
                  button={() => showConfirm(data.id)}
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
              </div>
            )
            // )
          )}
          <CaseReport />
        </div> */}
        <div className="grid w-full grid-cols-3 gap-8">
          {isDateValid
            ? searchReportsRes?.map(caseReportComponent)
            : reports?.map(caseReportComponent)}
        </div>
      </main>
    </>
  );
}
