import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

// A simple mentorship requests UI with accept/reject and compatibility check
const MentorshipRequests: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Simulated current user profile (Indian data)
  const currentUser = {
    id: 'user1',
    full_name: 'Priya Sharma',
    offeredSkills: ['Python', 'Data Analysis', 'Django'],
    wantedSkills: ['React', 'UI/UX Design'],
    city: 'Mumbai'
  };

  const [requests, setRequests] = useState<any[]>([
    {
      id: 'r1',
      requester: {
        id: 'user2',
        full_name: 'Arjun Singh',
        avatar: null,
        city: 'Pune',
        offeredSkill: 'React',
        wantedSkill: 'Django',
        bio: 'Full-stack developer interested in front-end and React.',
      },
      created_at: '2025-01-15T10:30:00Z',
      status: 'pending'
    },
    {
      id: 'r2',
      requester: {
        id: 'user3',
        full_name: 'Kavya Desai',
        avatar: null,
        city: 'Bengaluru',
        offeredSkill: 'UI/UX Design',
        wantedSkill: 'Python',
        bio: 'Designer wanting to learn backend patterns and Python best practices.'
      },
      created_at: '2025-01-14T14:20:00Z',
      status: 'pending'
    },
    {
      id: 'r3',
      requester: {
        id: 'user4',
        full_name: 'Rohit Kumar',
        avatar: null,
        city: 'Delhi',
        offeredSkill: 'Data Analysis',
        wantedSkill: 'React',
        bio: 'Data analyst who wants to pick up React for dashboards.'
      },
      created_at: '2025-01-12T09:15:00Z',
      status: 'accepted'
    }
  ]);

  const compatibilityScore = (req: any) => {
    // Very simple scoring:
    // +70 if offeredSkill matches one of currentUser.wantedSkills
    // +20 if wantedSkill matches one of currentUser.offeredSkills
    // +10 if same city
    let score = 0;
    if (currentUser.wantedSkills.includes(req.requester.offeredSkill)) score += 70;
    if (currentUser.offeredSkills.includes(req.requester.wantedSkill)) score += 20;
    if (req.requester.city && req.requester.city === currentUser.city) score += 10;
    return score;
  };

  const acceptRequest = (id: string) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'accepted' } : r));
    const req = requests.find(r => r.id === id);
    toast({ title: 'Request accepted', description: `You accepted ${req?.requester.full_name}'s mentorship request.` });
  };

  const rejectRequest = (id: string) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'rejected' } : r));
    const req = requests.find(r => r.id === id);
    toast({ title: 'Request rejected', description: `You rejected ${req?.requester.full_name}'s request.` });
  };

  const openChat = (requester: any) => {
    navigate('/chat', { state: { selectedMember: { full_name: requester.full_name, id: requester.id } } });
  };

  const pending = useMemo(() => requests.filter(r => r.status === 'pending'), [requests]);
  const processed = useMemo(() => requests.filter(r => r.status !== 'pending'), [requests]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Mentorship Requests</h2>
          <p className="text-gray-600">Review incoming mentorship requests and accept those with strong skill-exchange compatibility.</p>
        </div>
      </div>

      {/* Pending Requests */}
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Incoming Requests ({pending.length})</h3>
        {pending.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No pending requests</div>
        ) : (
          <div className="space-y-4">
            {pending.map((req, idx) => (
              <motion.div key={req.id} className="border border-gray-100 rounded-lg p-4 flex items-start justify-between" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.03 }}>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 font-bold">{req.requester.full_name.charAt(0)}</div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-semibold text-gray-900">{req.requester.full_name}</h4>
                      <span className="text-xs text-gray-500">{req.requester.city}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{req.requester.bio}</p>
                    <div className="mt-2 text-sm text-gray-700">
                      <span className="inline-block px-2 py-1 bg-green-50 text-green-700 rounded-full mr-2">Offers: {req.requester.offeredSkill}</span>
                      <span className="inline-block px-2 py-1 bg-blue-50 text-blue-700 rounded-full">Wants: {req.requester.wantedSkill}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end space-y-3">
                  <div className="text-sm text-gray-500">{new Date(req.created_at).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Kolkata' })}</div>
                  <div className="text-sm font-semibold">Compatibility: {compatibilityScore(req)}%</div>
                  <div className="flex items-center space-x-2">
                    <motion.button onClick={() => openChat(req.requester)} className="px-3 py-2 bg-gray-100 rounded-md text-sm hover:bg-gray-200"> <MessageSquare className="w-4 h-4 inline-block mr-1"/> Chat</motion.button>
                    <motion.button onClick={() => acceptRequest(req.id)} className="px-3 py-2 bg-green-600 text-white rounded-md text-sm hover:bg-green-700"><Check className="w-4 h-4 inline-block mr-1"/> Accept</motion.button>
                    <motion.button onClick={() => rejectRequest(req.id)} className="px-3 py-2 bg-red-50 text-red-600 rounded-md text-sm hover:bg-red-100"><X className="w-4 h-4 inline-block mr-1"/> Reject</motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Processed Requests */}
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Processed Requests</h3>
        {processed.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No processed requests yet</div>
        ) : (
          <div className="space-y-3">
            {processed.map((req) => (
              <div key={req.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-md">
                <div>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 font-bold">{req.requester.full_name.charAt(0)}</div>
                    <div>
                      <div className="font-medium text-gray-900">{req.requester.full_name}</div>
                      <div className="text-xs text-gray-500">{req.requester.offeredSkill} → {req.requester.wantedSkill}</div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className={`px-2 py-1 rounded-full text-xs ${req.status === 'accepted' ? 'bg-green-100 text-green-700' : 'bg-red-50 text-red-600'}`}>{req.status}</div>
                  <button onClick={() => openChat(req.requester)} className="text-sm text-gray-600 hover:text-blue-600">Message</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default MentorshipRequests;
