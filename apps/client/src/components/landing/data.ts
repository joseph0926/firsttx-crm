import type { Contact, Activity, Task } from './types';

export const CONTACTS: Contact[] = [
  { name: 'Sarah Johnson', email: 'sarah@example.com', tag: 'Client', color: 'from-violet-400 to-purple-400' },
  { name: 'Michael Chen', email: 'michael@startup.io', tag: 'Partner', color: 'from-blue-400 to-cyan-400' },
  { name: 'Emma Williams', email: 'emma@corp.com', tag: 'Lead', color: 'from-pink-400 to-rose-400' },
  { name: 'James Rodriguez', email: 'james@tech.co', tag: 'Client', color: 'from-amber-400 to-orange-400' },
  { name: 'Lisa Anderson', email: 'lisa@design.studio', tag: 'Lead', color: 'from-emerald-400 to-teal-400' },
];

export const ACTIVITIES: Activity[] = [
  { time: '2h ago', action: 'Email sent to Sarah Johnson', type: 'email', color: 'chart-2' },
  { time: '5h ago', action: 'Meeting with Michael Chen', type: 'meeting', color: 'chart-3' },
  { time: '1d ago', action: 'Follow-up scheduled', type: 'calendar', color: 'chart-1' },
  { time: '2d ago', action: 'Note added to Emma Williams', type: 'note', color: 'chart-4' },
];

export const TASKS: Task[] = [
  { title: 'Follow up with Sarah Johnson', priority: 'High', dueDate: 'Today' },
  { title: 'Prepare proposal for Tech Corp', priority: 'High', dueDate: 'Tomorrow' },
  { title: 'Review contract with Emma', priority: 'Medium', dueDate: 'This week' },
  { title: 'Schedule demo with new lead', priority: 'Medium', dueDate: 'Next week' },
];
