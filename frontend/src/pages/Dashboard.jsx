import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  Clock,
  CheckCircle,
  TrendingUp,
  Download,
  LogOut,
  Home,
  BarChart3,
  Settings,
  Menu,
  X,
  AlertTriangle,
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
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
    const res = await api.get(`/lessons/${courseId}`);
    setLessons(res.data.data);
    setSelectedCourse(courseId);
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
      note: "Lessons finished",
    },
    {
      title: "Total Lessons",
      value: summary?.totalLessons || 0,
      icon: BookOpen,
      note: "Across all courses",
    },
    {
      title: "Time Spent",
      value: `${summary?.totalTimeSpent || 0} min`,
      icon: Clock,
      note: "Learning time",
    },
    {
      title: "Overall Progress",
      value: `${summary?.progress || 0}%`,
      icon: TrendingUp,
      note: "Completion rate",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f4f7fb] text-slate-900">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-40 h-full w-64 bg-white border-r border-slate-200 p-5 transition-transform lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center">
          <h2 className="font-black text-blue-700">EduSynthesize</h2>
          <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X size={22} />
          </button>
        </div>

        <p className="text-xs text-slate-400 mt-1">Learning Portal</p>

        <nav className="mt-8 space-y-2">
          {[
            { label: "Home", icon: Home },
            { label: "Courses", icon: BookOpen },
            { label: "Progress", icon: BarChart3 },
            { label: "Settings", icon: Settings },
          ].map((item, index) => {
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold ${
                  index === 0
                    ? "bg-blue-600 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-6 left-5 right-5 bg-blue-50 rounded-2xl p-4">
          <p className="text-xs text-slate-500">Advance your skills</p>
          <button className="mt-3 w-full bg-blue-600 text-white rounded-xl py-2 text-sm font-bold">
            Upgrade to Pro
          </button>
        </div>
      </aside>

      <div className="lg:ml-64">
        <header className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-slate-200">
          <div className="px-4 md:px-8 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                className="lg:hidden bg-slate-100 p-2 rounded-xl"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu size={22} />
              </button>

              <div>
                <h1 className="text-xl md:text-2xl font-black">
                  {user.role === "mentor"
                    ? "Mentor Dashboard"
                    : "Student Dashboard"}
                </h1>
                <p className="text-sm text-slate-500">
                  Welcome, {user.name} ({user.role})
                </p>
              </div>
            </div>

            <div className="hidden md:block flex-1 max-w-md">
              <input
                placeholder="Search courses, lessons, progress..."
                className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={exportCsv}
                className="hidden sm:flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-blue-700"
              >
                <Download size={17} />
                Export CSV
              </button>

              <button
                onClick={logout}
                className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-slate-800"
              >
                <LogOut size={17} />
                Logout
              </button>
            </div>
          </div>
        </header>

        <main className="p-4 md:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {cards.map((card) => {
              const Icon = card.icon;

              return (
                <div
                  key={card.title}
                  className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5"
                >
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-500">
                        {card.title}
                      </p>
                      <h2 className="text-3xl font-black mt-3">{card.value}</h2>
                      <p className="text-xs text-slate-400 mt-2">
                        {card.note}
                      </p>
                    </div>

                    <div className="bg-blue-50 text-blue-600 rounded-2xl p-3 h-fit">
                      <Icon size={24} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
            <section className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 p-5 md:p-6">
              <div className="flex justify-between items-center mb-5">
                <div>
                  <h2 className="text-xl font-black">Learning Trend</h2>
                  <p className="text-sm text-slate-500">
                    Time spent over recent days
                  </p>
                </div>
              </div>

              <div className="h-72 md:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={timeSeries}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="minutes"
                      stroke="#2563eb"
                      strokeWidth={4}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </section>

            <section className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 md:p-6">
              <h2 className="text-xl font-black">Completion Status</h2>
              <p className="text-sm text-slate-500 mt-1">
                Completed vs pending lessons
              </p>

              <div className="h-72 mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={distribution}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={70}
                      outerRadius={105}
                      label
                    >
                      {distribution.map((_, index) => (
                        <Cell
                          key={index}
                          fill={index === 0 ? "#2563eb" : "#e5e7eb"}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </section>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
            <section className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 p-5 md:p-6">
              <h2 className="text-xl font-black">Course Progress</h2>
              <p className="text-sm text-slate-500 mt-1">
                Track progress across all courses
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
                {courseProgress.map((course) => (
                  <div
                    key={course.courseId}
                    className={`rounded-2xl border p-4 ${
                      selectedCourse === course.courseId
                        ? "border-blue-500 bg-blue-50"
                        : "border-slate-200 bg-white"
                    }`}
                  >
                    <div className="flex justify-between gap-3">
                      <h3 className="font-black text-slate-800">
                        {course.courseTitle}
                      </h3>
                      <span className="text-sm font-black text-blue-600">
                        {course.progress}%
                      </span>
                    </div>

                    <div className="w-full bg-slate-200 rounded-full h-2 mt-4">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>

                    <p className="text-sm text-slate-500 mt-3">
                      {course.completedLessons} of {course.totalLessons} lessons
                      completed
                    </p>

                    <button
                      onClick={() => fetchLessons(course.courseId)}
                      className="mt-4 w-full bg-slate-900 text-white rounded-xl py-2 text-sm font-bold hover:bg-slate-800"
                    >
                      View Lessons
                    </button>
                  </div>
                ))}
              </div>

              {lessons.length > 0 && (
                <div className="mt-6 border-t pt-5">
                  <h3 className="font-black mb-4">Lesson Details</h3>

                  <div className="space-y-3">
                    {lessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 bg-slate-50 p-4 rounded-2xl"
                      >
                        <div>
                          <p className="font-bold">{lesson.title}</p>
                          <p className="text-xs text-slate-500">
                            Duration: {lesson.duration} min
                          </p>
                        </div>

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-black w-fit ${
                            lesson.completed
                              ? "bg-green-100 text-green-700"
                              : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {lesson.completed ? "Completed" : "Pending"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>

            <aside className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 md:p-6">
                <h2 className="text-xl font-black">Recommendation</h2>

                <div className="mt-5 bg-blue-600 text-white rounded-2xl p-5">
                  <p className="font-bold">{recommendation}</p>
                  <p className="text-sm text-blue-100 mt-2">
                    Adaptive suggestion based on weakest course progress.
                  </p>
                </div>
              </div>

              <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5">
                <div className="flex gap-3">
                  <AlertTriangle className="text-orange-600" />
                  <div>
                    <h3 className="font-black text-orange-900">
                      Needs Attention
                    </h3>
                    <p className="text-sm text-orange-700 mt-1">
                      Focus on courses with lower completion percentage.
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </div>

          {user.role === "mentor" && (
            <section className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 md:p-6 mt-6">
              <h2 className="text-xl font-black">Student Activity</h2>
              <p className="text-sm text-slate-500 mt-1">
                Overview of all student learning activity
              </p>

              <div className="overflow-x-auto mt-5">
                <table className="w-full text-left min-w-[600px]">
                  <thead>
                    <tr className="border-b text-sm text-slate-500">
                      <th className="py-3">Student</th>
                      <th className="py-3">Completed Lessons</th>
                      <th className="py-3">Time Spent</th>
                      <th className="py-3">Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {mentorData.map((item, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-4 font-bold">{item.student}</td>
                        <td className="py-4">{item.completedLessons}</td>
                        <td className="py-4">{item.totalTimeSpent} min</td>
                        <td className="py-4">
                          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-black">
                            Active
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;