import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  Clock,
  CheckCircle,
  TrendingUp,
  Download,
  LogOut,
} from "lucide-react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import api from "../api/axios";

function Dashboard() {
  const navigate = useNavigate();

  const [summary, setSummary] = useState(null);
  const [timeSeries, setTimeSeries] = useState([]);
  const [courseProgress, setCourseProgress] = useState([]);
  const [distribution, setDistribution] = useState([]);
  const [recommendation, setRecommendation] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [mentorData, setMentorData] = useState([]);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    let isMounted = true;

    const loadDashboard = async () => {
      try {
        const [
          summaryRes,
          timeSeriesRes,
          courseProgressRes,
          distributionRes,
          recommendationRes,
        ] = await Promise.all([
          api.get("/dashboard/summary"),
          api.get("/dashboard/time-series"),
          api.get("/dashboard/course-progress"),
          api.get("/dashboard/completion-distribution"),
          api.get("/dashboard/recommendations"),
        ]);

        if (!isMounted) return;

        setSummary(summaryRes.data.data);
        setTimeSeries(timeSeriesRes.data.data);
        setCourseProgress(courseProgressRes.data.data);
        setDistribution(distributionRes.data.data);
        setRecommendation(recommendationRes.data.data.recommendation);

        if (user.role === "mentor") {
          const mentorRes = await api.get("/dashboard/mentor");
          if (!isMounted) return;
          setMentorData(mentorRes.data.data);
        }
      } catch (error) {
        console.error("Dashboard load failed", error);
      }
    };

    loadDashboard();

    return () => {
      isMounted = false;
    };
  }, [user.role]);

  const fetchLessons = async (courseId) => {
    try {
      const res = await api.get(`/lessons/${courseId}`);
      setLessons(res.data.data);
      setSelectedCourse(courseId);
    } catch (error) {
      console.error("Lesson load failed", error);
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const exportCsv = async () => {
    const response = await api.get("/dashboard/export-csv", {
      responseType: "blob",
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "student-progress.csv");
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const cards = [
    {
      title: "Completed Lessons",
      value: summary?.completedLessons || 0,
      icon: CheckCircle,
    },
    {
      title: "Total Lessons",
      value: summary?.totalLessons || 0,
      icon: BookOpen,
    },
    {
      title: "Time Spent",
      value: `${summary?.totalTimeSpent || 0} min`,
      icon: Clock,
    },
    {
      title: "Overall Progress",
      value: `${summary?.progress || 0}%`,
      icon: TrendingUp,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Progressive Student Dashboard
            </h1>
            <p className="text-slate-500">
              Welcome, {user.name} ({user.role})
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={exportCsv}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700"
            >
              <Download size={18} />
              Export CSV
            </button>

            <button
              onClick={logout}
              className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-xl hover:bg-slate-800"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <div key={card.title} className="bg-white rounded-2xl shadow p-5">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-slate-500 text-sm">{card.title}</p>
                    <h2 className="text-3xl font-bold mt-2">{card.value}</h2>
                  </div>

                  <div className="bg-blue-100 text-blue-600 rounded-xl p-3">
                    <Icon size={24} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <div className="lg:col-span-2 bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-bold mb-5">Learning Trend</h2>

            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timeSeries}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="minutes"
                    stroke="#2563eb"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-bold mb-5">Completion Status</h2>

            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={distribution}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    label
                  >
                    {distribution.map((_, index) => (
                      <Cell
                        key={index}
                        fill={index === 0 ? "#16a34a" : "#f97316"}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <div className="lg:col-span-2 bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-bold mb-5">Course Progress</h2>

            <div className="space-y-5">
              {courseProgress.map((course) => (
                <div
                  key={course.courseId}
                  className={
                    selectedCourse === course.courseId
                      ? "border border-blue-200 rounded-xl p-4"
                      : ""
                  }
                >
                  <div className="flex justify-between mb-2">
                    <p className="font-semibold text-slate-700">
                      {course.courseTitle}
                    </p>
                    <p className="text-slate-500">{course.progress}%</p>
                  </div>

                  <div className="w-full bg-slate-200 rounded-full h-3">
                    <div
                      className="bg-blue-600 h-3 rounded-full"
                      style={{
                        width: `${course.progress}%`,
                      }}
                    />
                  </div>

                  <p className="text-sm text-slate-500 mt-1">
                    {course.completedLessons} of {course.totalLessons} lessons
                    completed
                  </p>

                  <button
                    onClick={() => fetchLessons(course.courseId)}
                    className="mt-3 text-sm text-blue-600 font-semibold hover:underline"
                  >
                    View Lessons
                  </button>
                </div>
              ))}
            </div>

            {lessons.length > 0 && (
              <div className="mt-6 border-t pt-4">
                <h3 className="font-bold mb-3">Lesson Details</h3>

                <div className="space-y-2">
                  {lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className="flex justify-between bg-slate-50 p-3 rounded-xl"
                    >
                      <div>
                        <p className="font-medium">{lesson.title}</p>
                        <p className="text-xs text-slate-500">
                          Duration: {lesson.duration} min
                        </p>
                      </div>

                      <span
                        className={
                          lesson.completed
                            ? "text-green-600 font-semibold"
                            : "text-orange-500 font-semibold"
                        }
                      >
                        {lesson.completed ? "Completed" : "Pending"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-bold mb-4">Recommendation</h2>

            <p className="text-slate-600 leading-7">{recommendation}</p>

            <div className="mt-6 bg-blue-50 text-blue-700 rounded-xl p-4 text-sm">
              Adaptive suggestion based on your weakest course progress.
            </div>
          </div>
        </div>

        {user.role === "mentor" && (
          <div className="bg-white rounded-2xl shadow p-6 mt-8">
            <h2 className="text-xl font-bold mb-5">Mentor Dashboard</h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b">
                    <th className="py-3">Student</th>
                    <th className="py-3">Completed Lessons</th>
                    <th className="py-3">Time Spent</th>
                  </tr>
                </thead>

                <tbody>
                  {mentorData.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-3">{item.student}</td>
                      <td className="py-3">{item.completedLessons}</td>
                      <td className="py-3">{item.totalTimeSpent} min</td>
                    </tr>
                  ))}

                  {mentorData.length === 0 && (
                    <tr>
                      <td colSpan="3" className="py-4 text-slate-500">
                        No student data available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Dashboard;