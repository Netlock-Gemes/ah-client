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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Services = () => {

  const { isLogin, checkLogin} =
    useContext(authContext);

  useEffect(() => {
    checkLogin();
  }, [isLogin]);

  const [loanAmount, setLoanAmount] = useState(5000000); // Default value: 5000000
  const [interestRate, setInterestRate] = useState(7.5); // Default value: 7.5
  const [tenure, setTenure] = useState(20); // Default value: 20
  const [processingFeePercentage, setProcessingFeePercentage] = useState(5); // Default value: 0.4
  const [emi, setEmi] = useState(null);
  const [processingFee, setProcessingFee] = useState(null);
  const [totalInterest, setTotalInterest] = useState(null);

  const calculateEMI = () => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / (12 * 100); // monthly interest rate
    const time = parseFloat(tenure) * 12; // number of months
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
    maintainAspectRatio: false, // Allows the chart to fill the container
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
    <div className="container mx-auto p-4 md:py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Our Services</h1>
      
      <div className="bg-[#e6e6e6] p-6 rounded-lg shadow-lg mb-6 text-lg">
        <motion.h2 
          className="text-2xl font-semibold mb-4 text-blue-700"
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
            className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition duration-300 md:block flex md:w-fit w-full text-center justify-center items-center"
            whileHover={{ scale: 1.05 }}
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
        <div className="bg-[#e6e6e6] p-6 rounded-lg shadow-lg mb-6 text-lg md:h-[26rem] h-[25rem] pb-11 md:pb-14"> {/* Ensure the container has a defined height */}
          <motion.h2 
            className="text-2xl font-semibold mb-4 text-blue-700"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Loan Breakdown
          </motion.h2>
          <div className="w-full h-full"> {/* Make sure the chart takes the full width and height of the container */}
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>
      )}

      <div className="bg-[#e6e6e6] p-6 rounded-lg shadow-lg text-lg">
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
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          We offer a range of home loan services to help you get the best deals on your home loans. Our expert consultants provide personalized assistance to ensure you find a loan that fits your needs and budget.
        </motion.p>
        <motion.ul 
          className="list-disc list-inside text-gray-700 space-y-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <li>Competitive interest rates</li>
          <li>Flexible repayment options</li>
          <li>Expert advice and support</li>
          <li>Quick and easy application process</li>
        </motion.ul>
      </div>
    </div>
  );
};

export default Services;
