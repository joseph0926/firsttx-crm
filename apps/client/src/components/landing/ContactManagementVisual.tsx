import { motion } from 'motion/react';
import { CONTACTS } from './data';

export function ContactManagementVisual() {
  return (
    <div className="relative w-full h-[500px]">
      <div className="absolute inset-0 bg-card/40 backdrop-blur-xl rounded-3xl border border-border shadow-2xl overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-primary/5 to-transparent" />

        <div className="p-6 h-full flex flex-col relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-destructive" />
              <div className="w-2.5 h-2.5 rounded-full bg-chart-1" />
              <div className="w-2.5 h-2.5 rounded-full bg-chart-2" />
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-muted/60 backdrop-blur-sm rounded-full text-xs font-medium text-muted-foreground">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search contacts
            </div>
          </div>

          <div className="flex-1 space-y-3 overflow-hidden">
            {CONTACTS.map((contact, i) => (
              <motion.div
                key={contact.email}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 + 0.5 }}
                whileHover={{ scale: 1.02, x: 4 }}
                className="group cursor-pointer"
              >
                <div className="flex items-center gap-4 p-3.5 bg-card/80 backdrop-blur-sm rounded-2xl border border-border hover:border-primary/30 hover:shadow-lg transition-all">
                  <div className={`relative w-11 h-11 rounded-full bg-linear-to-br ${contact.color} flex items-center justify-center text-white font-semibold text-sm shadow-md`}>
                    {contact.name.split(' ').map(n => n[0]).join('')}
                    <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-chart-2 border-2 border-card rounded-full" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-foreground truncate">{contact.name}</div>
                    <div className="text-xs text-muted-foreground truncate mt-0.5">{contact.email}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                      {contact.tag}
                    </span>
                    <motion.div
                      className="w-8 h-8 rounded-lg bg-muted/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-4 pt-4 border-t border-border"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <button className="w-full p-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-medium text-sm transition-colors flex items-center justify-center gap-2 shadow-md">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add New Contact
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
