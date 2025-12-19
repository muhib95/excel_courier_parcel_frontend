import React from 'react';

const Card = ({ title, value, bg }) => {
    return (
         <div className={`rounded-2xl shadow p-6 ${bg}`}>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-3xl font-bold">{value}</p>
    </div>
    );
};

export default Card;