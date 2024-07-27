import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import authContext from '../context/auth/authContext';
import img1 from '../assets/images/15.jpg';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Services = () => {
  const { isLogin, checkLogin } = useContext(authContext);

  useEffect(() => {
    checkLogin();
  }, [isLogin]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [loanAmount, setLoanAmount] = useState(5000000);
  const [interestRate, setInterestRate] = useState(7.5);
  const [tenure, setTenure] = useState(20);
  const [processingFeePercentage, setProcessingFeePercentage] = useState(5);
  const [emi, setEmi] = useState(null);
  const [processingFee, setProcessingFee] = useState(null);
  const [totalInterest, setTotalInterest] = useState(null);

  const calculateEMI = () => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / (12 * 100);
    const time = parseFloat(tenure) * 12;
    const processingFee = (principal * parseFloat(processingFeePercentage)) / 100;
    setProcessingFee(processingFee.toFixed(2));
    const emiCalc = (principal * rate * Math.pow(1 + rate, time)) / (Math.pow(1 + rate, time) - 1);
    setEmi(emiCalc.toFixed(2));
    const totalInterest = (emiCalc * time) - principal;
    setTotalInterest(totalInterest.toFixed(2));
  };

  const chartData = {
    labels: ['Loan Amount', 'Total Interest', 'Processing Fee'],
    datasets: [
      {
        label: 'Amount in ₹',
        data: [loanAmount, totalInterest, processingFee],
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Loan Breakdown',
      },
    },
  };

  return (
    <div className="relative bg-cover bg-center min-h-screen flex flex-col items-center justify-center p-4 pt-24 text-white" style={{ backgroundImage: `url(${img1})` }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      
      <motion.h1 
        className="relative text-4xl md:text-6xl font-bold mb-6 text-center z-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Our Services
      </motion.h1>
      
      <div className="relative bg-white p-6 rounded-lg shadow-lg mb-6 text-lg w-full max-w-6xl mx-auto z-10">
        <motion.h2 
          className="text-2xl font-bold mb-4 text-blue-700"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          EMI Calculator
        </motion.h2>
        
        <div className="space-y-4">
          <motion.div 
            className="flex flex-col"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <label className="text-gray-700 mb-1">Loan Amount (₹)</label>
            <input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              placeholder="Enter Loan Amount"
              className="border p-2 rounded"
            />
          </motion.div>
          <motion.div 
            className="flex flex-col"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <label className="text-gray-700 mb-1">Annual Interest Rate (%)</label>
            <input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              placeholder="Enter Interest Rate"
              className="border p-2 rounded"
            />
          </motion.div>
          <motion.div 
            className="flex flex-col"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <label className="text-gray-700 mb-1">Loan Tenure (Years)</label>
            <input
              type="number"
              value={tenure}
              onChange={(e) => setTenure(e.target.value)}
              placeholder="Enter Loan Tenure"
              className="border p-2 rounded"
            />
          </motion.div>
          <motion.div 
            className="flex flex-col"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <label className="text-gray-700 mb-1">Processing Fee (%)</label>
            <input
              type="number"
              value={processingFeePercentage}
              onChange={(e) => setProcessingFeePercentage(e.target.value)}
              placeholder="Enter Processing Fee Percentage"
              className="border p-2 rounded"
            />
          </motion.div>
          <motion.button
            onClick={calculateEMI}
            className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition duration-300 w-full text-center"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
          >
            Calculate EMI
          </motion.button>
        </div>
        {emi !== null && (
          <motion.div 
            className="mt-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h3 className="text-xl font-semibold text-green-700">Monthly EMI: ₹{emi}</h3>
            <h3 className="text-xl font-semibold text-green-700">Processing Fee: ₹{processingFee}</h3>
          </motion.div>
        )}
      </div>

      {emi !== null && (
        <div className="relative bg-white p-6 rounded-lg shadow-lg mb-6 text-lg w-full max-w-6xl mx-auto z-10">
          <motion.h2 
            className="text-2xl font-semibold mb-4 text-blue-700"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Loan Breakdown
          </motion.h2>
          <div className="w-full h-64 md:h-96"> {/* Fixed height for the chart */}
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>
      )}

      <div className="relative bg-[#e6e6e6] p-6 rounded-lg shadow-lg text-lg max-w-6xl mx-auto z-10">
        <motion.h2 
          className="text-2xl font-semibold mb-4 text-blue-700"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Home Loan Services
        </motion.h2>
        <motion.p 
          className="text-gray-700 mb-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          We offer a variety of home loan services to meet your needs. Whether you’re looking to buy a new home, refinance an existing loan, or consolidate debt, we have solutions tailored for you.
        </motion.p>
        <motion.ul 
          className="list-disc list-inside text-gray-700"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <li>Competitive Interest Rates</li>
          <li>Flexible Tenure Options</li>
          <li>Quick Approval Process</li>
          <li>Customer Support Throughout the Process</li>
        </motion.ul>
      </div>
    </div>
  );
};

export default Services;
