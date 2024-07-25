import React, { useState } from 'react';

const Services = () => {
  const [principal, setPrincipal] = useState(0);
  const [rate, setRate] = useState(0);
  const [time, setTime] = useState(0);
  const [emi, setEmi] = useState(0);

  const calculateEMI = () => {
    const r = rate / (12 * 100); // monthly interest rate
    const t = time * 12; // number of months
    const emiCalc = (principal * r * Math.pow(1 + r, t)) / (Math.pow(1 + r, t) - 1);
    setEmi(emiCalc.toFixed(2));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Services</h1>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">EMI Calculator</h2>
        <div className="space-y-2">
          <input
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            placeholder="Principal Amount"
            className="border p-2 rounded"
          />
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            placeholder="Annual Interest Rate (%)"
            className="border p-2 rounded"
          />
          <input
            type="number"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            placeholder="Loan Tenure (Years)"
            className="border p-2 rounded"
          />
          <button onClick={calculateEMI} className="bg-blue-500 text-white p-2 rounded">
            Calculate EMI
          </button>
        </div>
        <div className="mt-4">
          <h3 className="text-lg">Monthly EMI: ${emi}</h3>
        </div>
      </div>
    </div>
  );
};

export default Services;
