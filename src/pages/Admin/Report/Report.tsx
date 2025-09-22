import React, { useState } from "react";
import {
  Calendar,
  FileText,
  Download,
  BarChart2,
  Filter,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const ReportPage = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reportType, setReportType] = useState("daily");
  const [isLoading, setIsLoading] = useState(false);

  const handleDownloadReport = () => {
    if (!startDate || !endDate) {
      alert("Please select both start and end dates");
      return;
    }

    setIsLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false);
      // In a real app, you would generate and download the report here
      const reportData = {
        startDate,
        endDate,
        reportType,
        filename: `report_${reportType}_${startDate}_to_${endDate}.pdf`,
      };
      console.log("Downloading report:", reportData);
      alert(`Downloading ${reportData.filename}`);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-2 ">
      <div className=" mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-800 flex items-center">
            <BarChart2 className="mr-3" />
            Reports
          </h1>
          <p className="mt-1 text-gray-600">
            Generate and download reports for your bookings and deliveries
          </p>
        </div>

        {/* Report Filter Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-700 flex items-center">
              <Filter className="mr-2" />
              Filter Reports
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Date Range Selector */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date Range
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    Start Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    End Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Report Type Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Report Type
              </label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="daily">Daily Report</option>
                <option value="weekly">Weekly Report</option>
                <option value="monthly">Monthly Report</option>
                <option value="custom">Custom Report</option>
              </select>
            </div>
          </div>
        </div>

        {/* Report Preview and Download Section */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-700 flex items-center">
              <FileText className="mr-2" />
              Report Preview
            </h2>
            <button
              onClick={handleDownloadReport}
              disabled={isLoading || !startDate || !endDate}
              className={`flex items-center px-4 py-2 rounded-md text-sm font-medium ${
                isLoading || !startDate || !endDate
                  ? "bg-blue-200 text-blue-400 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Generating...
                </>
              ) : (
                <>
                  <Download className="mr-2" size={16} />
                  Download Report
                </>
              )}
            </button>
          </div>

          {/* Report Preview Placeholder */}
          <div className="border border-dashed border-gray-300 rounded-lg p-8 text-center">
            <div className="max-w-md mx-auto">
              <BarChart2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-700 mb-1">
                {startDate && endDate
                  ? `Report for ${new Date(
                      startDate
                    ).toLocaleDateString()} to ${new Date(
                      endDate
                    ).toLocaleDateString()}`
                  : "Select a date range to preview your report"}
              </h3>
              <p className="text-gray-500 text-sm">
                {startDate && endDate
                  ? "Your report is ready to download. Click the button above to generate and download the report."
                  : "Choose a start and end date using the filters above to generate your report."}
              </p>
            </div>
          </div>

          {/* Date Navigation (Optional) */}
          {startDate && endDate && (
            <div className="flex justify-center mt-8 space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <ChevronLeft className="h-5 w-5 text-gray-600" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <ChevronRight className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
