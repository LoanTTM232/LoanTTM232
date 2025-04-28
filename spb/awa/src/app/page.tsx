'use client';

import React, { useState, useEffect } from "react";
import MainLayout from "@/components/layout/main-layout";
import StatCard from "@/components/ui/stat-card";
import { overviewStats } from "@/data/mock-data";

export default function Home() {
  const [totalUsers, setTotalUsers] = useState<number | null>(null);
  const [totalClubs, setTotalClubs] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>("Just now");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError("Authentication required");
          setLoading(false);
          return;
        }

        // Fetch total users
        try {
          const usersResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users?i=1&p=1`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          if (usersResponse.ok) {
            const usersData = await usersResponse.json();
            console.log('Users API response:', usersData);

            // Extract total users count from the response
            if (usersData.data && usersData.data.total) {
              setTotalUsers(usersData.data.total);
            } else {
              console.warn('Could not find total users count in API response, using mock data');
              setTotalUsers(parseInt(overviewStats.clients.count.replace('k', '000')));
            }
          } else {
            console.error('Failed to fetch users, using mock data');
            setTotalUsers(parseInt(overviewStats.clients.count.replace('k', '000')));
          }
        } catch (err) {
          console.error('Error fetching users:', err);
          setTotalUsers(parseInt(overviewStats.clients.count.replace('k', '000')));
        }

        // Fetch total clubs
        try {
          const clubsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clubs?i=1&p=1`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          if (clubsResponse.ok) {
            const clubsData = await clubsResponse.json();
            console.log('Clubs API response:', clubsData);

            // Extract total clubs count from the response
            if (clubsData.data && clubsData.data.total) {
              setTotalClubs(clubsData.data.total);
            } else {
              console.warn('Could not find total clubs count in API response, using mock data');
              setTotalClubs(parseInt(overviewStats.clubs.count));
            }
          } else {
            console.error('Failed to fetch clubs, using mock data');
            setTotalClubs(parseInt(overviewStats.clubs.count));
          }
        } catch (err) {
          console.error('Error fetching clubs:', err);
          setTotalClubs(parseInt(overviewStats.clubs.count));
        }

        // Set last updated time
        setLastUpdated(new Date().toLocaleTimeString());
      } catch (err) {
        console.error('Error in fetchData:', err);
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Refresh data every 5 minutes
    const intervalId = setInterval(fetchData, 5 * 60 * 1000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <MainLayout title="Overview">
      <div className="mb-4 flex items-center text-sm text-gray-500">
        <span>Last updated: {lastUpdated}</span>
      </div>

      {loading && !totalUsers && !totalClubs ? (
        <div className="flex justify-center items-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          <span className="ml-2">Loading statistics...</span>
        </div>
      ) : error ? (
        <div className="bg-red-50 p-4 rounded-md text-red-500 mb-8">
          {error}
        </div>
      ) : (
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          <StatCard
            title="Users"
            value={totalUsers?.toLocaleString() || "0"}
            change={overviewStats.clients.change}
            color="blue"
          />
          <StatCard
            title="Clubs"
            value={totalClubs?.toLocaleString() || "0"}
            change={overviewStats.clubs.change}
            color="red"
          />
        </div>
      )}
    </MainLayout>
  );
}
