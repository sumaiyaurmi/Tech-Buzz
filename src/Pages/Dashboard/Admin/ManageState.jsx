import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../UseHooks/useAxiosSecure";
import { PieChart, Pie, Legend, Tooltip, Cell } from "recharts";
import { FaCartPlus, FaUsers } from "react-icons/fa";
import { MdReviews } from "react-icons/md";

const ManageState = () => {
  const axiosSecure = useAxiosSecure();

  const { data: state = {} } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });

  console.log(state.users);

  const data = [
    { name: "Users", value: state.users },
    { name: "Products", value: state.products },
    { name: "Reviews", value: state.reviews },
  ];
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div>
      <div className="stats shadow">
        <div className="stat">
          <div className="stat-figure text-3xl text-primary">
            <FaUsers></FaUsers>
          </div>
          <div className="stat-title">Total Users</div>
          <div className="stat-value text-primary">{state.users}</div>
        </div>

        <div className="stat">
        <div className="stat-figure text-3xl text-primary">
            <FaCartPlus></FaCartPlus>
          </div>
          <div className="stat-title">Total Products</div>
          <div className="stat-value text-secondary">{state.products}</div>
        </div>

        <div className="stat">
        <div className="stat-figure text-3xl text-primary">
            <MdReviews></MdReviews>
          </div>
          <div className="stat-title">Total Reviews</div>
          <div className="stat-value text-primary">{state.reviews}</div>
        </div>
      </div>

      <div>
        <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend></Legend>
        </PieChart>
      </div>
    </div>
  );
};

export default ManageState;
