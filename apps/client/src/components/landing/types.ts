export interface Contact {
  name: string;
  email: string;
  tag: 'Client' | 'Partner' | 'Lead';
  color: string;
}

export interface Activity {
  time: string;
  action: string;
  type: 'email' | 'meeting' | 'calendar' | 'note';
  color: string;
}

export interface Task {
  title: string;
  priority: 'High' | 'Medium' | 'Low';
  dueDate: string;
}
