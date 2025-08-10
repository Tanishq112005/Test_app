

import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router'; 
import './Dashboard.css';
import {
  FaTrophy,
  FaPlus,
  FaSignOutAlt,
  FaCode,
  FaLaptopCode,
  FaCalendarAlt,
  FaChevronLeft,
  FaChevronRight,
  FaCheckCircle,
} from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { type AppDispatch, type RootState } from  '../../redux_state_manegemet/store'
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { user_information_changer } from '../../redux_state_manegemet/user_information'; // Corrected path
import { finding_user } from '../../keys/links';



interface Contest {
  name: string;
  date: string;
  solved: string;
  duration: string;
  status: 'Completed';
}

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

function isConsideredMobile(): boolean {
    if (navigator.userAgentData && navigator.userAgentData.mobile) return true;
    const hasTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    return hasTouch && window.innerWidth < 1024;
}

function getInitials(name: string): string {
    if (!name) return 'U';
    const words = name.split(' ');
    if (words.length > 1) {
        return (words[0][0] + words[words.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
}

// SUB-COMPONENTS (These are well-written and remain unchanged)

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                {children}
                <button className="modal-close-btn" onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

const SkeletonCard: React.FC<{ type: 'profile' | 'stat' | 'history' }> = ({ type }) => {
  if (type === 'profile') {
    return (
      <div className="card user-profile-card" style={{ background: '#e5e7eb', transition: 'none', transform: 'none', boxShadow: 'none' }}>
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
  if (type === 'history') return <div className="card skeleton skeleton-table" />;
  return <div className="card skeleton skeleton-card" />;
};

const DashboardHeader: React.FC<{ onStartContest: () => void }> = ({ onStartContest }) => (
    <header className="dashboard-header">
      <div className="header-title">
        <FaTrophy className="trophy-icon" />
        <h1>Dashboard</h1>
      </div>
      <button className="start-contest-btn" onClick={onStartContest}>
        <FaPlus /> New Contest
      </button>
    </header>
);

const UserProfile: React.FC<{ username: string, email: string }> = ({ username, email }) => {
     const navigate = useNavigate();
    const handleLogout = () => {
      // FIX: Use consistent key 'authToken'
      localStorage.removeItem('authToken');
      navigate("/");
    }
    return (
      <div className="card user-profile-card">
        <div className="profile-main">
          <div className="avatar">{getInitials(username)}</div>
          <div className="profile-info">
            <h2>{username}</h2>
            <p>{email}</p>
          </div>
        </div>
        <button className="logout-btn" onClick={handleLogout}><FaSignOutAlt /> Logout</button>
      </div>
    );
}

interface StatCardProps {
    icon: React.ReactNode;
    title: string;
    mainValue: string;
    subText: string;
    colorClass: 'blue' | 'green' | 'orange' | 'purple';
}
  
const StatCard: React.FC<StatCardProps> = ({ icon, title, mainValue, subText, colorClass }) => (
    <div className={`card stat-card ${colorClass}`}>
      <div className="stat-card-header">
        <span className="icon-wrapper">{icon}</span>
        <h3>{title}</h3>
      </div>
      <p className="stat-main-value">{mainValue}</p>
      <p className="stat-sub-text">{subText}</p>
    </div>
);
  
const ContestHistory: React.FC<{ contests: Contest[] }> = ({ contests }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(contests.length / itemsPerPage);

  const currentContests = contests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  if (contests.length === 0) {
    return (
        <div className="card contest-history-card">
            <h2>Contest History</h2>
            <p style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>No contests taken yet. Start a new one!</p>
        </div>
    );
  }

  return (
    <div className="card contest-history-card">
      <h2>Contest History</h2>
      <table>
        <thead>
          <tr>
            <th>Contest Name</th>
            <th>Date</th>
            <th>Solved</th>
            <th>Duration</th>
            <th>Status</th>
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
                <span className="status-pill completed">
                    <FaCheckCircle /> {contest.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button className="pagination-btn" onClick={() => setCurrentPage(p => p - 1)} disabled={currentPage === 1}>
          <FaChevronLeft /> <span className="pagination-text">Previous</span>
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button className="pagination-btn" onClick={() => setCurrentPage(p => p + 1)} disabled={currentPage === totalPages}>
          <span className="pagination-text">Next</span> <FaChevronRight />
        </button>
      </div>
    </div>
  );
};




const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const userInfo = useSelector((state: RootState) => state.user_inforamtion.value);

 
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const authToken = localStorage.getItem('authToken');

      
        if (!authToken) {
          navigate('/login');
          return;
        }

        
        const decodedToken: { email: string } = jwtDecode(authToken);
        
     
        const response = await axios.post(finding_user, {
          email: decodedToken.email
        });

        dispatch(user_information_changer(response.data));

      } catch (error) {
        console.error("Failed to fetch user data or token is invalid:", error);
    
        localStorage.removeItem('authToken');
        navigate('/login');
      } finally {
   
        setIsLoading(false);
      }
    };

    fetchUserData();
 
  }, [dispatch, navigate]);
  
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
        stats: { total_question_solved: 0, total_leetcode_solved: 0, total_codeforces_solved: 0, total_contest: 0 }
    };
    
   
    if (!userInfo?.contest_information) return initialData;

    let totalCodeforcesSolved = 0;
    let totalLeetcodeSolved = 0;

    const allContests: Contest[] = userInfo.contest_information.map((contest: any, i: number) => {
        const solvedCodeforces = contest.solved_codeforces_question || 0;
        const solvedLeetcode = contest.solved_leetcode_question || 0;
        totalCodeforcesSolved += solvedCodeforces;
        totalLeetcodeSolved += solvedLeetcode;

        const totalQuestions = (contest.leetcode_question || 0) + (contest.codeforeces_question || 0);
        const solvedQuestions = solvedCodeforces + solvedLeetcode;
        
        const date = new Date(contest.date);
        const formattedDate = !isNaN(date.getTime()) ? date.toLocaleDateString() : 'N/A';

        return {
          name: `Practice Contest #${i + 1}`,
          solved: `${solvedQuestions} / ${totalQuestions}`, 
          duration: contest.time_duration || 'N/A',
          status: 'Completed'
        };
    }).reverse(); 
    
    return {
        contests: allContests,
        stats: {
            total_question_solved: totalCodeforcesSolved + totalLeetcodeSolved,
            total_leetcode_solved: totalLeetcodeSolved,
            total_codeforces_solved: totalCodeforcesSolved,
            total_contest: userInfo.total_contest || 0,
        }
    }
  }, [userInfo]);


  if (isLoading) {
    return (
      <div className="dashboard-container">
        <DashboardHeader onStartContest={() => {}} />
        <main>
          <SkeletonCard type="profile" />
          <div className="stats-grid">
            {[...Array(4)].map((_, i) => <SkeletonCard key={i} type="stat" />)}
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
            username={userInfo?.name || 'Coding Enthusiast'}
            email={userInfo?.email || 'user@example.com'}
        />
        
        <div className="stats-grid">
          <StatCard icon={<FaCode />} title="Total Questions Solved" mainValue={String(dashboardData.stats.total_question_solved)} subText="Across all platforms" colorClass="blue" />
          <StatCard icon={<FaLaptopCode />} title="LeetCode Solved" mainValue={String(dashboardData.stats.total_leetcode_solved)} subText="Problems conquered" colorClass="green" />
          <StatCard icon={<FaLaptopCode />} title="Codeforces Solved" mainValue={String(dashboardData.stats.total_codeforces_solved)} subText="Problems conquered" colorClass="orange" />
          <StatCard icon={<FaCalendarAlt />} title="Contests Taken" mainValue={String(dashboardData.stats.total_contest)} subText="Total sessions" colorClass="purple" />
        </div>

        <ContestHistory contests={dashboardData.contests} />
      </main>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h2>Desktop Recommended</h2>
          <p>For the best coding experience, please start new contests on a desktop or laptop device.</p>
      </Modal>
    </div>
  );
};

export default Dashboard;