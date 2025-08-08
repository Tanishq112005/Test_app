import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router';
import './Dashboard.css'; // Make sure this CSS file is in the same directory
import {
  FaTrophy,
  FaPlus,
  FaSignOutAlt,
  FaCode,
  FaLaptopCode,
  FaCalendarAlt,
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa';
import { useSelector } from 'react-redux';
import type { RootState } from '../../redux_state_manegemet/store'; // Adjust this path to your store

// --- TYPE DEFINITIONS ---

interface Contest {
  name: string;
  date: string;
  solved: string;
  duration: string;
  status: string;
}

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

// --- HELPER FUNCTION FOR DEVICE DETECTION ---
// Placed outside the component as it doesn't depend on props or state
function isConsideredMobile(): boolean {
    // Priority 1: Use the modern, reliable userAgentData API if available
    if (navigator.userAgentData && navigator.userAgentData.mobile) {
        return true;
    }
    // Fallback 2: Check for touch support combined with a common mobile/tablet screen width
    const hasTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    if (hasTouch && window.innerWidth < 1024) {
        return true;
    }
    return false;
}

// --- REUSABLE COMPONENTS ---

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                {children}
                <button className="modal-close-btn" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
};

const SkeletonCard = ({ type }: { type: 'profile' | 'stat' | 'history' }) => {
  if (type === 'profile') {
    return (
      <div className="card user-profile-card" style={{ background: '#a5b4fc', transition: 'none', transform: 'none', boxShadow: 'none' }}>
        <div className="profile-main">
          <div className="skeleton skeleton-avatar"></div>
          <div>
            <div className="skeleton skeleton-text" style={{ width: '150px' }}></div>
            <div className="skeleton skeleton-text" style={{ width: '200px' }}></div>
          </div>
        </div>
      </div>
    );
  }
  if (type === 'history') {
     return <div className="card skeleton skeleton-table" style={{ transition: 'none', transform: 'none', boxShadow: 'none' }}></div>
  }
  return <div className="card skeleton skeleton-card" style={{ transition: 'none', transform: 'none', boxShadow: 'none' }}></div>;
};

const DashboardHeader: React.FC<{ onStartContest: () => void }> = ({ onStartContest }) => (
    <header className="dashboard-header">
      <div className="header-title">
        <FaTrophy className="trophy-icon" />
        <h1>Coding Dashboard</h1>
      </div>
      <button className="start-contest-btn" onClick={onStartContest}>
        <FaPlus /> Start New Contest
      </button>
    </header>
);


const UserProfile: React.FC<{ username: string, email: string }> = ({ username, email }) => {
     const navigate = useNavigate() ; 
    function removing_cookies() {
      localStorage.removeItem('authToken');
       navigate("/") ; 
    }
    return <div className="card user-profile-card">
      <div className="profile-main">
        <div className="avatar"></div>
        <div className="profile-info">
          <h2>{username}</h2>
          <p>{email}</p>
        </div>
      </div>
      <button className="logout-btn" onClick={removing_cookies}><FaSignOutAlt /> Logout</button>
    </div>
}

interface StatCardProps {
    icon: React.ReactNode;
    title: string;
    mainValue: string;
    subText: string;
    colorClass: string;
}
  
const StatCard: React.FC<StatCardProps> = ({ icon, title, mainValue, subText, colorClass }) => (
    <div className={`card stat-card ${colorClass}`}>
      <div className="stat-card-header">{icon}<h3>{title}</h3></div>
      <p className="stat-main-value">{mainValue}</p>
      <p className="stat-sub-text">{subText}</p>
    </div>
);
  
