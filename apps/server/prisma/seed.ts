import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const devEmail = 'dev@example.com';

  let devUser = await prisma.user.findUnique({
    where: { email: devEmail },
  });

  if (!devUser) {
    devUser = await prisma.user.create({
      data: {
        email: devEmail,
        name: 'Dev User',
      },
    });
    console.log('✅ Created dev user:', devUser.email);
  } else {
    console.log('✅ Dev user already exists:', devUser.email);
  }

  const existingContacts = await prisma.contact.findMany({
    where: { userId: devUser.id },
  });

  if (existingContacts.length > 0) {
    console.log(
      `ℹ️  Found ${existingContacts.length} existing contacts. Skipping seed.`
    );
    return;
  }

  const contactsData = [
    {
      name: 'Alice Johnson',
      email: 'alice.johnson@techcorp.com',
      phone: '+1-555-0101',
      company: 'TechCorp Inc.',
      position: 'CTO',
      status: 'ACTIVE' as const,
      priority: 'HIGH' as const,
      tags: ['Enterprise', 'Decision Maker'],
      notes:
        'Key decision maker for enterprise solutions. Very interested in our platform.',
      lastContactedAt: new Date('2025-11-05'),
    },
    {
      name: 'Bob Smith',
      email: 'bob.smith@startup.io',
      phone: '+1-555-0102',
      company: 'Startup.io',
      position: 'Founder & CEO',
      status: 'LEAD' as const,
      priority: 'URGENT' as const,
      tags: ['Startup', 'Founder'],
      notes: 'Looking for seed funding tools. Follow up next week.',
      lastContactedAt: new Date('2025-11-06'),
    },
    {
      name: 'Carol Davis',
      email: 'carol.davis@marketing.co',
      phone: '+1-555-0103',
      company: 'Marketing Co.',
      position: 'Marketing Director',
      status: 'ACTIVE' as const,
      priority: 'MEDIUM' as const,
      tags: ['Marketing', 'Partner'],
      notes: 'Partnership opportunity for co-marketing campaigns.',
      lastContactedAt: new Date('2025-11-01'),
    },
    {
      name: 'David Lee',
      email: 'david.lee@innovation.com',
      phone: '+1-555-0104',
      company: 'Innovation Labs',
      position: 'Product Manager',
      status: 'LEAD' as const,
      priority: 'MEDIUM' as const,
      tags: ['Product', 'Innovation'],
      notes: 'Exploring API integration possibilities.',
      lastContactedAt: new Date('2025-10-28'),
    },
    {
      name: 'Emma Wilson',
      email: 'emma.wilson@finance.com',
      phone: '+1-555-0105',
      company: 'Finance Solutions',
      position: 'VP of Operations',
      status: 'ACTIVE' as const,
      priority: 'HIGH' as const,
      tags: ['Enterprise', 'Finance'],
      notes: 'Current customer. Wants to expand to 3 more teams.',
      lastContactedAt: new Date('2025-11-07'),
    },
    {
      name: 'Frank Martinez',
      email: 'frank.m@consulting.net',
      phone: '+1-555-0106',
      company: 'Consulting Partners',
      position: 'Senior Consultant',
      status: 'INACTIVE' as const,
      priority: 'LOW' as const,
      tags: ['Consulting'],
      notes: 'Project paused. Re-engage in Q2 2026.',
      lastContactedAt: new Date('2025-09-15'),
    },
    {
      name: 'Grace Chen',
      email: 'grace.chen@design.studio',
      phone: '+1-555-0107',
      company: 'Design Studio',
      position: 'Creative Director',
      status: 'LEAD' as const,
      priority: 'LOW' as const,
      tags: ['Design', 'Creative'],
      notes: 'Interested in design partnership.',
      lastContactedAt: new Date('2025-10-20'),
    },
    {
      name: 'Henry Brown',
      email: 'h.brown@enterprise.com',
      phone: '+1-555-0108',
      company: 'Enterprise Systems',
      position: 'IT Director',
      status: 'ACTIVE' as const,
      priority: 'URGENT' as const,
      tags: ['Enterprise', 'IT'],
      notes: 'Urgent: needs demo for board meeting next Monday.',
      lastContactedAt: new Date('2025-11-08'),
    },
    {
      name: 'Isabel Garcia',
      email: 'isabel@growth.co',
      phone: '+1-555-0109',
      company: 'Growth Labs',
      position: 'Head of Growth',
      status: 'LEAD' as const,
      priority: 'HIGH' as const,
      tags: ['Growth', 'SaaS'],
      notes: 'Wants to schedule product walkthrough.',
      lastContactedAt: new Date('2025-11-04'),
    },
    {
      name: 'Jack Thompson',
      email: 'jack.t@retail.com',
      phone: '+1-555-0110',
      company: 'Retail Chain Co.',
      position: 'Operations Manager',
      status: 'LOST' as const,
      priority: 'LOW' as const,
      tags: ['Retail'],
      notes: 'Went with competitor. Budget constraints cited.',
      lastContactedAt: new Date('2025-08-10'),
    },
  ];

  const contacts = await Promise.all(
    contactsData.map((data) =>
      prisma.contact.create({
        data: {
          ...data,
          userId: devUser!.id,
        },
      })
    )
  );

  console.log(`✅ Created ${contacts.length} contacts`);

  const interactionsData = [
    {
      contactId: contacts[0].id,
      type: 'MEETING' as const,
      date: new Date('2025-11-05'),
      notes: 'Product demo. Very positive feedback on analytics features.',
    },
    {
      contactId: contacts[0].id,
      type: 'EMAIL' as const,
      date: new Date('2025-11-01'),
      notes: 'Sent pricing proposal for enterprise tier.',
    },
    {
      contactId: contacts[1].id,
      type: 'CALL' as const,
      date: new Date('2025-11-06'),
      notes: 'Discovery call. Discussed startup needs and timeline.',
    },
    {
      contactId: contacts[2].id,
      type: 'EMAIL' as const,
      date: new Date('2025-11-01'),
      notes: 'Shared case studies on co-marketing success.',
    },
    {
      contactId: contacts[4].id,
      type: 'MEETING' as const,
      date: new Date('2025-11-07'),
      notes: 'Quarterly business review. Discussed expansion plans.',
    },
    {
      contactId: contacts[7].id,
      type: 'CALL' as const,
      date: new Date('2025-11-08'),
      notes: 'Urgent follow-up. Scheduled demo for Monday 10am.',
    },
    {
      contactId: contacts[8].id,
      type: 'EMAIL' as const,
      date: new Date('2025-11-04'),
      notes: 'Sent calendar invite for product walkthrough.',
    },
  ];

  const interactions = await Promise.all(
    interactionsData.map((data) =>
      prisma.interaction.create({
        data: {
          ...data,
          userId: devUser!.id,
        },
      })
    )
  );

  console.log(`✅ Created ${interactions.length} interactions`);

  const tasksData = [
    {
      contactId: contacts[0].id,
      title: 'Send contract for review',
      description:
        'Prepare and send enterprise contract to Alice for legal review.',
      status: 'TODO' as const,
      priority: 'HIGH' as const,
      dueDate: new Date('2025-11-12'),
    },
    {
      contactId: contacts[1].id,
      title: 'Schedule follow-up call',
      description: 'Check in on funding timeline and technical requirements.',
      status: 'TODO' as const,
      priority: 'URGENT' as const,
      dueDate: new Date('2025-11-10'),
    },
    {
      contactId: contacts[2].id,
      title: 'Prepare co-marketing proposal',
      description: 'Draft Q1 2026 co-marketing campaign ideas.',
      status: 'IN_PROGRESS' as const,
      priority: 'MEDIUM' as const,
      dueDate: new Date('2025-11-15'),
    },
    {
      contactId: contacts[4].id,
      title: 'Create expansion quote',
      description: 'Quote for 3 additional teams (30 users total).',
      status: 'TODO' as const,
      priority: 'HIGH' as const,
      dueDate: new Date('2025-11-11'),
    },
    {
      contactId: contacts[7].id,
      title: 'Prepare board demo',
      description:
        'Custom demo showcasing enterprise security and compliance features.',
      status: 'IN_PROGRESS' as const,
      priority: 'URGENT' as const,
      dueDate: new Date('2025-11-11'),
    },
    {
      contactId: contacts[8].id,
      title: 'Send product walkthrough materials',
      description: 'Pre-meeting materials and agenda for walkthrough.',
      status: 'DONE' as const,
      priority: 'MEDIUM' as const,
      dueDate: new Date('2025-11-05'),
    },
    {
      contactId: null,
      title: 'Update CRM documentation',
      description: 'Document new onboarding process for team.',
      status: 'TODO' as const,
      priority: 'LOW' as const,
      dueDate: new Date('2025-11-20'),
    },
    {
      contactId: null,
      title: 'Review quarterly metrics',
      description: 'Analyze Q4 pipeline and conversion rates.',
      status: 'TODO' as const,
      priority: 'MEDIUM' as const,
      dueDate: new Date('2025-11-14'),
    },
  ];

  const tasks = await Promise.all(
    tasksData.map((data) =>
      prisma.task.create({
        data: {
          ...data,
          userId: devUser!.id,
        },
      })
    )
  );

  console.log(`✅ Created ${tasks.length} tasks`);

  console.log('\n🎉 Seed data created successfully!');
  console.log(`📊 Summary:`);
  console.log(`   - User: ${devUser.email}`);
  console.log(`   - Contacts: ${contacts.length}`);
  console.log(`   - Interactions: ${interactions.length}`);
  console.log(`   - Tasks: ${tasks.length}`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
