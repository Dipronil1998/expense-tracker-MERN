import React,{useEffect} from 'react';
import '../assets/css/UnderConstructionMessage.css';
import { useAppContext } from '../context/appContext';

const UnderConstructionMessage = () => {
  const {updateAmountToZero,alertType,alertText} = useAppContext();

  useEffect(()=>{
    updateAmountToZero();
    console.log(alertType,alertText,"alertType");
  },[])

  return (
    <div className="under-construction-container">
      <h1>Site Under Construction</h1>
      <p>We are working on something awesome. Please check back later!</p>
    </div>
  );
};

export default UnderConstructionMessage;