const ContestHistory: React.FC<{ contests: Contest[] }> = ({ contests }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(contests.length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };
  
  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const currentContests = contests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  if (contests.length === 0) {
    return (
        <div className="card contest-history-card">
            <h2>Contest History</h2>
            <p style={{ textAlign: 'center', padding: '2rem' }}>No contest history found.</p>
        </div>
    )
  }

  return (
    <div className="card contest-history-card">
      <h2>Contest History</h2>
      <table>
        <thead>
          <tr>
            <th>CONTEST NAME</th>
            <th>DATE</th>
            <th>QUESTIONS SOLVED</th>
            <th>DURATION</th>
            <th>STATUS</th>
          </tr>
        </thead>
        <tbody>
          {currentContests.map((contest, index) => (
            <tr key={`${contest.name}-${index}`}>
              <td data-label="Contest Name">{contest.name}</td>
              <td data-label="Date">{contest.date}</td>
              <td data-label="Solved">{contest.solved}</td>
              <td data-label="Duration">{contest.duration}</td>
              <td data-label="Status">
                <span className="status-pill completed">{contest.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button className="pagination-btn" onClick={handlePrevPage} disabled={currentPage === 1}>
          <FaChevronLeft /> <span className="pagination-text">Previous</span>
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button className="pagination-btn" onClick={handleNextPage} disabled={currentPage === totalPages}>
          <span className="pagination-text">Next</span> <FaChevronRight />
        </button>
      </div>
    </div>
  );
};


// --- MAIN DASHBOARD COMPONENT ---
const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const information_contest = useSelector((s: RootState) => s.user_inforamtion.value);

  const handleStartContestClick = () => {
    if (isConsideredMobile()) {
      setIsModalOpen(true);
    } else {
      navigate('/test_decider');
    }
  };
  
  const dashboardData = useMemo(() => {
    const initialData = {
        contests: [] as Contest[],
        stats: {
            total_question_solved: 0,
            total_leetcode_solved: 0,
            total_codeforces_solved: 0,
            total_contest: 0,
        }
    };
    
    if (!information_contest?.contest_information) {
      return initialData;
    }

    let total_codeforces_solved = 0;
    let total_leetcode_solved = 0;

    const allContests: Contest[] = information_contest.contest_information.map((contest: any, i: number) => {
        total_codeforces_solved += contest.solved_codeforces_question || 0;
        total_leetcode_solved += contest.solved_leetcode_question || 0;

        const total_question = (contest.leetcode_question || 0) + (contest.codeforeces_question || 0); 
        const solved_question = (contest.solved_codeforces_question || 0) + (contest.solved_leetcode_question || 0); 
        
        return {
          name: `Contest-${i + 1}`,
          date: contest.date || 'N/A',
          solved: `${solved_question}/${total_question}`, 
          duration: contest.time_duration || 'N/A',
          status: 'Completed'
        };
    });
    
    return {
        contests: allContests,
        stats: {
            total_question_solved: total_codeforces_solved + total_leetcode_solved,
            total_leetcode_solved: total_leetcode_solved,
            total_codeforces_solved: total_codeforces_solved,
            total_contest: information_contest.total_contest || 0,
        }
    }
  }, [information_contest]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="dashboard-container">
        <DashboardHeader onStartContest={() => {}} />
        <main>
          <SkeletonCard type="profile" />
          <div className="stats-grid">
            <SkeletonCard type="stat" />
            <SkeletonCard type="stat" />
            <SkeletonCard type="stat" />
            <SkeletonCard type="stat" />
          </div>
          <SkeletonCard type="history" />
        </main>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <DashboardHeader onStartContest={handleStartContestClick} />
      <main>
        <UserProfile 
            username={information_contest.name || 'User'}
            email={information_contest.email || 'user@example.com'}
        />
        
        <div className="stats-grid">
          <StatCard icon={<FaCode />} title="Total Questions" mainValue={String(dashboardData.stats.total_question_solved)} subText="Total Solved" colorClass="blue" />
          <StatCard icon={<FaLaptopCode />} title="LeetCode Questions" mainValue={String(dashboardData.stats.total_leetcode_solved)} subText="Solved Leetcode Problems" colorClass="green" />
          <StatCard icon={<FaLaptopCode />} title="Codeforces Questions" mainValue={String(dashboardData.stats.total_codeforces_solved)} subText="Solved Codeforces Problems" colorClass="orange" />
          <StatCard icon={<FaCalendarAlt />} title="Total Contests" mainValue={String(dashboardData.stats.total_contest)} subText="Participated" colorClass="purple" />
        </div>

        <ContestHistory contests={dashboardData.contests} />
      </main>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h2>Feature Not Available</h2>
          <p>Starting a new contest is only available on desktop or laptop devices for a better experience.</p>
      </Modal>
    </div>
  );
};

export default Dashboard;