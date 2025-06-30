"use client";
import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";
import { format, subDays, startOfDay } from "date-fns";

interface AnalyticsEvent {
  id: number;
  component: string;
  element: string;
  event_type: string;
  timestamp: string;
  user_session: string;
}

const AnalyticsDashboard = () => {
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch analytics data
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch("http://localhost:5000/events");
        if (!response.ok) {
          throw new Error("Failed to fetch analytics data");
        }
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
    const interval = setInterval(fetchAnalytics, 30000);
    return () => clearInterval(interval);
  }, []);

  // Process data for charts
  const componentClicks = events.reduce((acc, event) => {
    if (event.event_type === "click") {
      acc[event.component] = (acc[event.component] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const componentData = Object.entries(componentClicks).map(
    ([name, clicks]) => ({ name, clicks })
  );

  const elementClicks = events.reduce((acc, event) => {
    if (event.event_type === "click") {
      acc[event.element] = (acc[event.element] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const elementData = Object.entries(elementClicks).map(([name, clicks]) => ({
    name,
    clicks,
  }));

  // Timeline data (last 7 days)
  const timelineData = Array.from({ length: 7 }, (_, i) => {
    const date = startOfDay(subDays(new Date(), 6 - i));
    const dayEvents = events.filter(
      (event) =>
        startOfDay(new Date(event.timestamp)).getTime() === date.getTime()
    );
    return {
      date: format(date, "MMM dd"),
      clicks: dayEvents.filter((e) => e.event_type === "click").length,
      events: dayEvents.length,
    };
  });

  const uniqueSessions = new Set(events.map((e) => e.user_session)).size;

  // Better color palette for pie chart
  const COLORS = [
    "#3b82f6",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#06b6d4",
    "#f97316",
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-xl text-slate-800 font-medium">
          Loading analytics...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-xl text-red-700 font-medium">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">
          User Analytics Dashboard
        </h1>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-sm font-medium text-slate-600 mb-2">
              Total Events
            </h3>
            <p className="text-3xl font-bold text-blue-600">{events.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-sm font-medium text-slate-600 mb-2">
              Total Clicks
            </h3>
            <p className="text-3xl font-bold text-emerald-600">
              {events.filter((e) => e.event_type === "click").length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-sm font-medium text-slate-600 mb-2">
              Unique Sessions
            </h3>
            <p className="text-3xl font-bold text-purple-600">
              {uniqueSessions}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-sm font-medium text-slate-600 mb-2">
              Components Tracked
            </h3>
            <p className="text-3xl font-bold text-amber-600">
              {Object.keys(componentClicks).length}
            </p>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Component Clicks Bar Chart */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h2 className="text-xl font-semibold mb-4 text-slate-900">
              Clicks by Component
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={componentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "#475569", fontSize: 12 }}
                  axisLine={{ stroke: "#94a3b8" }}
                />
                <YAxis
                  tick={{ fill: "#475569", fontSize: 12 }}
                  axisLine={{ stroke: "#94a3b8" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "none",
                    borderRadius: "8px",
                    color: "#ffffff",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Bar dataKey="clicks" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Element Clicks Pie Chart */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h2 className="text-xl font-semibold mb-4 text-slate-900">
              Clicks by Element Type
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={elementData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#3b82f6"
                  dataKey="clicks"
                  labelStyle={{
                    fill: "#1f2937",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  {elementData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      stroke="#ffffff"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                    color: "#1f2937",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                  labelStyle={{ color: "#1f2937" }}
                  itemStyle={{ color: "#1f2937" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Timeline Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-slate-900">
            Activity Timeline (Last 7 Days)
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                dataKey="date"
                tick={{ fill: "#475569", fontSize: 12 }}
                axisLine={{ stroke: "#94a3b8" }}
              />
              <YAxis
                tick={{ fill: "#475569", fontSize: 12 }}
                axisLine={{ stroke: "#94a3b8" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "none",
                  borderRadius: "8px",
                  color: "#ffffff",
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="clicks"
                stroke="#3b82f6"
                name="Clicks"
                strokeWidth={3}
                dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="events"
                stroke="#10b981"
                name="Total Events"
                strokeWidth={3}
                dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Events Table */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-xl font-semibold text-slate-900">
              Recent Events
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                    Timestamp
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                    Component
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                    Element
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                    Event Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                    Session
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {events.slice(0, 10).map((event) => (
                  <tr key={event.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                      {format(
                        new Date(event.timestamp),
                        "MMM dd, yyyy HH:mm:ss"
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                      {event.component}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                      {event.element}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-emerald-100 text-emerald-800">
                        {event.event_type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {event.user_session.slice(-8)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
