import api from '@/api';

const {
  useContext,
  useState,
  useMemo,
  useEffect,
  createContext,
} = require('react');

const DoctorContext = createContext();

export const DoctorProvider = ({ children }) => {
  const [searchValue, setSearchValue] = useState('');

  const value = { searchValue, setSearchValue };

  return (
    <DoctorContext.Provider value={value}>{children}</DoctorContext.Provider>
  );
};

export const useDoctors = () => {
  return useContext(DoctorContext);
};
