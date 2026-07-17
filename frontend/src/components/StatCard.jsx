function StatCard({ title, value, color }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-5">
      <p className="text-gray-500">{title}</p>
      <h2 className={`text-3xl font-bold mt-2 ${color}`}>
        {value}
      </h2>
    </div>
  );
}

export default StatCard;
