import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...\n');

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

  console.log('📇 Creating contacts...');

  const contactsData = [
    {
      name: '김민준',
      email: 'minjun.kim@samsung.com',
      phone: '010-1234-5678',
      company: '삼성전자',
      position: 'CTO',
      status: 'ACTIVE' as const,
      priority: 'HIGH' as const,
      tags: ['대기업', 'IT', '의사결정권자'],
      notes: '엔터프라이즈 솔루션 도입 검토 중. 분기별 정기 미팅 진행.',
      lastContactedAt: new Date('2025-11-10'),
    },
    {
      name: '이서연',
      email: 'seoyeon@naver.com',
      phone: '010-2345-6789',
      company: '네이버',
      position: '서비스 개발 팀장',
      status: 'ACTIVE' as const,
      priority: 'HIGH' as const,
      tags: ['대기업', 'IT', 'B2B'],
      notes: '현재 고객. API 연동 확대 논의 중.',
      lastContactedAt: new Date('2025-11-08'),
    },
    {
      name: '박지호',
      email: 'jiho.park@kakao.com',
      phone: '010-3456-7890',
      company: '카카오',
      position: 'PM',
      status: 'ACTIVE' as const,
      priority: 'MEDIUM' as const,
      tags: ['대기업', 'IT', 'SaaS'],
      notes: '신규 프로젝트 협업 가능성 타진.',
      lastContactedAt: new Date('2025-11-05'),
    },
    {
      name: '최유나',
      email: 'yuna.choi@coupang.com',
      phone: '010-4567-8901',
      company: '쿠팡',
      position: '마케팅 이사',
      status: 'ACTIVE' as const,
      priority: 'MEDIUM' as const,
      tags: ['대기업', '이커머스', '마케팅'],
      notes: '공동 마케팅 캠페인 진행 중.',
      lastContactedAt: new Date('2025-11-07'),
    },
    {
      name: '정민서',
      email: 'minseo@baemin.com',
      phone: '010-5678-9012',
      company: '배달의민족',
      position: '사업개발 본부장',
      status: 'ACTIVE' as const,
      priority: 'HIGH' as const,
      tags: ['대기업', '푸드테크', 'Partnership'],
      notes: '전략적 파트너십 논의. 다음 주 임원 미팅 예정.',
      lastContactedAt: new Date('2025-11-11'),
    },
    {
      name: '강도윤',
      email: 'doyun@toss.im',
      phone: '010-6789-0123',
      company: '토스',
      position: 'VP of Product',
      status: 'ACTIVE' as const,
      priority: 'URGENT' as const,
      tags: ['핀테크', '대기업', '의사결정권자'],
      notes: '긴급: 이번 주 금요일까지 보안 감사 리포트 필요.',
      lastContactedAt: new Date('2025-11-12'),
    },
    {
      name: 'Sarah Kim',
      email: 'sarah.kim@lgcns.com',
      phone: '010-7890-1234',
      company: 'LG CNS',
      position: 'IT 솔루션 부장',
      status: 'ACTIVE' as const,
      priority: 'MEDIUM' as const,
      tags: ['대기업', 'SI', 'Enterprise'],
      notes: '대규모 SI 프로젝트 협력 검토 중.',
      lastContactedAt: new Date('2025-11-04'),
    },
    {
      name: '윤서준',
      email: 'seojun.yoon@hyundai.com',
      phone: '010-8901-2345',
      company: '현대자동차',
      position: 'DX팀 팀장',
      status: 'ACTIVE' as const,
      priority: 'HIGH' as const,
      tags: ['대기업', '제조', 'Digital Transformation'],
      notes: '디지털 전환 프로젝트 POC 진행 중.',
      lastContactedAt: new Date('2025-11-06'),
    },
    {
      name: '한지우',
      email: 'jiwoo@kurly.com',
      phone: '010-9012-3456',
      company: '마켓컬리',
      position: '운영 디렉터',
      status: 'ACTIVE' as const,
      priority: 'MEDIUM' as const,
      tags: ['스타트업', '이커머스', '운영'],
      notes: '운영 효율화를 위한 CRM 도입 검토.',
      lastContactedAt: new Date('2025-10-30'),
    },
    {
      name: 'James Lee',
      email: 'james@krafton.com',
      phone: '010-0123-4567',
      company: '크래프톤',
      position: 'Head of Operations',
      status: 'ACTIVE' as const,
      priority: 'LOW' as const,
      tags: ['게임', '대기업', '글로벌'],
      notes: '글로벌 팀 협업 도구 탐색 중.',
      lastContactedAt: new Date('2025-10-25'),
    },
    {
      name: '오하은',
      email: 'haeun@yogiyo.com',
      phone: '010-1111-2222',
      company: '요기요',
      position: '고객성공 매니저',
      status: 'ACTIVE' as const,
      priority: 'MEDIUM' as const,
      tags: ['푸드테크', '고객성공'],
      notes: 'CS 팀 확장에 따른 추가 라이선스 문의.',
      lastContactedAt: new Date('2025-11-09'),
    },
    {
      name: '임수아',
      email: 'sua@29cm.com',
      phone: '010-2222-3333',
      company: '29CM',
      position: 'Growth Lead',
      status: 'ACTIVE' as const,
      priority: 'MEDIUM' as const,
      tags: ['이커머스', '패션', 'Growth'],
      notes: '그로스 해킹을 위한 데이터 분석 기능 활용 중.',
      lastContactedAt: new Date('2025-11-01'),
    },

    {
      name: '신재현',
      email: 'jaehyun@startupx.kr',
      phone: '010-3333-4444',
      company: 'StartupX',
      position: 'Founder & CEO',
      status: 'LEAD' as const,
      priority: 'URGENT' as const,
      tags: ['스타트업', 'Seed 투자', 'Founder'],
      notes: '시드 투자 유치 직후. 빠른 의사결정 가능. 다음 주 데모 예정.',
      lastContactedAt: new Date('2025-11-11'),
    },
    {
      name: '조민영',
      email: 'minyoung@edtech.io',
      phone: '010-4444-5555',
      company: 'EduTech Korea',
      position: 'CPO',
      status: 'LEAD' as const,
      priority: 'HIGH' as const,
      tags: ['에듀테크', '스타트업', 'Series A'],
      notes: '교육 플랫폼용 CRM 필요. 경쟁사 비교 중.',
      lastContactedAt: new Date('2025-11-09'),
    },
    {
      name: '백승우',
      email: 'seungwoo@healthtech.kr',
      phone: '010-5555-6666',
      company: 'HealthTech Inc.',
      position: 'CTO',
      status: 'LEAD' as const,
      priority: 'HIGH' as const,
      tags: ['헬스케어', '스타트업', 'HIPAA'],
      notes: '보안 규제 준수 여부 확인 필요. 기술 검토 진행 중.',
      lastContactedAt: new Date('2025-11-07'),
    },
    {
      name: '송하윤',
      email: 'hayoon@proptech.com',
      phone: '010-6666-7777',
      company: 'PropTech Solutions',
      position: '영업 이사',
      status: 'LEAD' as const,
      priority: 'MEDIUM' as const,
      tags: ['프롭테크', '부동산', 'B2B'],
      notes: '부동산 중개 플랫폼 고객 관리용. 가격 협상 단계.',
      lastContactedAt: new Date('2025-11-05'),
    },
    {
      name: '노유진',
      email: 'yujin@fintech.kr',
      phone: '010-7777-8888',
      company: 'FinTech Ventures',
      position: 'Product Manager',
      status: 'LEAD' as const,
      priority: 'MEDIUM' as const,
      tags: ['핀테크', '금융', 'Compliance'],
      notes: '금융 규제 관련 기능 문의. 추가 정보 요청됨.',
      lastContactedAt: new Date('2025-11-03'),
    },
    {
      name: '류민호',
      email: 'minho@logistics.com',
      phone: '010-8888-9999',
      company: 'Smart Logistics',
      position: 'Operations Lead',
      status: 'LEAD' as const,
      priority: 'LOW' as const,
      tags: ['물류', 'B2B', 'Automation'],
      notes: '물류 파트너 관리용. 예산 확정 대기 중.',
      lastContactedAt: new Date('2025-10-28'),
    },
    {
      name: '홍지민',
      email: 'jimin@beautytech.kr',
      phone: '010-9999-0000',
      company: 'BeautyTech Co.',
      position: 'Marketing Director',
      status: 'LEAD' as const,
      priority: 'LOW' as const,
      tags: ['뷰티', '커머스', 'D2C'],
      notes: 'D2C 브랜드 고객 관리. 소규모 팀으로 시작 희망.',
      lastContactedAt: new Date('2025-10-22'),
    },
    {
      name: 'Michael Park',
      email: 'michael@globalvc.com',
      phone: '010-0000-1111',
      company: 'Global VC Partners',
      position: 'Investment Manager',
      status: 'LEAD' as const,
      priority: 'HIGH' as const,
      tags: ['투자', 'VC', '글로벌'],
      notes: '포트폴리오 기업들에게 추천 가능. 파트너십 논의.',
      lastContactedAt: new Date('2025-11-10'),
    },
    {
      name: '서지훈',
      email: 'jihoon@fashiontech.kr',
      phone: '010-1212-3434',
      company: 'Fashion Platform',
      position: 'Growth Hacker',
      status: 'LEAD' as const,
      priority: 'MEDIUM' as const,
      tags: ['패션', '커머스', 'Growth'],
      notes: '고객 리텐션 개선을 위한 도구 탐색.',
      lastContactedAt: new Date('2025-11-02'),
    },
    {
      name: '안서현',
      email: 'seohyun@traveltech.io',
      phone: '010-3434-5656',
      company: 'TravelTech Korea',
      position: 'Head of Sales',
      status: 'LEAD' as const,
      priority: 'MEDIUM' as const,
      tags: ['여행', 'B2C', 'SaaS'],
      notes: '여행사 네트워크 관리용. 트라이얼 요청.',
      lastContactedAt: new Date('2025-10-31'),
    },

    {
      name: '진우성',
      email: 'woosung@oldschool.com',
      phone: '010-5656-7878',
      company: 'OldSchool Corp.',
      position: 'IT Manager',
      status: 'INACTIVE' as const,
      priority: 'LOW' as const,
      tags: ['제조', 'Legacy'],
      notes: '프로젝트 중단. 2026년 Q2 재검토 예정.',
      lastContactedAt: new Date('2025-08-15'),
    },
    {
      name: '강예은',
      email: 'yeeun@pausedstartup.kr',
      phone: '010-7878-9090',
      company: 'Paused Startup',
      position: 'CEO',
      status: 'INACTIVE' as const,
      priority: 'LOW' as const,
      tags: ['스타트업', '자금부족'],
      notes: '자금 확보 후 재논의. 연락 대기 중.',
      lastContactedAt: new Date('2025-07-20'),
    },
    {
      name: '표준호',
      email: 'junho@seasonal.com',
      phone: '010-9090-1212',
      company: 'Seasonal Business',
      position: '사업부장',
      status: 'INACTIVE' as const,
      priority: 'MEDIUM' as const,
      tags: ['유통', '계절성'],
      notes: '계절 사업 특성상 비수기. 3월 재접촉 예정.',
      lastContactedAt: new Date('2025-09-10'),
    },
    {
      name: '나윤서',
      email: 'yunseo@restructuring.kr',
      phone: '010-1313-1414',
      company: 'Restructuring Inc.',
      position: 'CFO',
      status: 'INACTIVE' as const,
      priority: 'LOW' as const,
      tags: ['구조조정', '보류'],
      notes: '조직 구조조정 중. 안정화 후 재논의.',
      lastContactedAt: new Date('2025-06-30'),
    },
    {
      name: '문하준',
      email: 'hajun@pivoting.io',
      phone: '010-1515-1616',
      company: 'Pivoting Startup',
      position: 'Founder',
      status: 'INACTIVE' as const,
      priority: 'MEDIUM' as const,
      tags: ['스타트업', '피봇'],
      notes: '비즈니스 모델 피봇 중. 방향 확정 후 재검토.',
      lastContactedAt: new Date('2025-08-01'),
    },

    {
      name: '허준영',
      email: 'junyoung@competitor.com',
      phone: '010-1717-1818',
      company: 'Competitor User',
      position: 'IT Director',
      status: 'LOST' as const,
      priority: 'LOW' as const,
      tags: ['경쟁사선택', '대기업'],
      notes: '경쟁사 Salesforce 선택. 가격 이슈.',
      lastContactedAt: new Date('2025-05-10'),
    },
    {
      name: '고은지',
      email: 'eunji@budgetcut.kr',
      phone: '010-1919-2020',
      company: 'Budget Cut Inc.',
      position: 'Procurement',
      status: 'LOST' as const,
      priority: 'LOW' as const,
      tags: ['예산부족', 'SMB'],
      notes: '예산 삭감으로 도입 취소. ROI 입증 부족.',
      lastContactedAt: new Date('2025-04-25'),
    },
    {
      name: '양시우',
      email: 'siwoo@noresponse.com',
      phone: '010-2121-2222',
      company: 'No Response Co.',
      position: 'Manager',
      status: 'LOST' as const,
      priority: 'LOW' as const,
      tags: ['무응답'],
      notes: '5회 이상 연락 시도했으나 응답 없음. 관심 없는 것으로 판단.',
      lastContactedAt: new Date('2025-07-05'),
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

  console.log('💬 Creating interactions...');

  const interactionsData = [
    {
      contactId: contacts[5].id,
      type: 'CALL' as const,
      date: new Date('2025-11-13T10:30:00'),
      notes: '긴급 통화: 보안 감사 리포트 요구사항 확인. 금요일까지 전달 약속.',
    },
    {
      contactId: contacts[4].id,
      type: 'EMAIL' as const,
      date: new Date('2025-11-13T09:15:00'),
      notes: '임원 미팅 의제 전달. 전략적 파트너십 제안서 첨부.',
    },
    {
      contactId: contacts[12].id,
      type: 'EMAIL' as const,
      date: new Date('2025-11-13T14:00:00'),
      notes: '데모 일정 확정 이메일 발송. 다음 주 화요일 오후 3시.',
    },
    {
      contactId: contacts[0].id,
      type: 'NOTE' as const,
      date: new Date('2025-11-13T16:00:00'),
      notes: '내부 메모: 다음 분기 계약 갱신 준비 시작 필요.',
    },
    {
      contactId: contacts[19].id,
      type: 'MEETING' as const,
      date: new Date('2025-11-13T11:00:00'),
      notes: '파트너십 킥오프 미팅. 포트폴리오 3개 기업 소개 받음.',
    },

    {
      contactId: contacts[5].id,
      type: 'EMAIL' as const,
      date: new Date('2025-11-12T15:00:00'),
      notes: '보안 감사 체크리스트 전달.',
    },
    {
      contactId: contacts[10].id,
      type: 'CALL' as const,
      date: new Date('2025-11-12T14:00:00'),
      notes: '추가 라이선스 5개 견적 논의.',
    },
    {
      contactId: contacts[12].id,
      type: 'CALL' as const,
      date: new Date('2025-11-11T10:30:00'),
      notes: '제품 데모 사전 논의. 주요 요구사항 청취.',
    },
    {
      contactId: contacts[4].id,
      type: 'MEETING' as const,
      date: new Date('2025-11-11T14:00:00'),
      notes: '임원 미팅 준비 회의. 발표자료 방향 논의.',
    },
    {
      contactId: contacts[19].id,
      type: 'EMAIL' as const,
      date: new Date('2025-11-10T09:00:00'),
      notes: '포트폴리오 기업 리스트 요청.',
    },
    {
      contactId: contacts[0].id,
      type: 'MEETING' as const,
      date: new Date('2025-11-10T11:00:00'),
      notes: '분기별 정기 미팅. Q4 성과 리뷰 및 Q1 계획 논의.',
    },
    {
      contactId: contacts[13].id,
      type: 'EMAIL' as const,
      date: new Date('2025-11-09T16:30:00'),
      notes: '경쟁 분석 자료 및 차별화 포인트 정리해서 전달.',
    },
    {
      contactId: contacts[10].id,
      type: 'EMAIL' as const,
      date: new Date('2025-11-09T10:00:00'),
      notes: '라이선스 확장 문의 접수.',
    },
    {
      contactId: contacts[1].id,
      type: 'MEETING' as const,
      date: new Date('2025-11-08T15:00:00'),
      notes: 'API 연동 확대 기술 미팅. 새로운 엔드포인트 3개 논의.',
    },
    {
      contactId: contacts[14].id,
      type: 'CALL' as const,
      date: new Date('2025-11-07T13:00:00'),
      notes: 'HIPAA 준수 관련 보안 기능 설명. 추가 문서 요청받음.',
    },

    {
      contactId: contacts[3].id,
      type: 'MEETING' as const,
      date: new Date('2025-11-07T10:00:00'),
      notes: '공동 마케팅 캠페인 중간 점검. 성과 데이터 공유.',
    },
    {
      contactId: contacts[7].id,
      type: 'CALL' as const,
      date: new Date('2025-11-06T14:30:00'),
      notes: 'POC 진행 상황 체크. 추가 지원 요청사항 확인.',
    },
    {
      contactId: contacts[2].id,
      type: 'EMAIL' as const,
      date: new Date('2025-11-05T11:00:00'),
      notes: '신규 프로젝트 제안서 전달. 검토 후 피드백 요청.',
    },
    {
      contactId: contacts[15].id,
      type: 'CALL' as const,
      date: new Date('2025-11-05T16:00:00'),
      notes: '가격 협상. 20% 할인 조건으로 연간 계약 제시.',
    },
    {
      contactId: contacts[6].id,
      type: 'MEETING' as const,
      date: new Date('2025-11-04T13:00:00'),
      notes: 'SI 프로젝트 킥오프 미팅. 요구사항 정의 시작.',
    },

    {
      contactId: contacts[16].id,
      type: 'EMAIL' as const,
      date: new Date('2025-11-03T10:30:00'),
      notes: '금융 규제 대응 기능 상세 문서 전달.',
    },
    {
      contactId: contacts[20].id,
      type: 'CALL' as const,
      date: new Date('2025-11-02T15:00:00'),
      notes: '고객 리텐션 개선 사례 공유. 관심 표명.',
    },
    {
      contactId: contacts[11].id,
      type: 'EMAIL' as const,
      date: new Date('2025-11-01T09:00:00'),
      notes: '데이터 분석 대시보드 활용 팁 공유.',
    },
    {
      contactId: contacts[21].id,
      type: 'EMAIL' as const,
      date: new Date('2025-10-31T14:00:00'),
      notes: '트라이얼 계정 발급. 온보딩 가이드 전달.',
    },
    {
      contactId: contacts[8].id,
      type: 'MEETING' as const,
      date: new Date('2025-10-30T11:00:00'),
      notes: '운영 효율화 워크샵. CRM 도입 ROI 계산.',
    },

    {
      contactId: contacts[17].id,
      type: 'EMAIL' as const,
      date: new Date('2025-10-28T10:00:00'),
      notes: '물류 파트너 관리 유즈케이스 제안.',
    },
    {
      contactId: contacts[9].id,
      type: 'CALL' as const,
      date: new Date('2025-10-25T16:00:00'),
      notes: '글로벌 팀 협업 기능 시연. 다국어 지원 문의.',
    },
    {
      contactId: contacts[18].id,
      type: 'EMAIL' as const,
      date: new Date('2025-10-22T13:00:00'),
      notes: '소규모 팀용 스타터 플랜 안내.',
    },
    {
      contactId: contacts[0].id,
      type: 'EMAIL' as const,
      date: new Date('2025-10-20T09:30:00'),
      notes: '분기 미팅 일정 조율 및 의제 사전 공유.',
    },
    {
      contactId: contacts[1].id,
      type: 'CALL' as const,
      date: new Date('2025-10-18T14:00:00'),
      notes: 'API 연동 현황 체크인. 성능 이슈 논의.',
    },

    {
      contactId: contacts[2].id,
      type: 'MEETING' as const,
      date: new Date('2025-10-28T10:00:00'),
      notes: '협업 프로젝트 브레인스토밍 세션.',
    },
    {
      contactId: contacts[3].id,
      type: 'EMAIL' as const,
      date: new Date('2025-10-27T11:00:00'),
      notes: '캠페인 중간 보고서 전달.',
    },
    {
      contactId: contacts[4].id,
      type: 'CALL' as const,
      date: new Date('2025-10-25T15:30:00'),
      notes: '파트너십 초기 논의. 양사 시너지 탐색.',
    },
    {
      contactId: contacts[5].id,
      type: 'MEETING' as const,
      date: new Date('2025-10-24T14:00:00'),
      notes: '제품 온보딩 미팅. 핵심 기능 시연.',
    },
    {
      contactId: contacts[6].id,
      type: 'EMAIL' as const,
      date: new Date('2025-10-23T09:00:00'),
      notes: 'SI 프로젝트 제안 요청서(RFP) 접수.',
    },

    {
      contactId: contacts[7].id,
      type: 'MEETING' as const,
      date: new Date('2025-10-22T11:00:00'),
      notes: 'POC 킥오프 미팅. 범위 및 일정 확정.',
    },
    {
      contactId: contacts[12].id,
      type: 'EMAIL' as const,
      date: new Date('2025-10-21T16:00:00'),
      notes: '첫 인바운드 문의. 빠른 응답으로 관심 유지.',
    },
    {
      contactId: contacts[13].id,
      type: 'CALL' as const,
      date: new Date('2025-10-20T13:00:00'),
      notes: '에듀테크 특화 기능 소개. 관심도 높음.',
    },
    {
      contactId: contacts[14].id,
      type: 'EMAIL' as const,
      date: new Date('2025-10-19T10:00:00'),
      notes: '헬스케어 규제 준수 가이드 전달.',
    },
    {
      contactId: contacts[15].id,
      type: 'MEETING' as const,
      date: new Date('2025-10-18T15:00:00'),
      notes: '부동산 플랫폼 데모. 커스터마이징 요구사항 청취.',
    },

    {
      contactId: contacts[0].id,
      type: 'CALL' as const,
      date: new Date('2025-10-15T14:00:00'),
      notes: '정기 체크인. 사용 중 불편사항 확인.',
    },
    {
      contactId: contacts[1].id,
      type: 'EMAIL' as const,
      date: new Date('2025-10-14T09:30:00'),
      notes: 'API 연동 확대 제안서 발송.',
    },
    {
      contactId: contacts[8].id,
      type: 'CALL' as const,
      date: new Date('2025-10-12T11:00:00'),
      notes: '첫 상담 통화. 니즈 파악 및 관계 형성.',
    },
    {
      contactId: contacts[16].id,
      type: 'EMAIL' as const,
      date: new Date('2025-10-10T15:00:00'),
      notes: '핀테크 업계 레퍼런스 케이스 공유.',
    },
    {
      contactId: contacts[19].id,
      type: 'CALL' as const,
      date: new Date('2025-10-08T16:00:00'),
      notes: '네트워킹 이벤트에서 만남. 팔로업 통화.',
    },

    {
      contactId: contacts[9].id,
      type: 'EMAIL' as const,
      date: new Date('2025-10-05T10:00:00'),
      notes: '글로벌 협업 도구 소개 자료 전달.',
    },
    {
      contactId: contacts[10].id,
      type: 'MEETING' as const,
      date: new Date('2025-10-03T14:00:00'),
      notes: '고객성공팀 온보딩 미팅.',
    },
    {
      contactId: contacts[11].id,
      type: 'CALL' as const,
      date: new Date('2025-10-01T11:30:00'),
      notes: '그로스 해킹 유즈케이스 논의.',
    },
    {
      contactId: contacts[2].id,
      type: 'EMAIL' as const,
      date: new Date('2025-09-28T09:00:00'),
      notes: '첫 컨택 이메일. 간단한 소개 및 미팅 제안.',
    },
    {
      contactId: contacts[20].id,
      type: 'NOTE' as const,
      date: new Date('2025-09-25T16:00:00'),
      notes: 'LinkedIn 메시지 교환. 관심 표명.',
    },

    {
      contactId: contacts[0].id,
      type: 'MEETING' as const,
      date: new Date('2025-09-15T10:00:00'),
      notes: 'Q3 분기 리뷰 미팅. 만족도 높음.',
    },
    {
      contactId: contacts[0].id,
      type: 'EMAIL' as const,
      date: new Date('2025-09-01T14:00:00'),
      notes: 'Q3 미팅 일정 조율.',
    },
    {
      contactId: contacts[1].id,
      type: 'CALL' as const,
      date: new Date('2025-09-20T11:00:00'),
      notes: '정기 체크인 통화. 신규 기능 소개.',
    },
    {
      contactId: contacts[1].id,
      type: 'EMAIL' as const,
      date: new Date('2025-09-05T09:00:00'),
      notes: '월간 뉴스레터 발송.',
    },
    {
      contactId: contacts[3].id,
      type: 'MEETING' as const,
      date: new Date('2025-09-18T15:00:00'),
      notes: '공동 마케팅 캠페인 킥오프.',
    },

    {
      contactId: contacts[3].id,
      type: 'CALL' as const,
      date: new Date('2025-09-10T10:30:00'),
      notes: '캠페인 초기 논의.',
    },
    {
      contactId: contacts[4].id,
      type: 'EMAIL' as const,
      date: new Date('2025-09-12T13:00:00'),
      notes: '파트너십 가능성 탐색 이메일.',
    },
    {
      contactId: contacts[5].id,
      type: 'MEETING' as const,
      date: new Date('2025-09-08T14:00:00'),
      notes: '첫 미팅. 제품 전반적인 소개.',
    },
    {
      contactId: contacts[5].id,
      type: 'EMAIL' as const,
      date: new Date('2025-09-02T10:00:00'),
      notes: '인바운드 리드. 빠른 응대.',
    },
    {
      contactId: contacts[7].id,
      type: 'CALL' as const,
      date: new Date('2025-09-25T11:00:00'),
      notes: 'DX 프로젝트 초기 상담.',
    },

    {
      contactId: contacts[7].id,
      type: 'EMAIL' as const,
      date: new Date('2025-09-15T09:30:00'),
      notes: '제조업 특화 솔루션 소개.',
    },
    {
      contactId: contacts[6].id,
      type: 'MEETING' as const,
      date: new Date('2025-09-22T10:00:00'),
      notes: '첫 미팅. SI 파트너십 가능성 논의.',
    },
    {
      contactId: contacts[8].id,
      type: 'EMAIL' as const,
      date: new Date('2025-09-17T14:00:00'),
      notes: '이커머스 CRM 베스트 프랙티스 공유.',
    },
    {
      contactId: contacts[9].id,
      type: 'NOTE' as const,
      date: new Date('2025-09-10T16:00:00'),
      notes: '컨퍼런스에서 명함 교환.',
    },
    {
      contactId: contacts[10].id,
      type: 'EMAIL' as const,
      date: new Date('2025-09-05T11:00:00'),
      notes: '고객성공팀 확장 관련 문의 접수.',
    },

    {
      contactId: contacts[11].id,
      type: 'CALL' as const,
      date: new Date('2025-09-03T15:00:00'),
      notes: '그로스 리드와 첫 통화.',
    },
    {
      contactId: contacts[13].id,
      type: 'EMAIL' as const,
      date: new Date('2025-09-28T10:00:00'),
      notes: '에듀테크 시장 트렌드 리포트 공유.',
    },
    {
      contactId: contacts[14].id,
      type: 'CALL' as const,
      date: new Date('2025-09-20T14:00:00'),
      notes: '헬스케어 CRM 니즈 파악.',
    },
    {
      contactId: contacts[15].id,
      type: 'EMAIL' as const,
      date: new Date('2025-09-14T09:00:00'),
      notes: '부동산 플랫폼 사례 연구 전달.',
    },
    {
      contactId: contacts[17].id,
      type: 'CALL' as const,
      date: new Date('2025-09-08T11:30:00'),
      notes: '물류 업계 첫 상담.',
    },

    {
      contactId: contacts[18].id,
      type: 'EMAIL' as const,
      date: new Date('2025-09-02T15:00:00'),
      notes: 'D2C 브랜드용 CRM 소개.',
    },
    {
      contactId: contacts[21].id,
      type: 'CALL' as const,
      date: new Date('2025-09-25T10:00:00'),
      notes: '여행 플랫폼 니즈 청취.',
    },
    {
      contactId: contacts[16].id,
      type: 'EMAIL' as const,
      date: new Date('2025-09-18T13:00:00'),
      notes: '금융권 컴플라이언스 자료 공유.',
    },
    {
      contactId: contacts[20].id,
      type: 'CALL' as const,
      date: new Date('2025-09-11T16:00:00'),
      notes: '패션 커머스 CRM 유즈케이스 논의.',
    },
    {
      contactId: contacts[19].id,
      type: 'EMAIL' as const,
      date: new Date('2025-09-04T10:00:00'),
      notes: 'VC 파트너십 제안 이메일.',
    },

    {
      contactId: contacts[0].id,
      type: 'MEETING' as const,
      date: new Date('2025-08-10T10:00:00'),
      notes: 'Q2 분기 리뷰.',
    },
    {
      contactId: contacts[0].id,
      type: 'EMAIL' as const,
      date: new Date('2025-07-15T14:00:00'),
      notes: '계약 갱신 완료.',
    },
    {
      contactId: contacts[0].id,
      type: 'MEETING' as const,
      date: new Date('2025-06-05T11:00:00'),
      notes: 'Q1 분기 리뷰. 우수 성과.',
    },
    {
      contactId: contacts[1].id,
      type: 'CALL' as const,
      date: new Date('2025-08-20T15:00:00'),
      notes: 'API 연동 초기 논의.',
    },

    {
      contactId: contacts[1].id,
      type: 'MEETING' as const,
      date: new Date('2025-07-10T10:00:00'),
      notes: '계약 체결 미팅.',
    },
    {
      contactId: contacts[1].id,
      type: 'EMAIL' as const,
      date: new Date('2025-06-25T09:00:00'),
      notes: '제안서 전달 및 논의.',
    },
    {
      contactId: contacts[22].id,
      type: 'CALL' as const,
      date: new Date('2025-08-15T14:00:00'),
      notes: '프로젝트 일시 중단 통보 받음.',
    },
    {
      contactId: contacts[23].id,
      type: 'EMAIL' as const,
      date: new Date('2025-07-20T11:00:00'),
      notes: '자금 이슈로 보류. 추후 재논의.',
    },
    {
      contactId: contacts[24].id,
      type: 'MEETING' as const,
      date: new Date('2025-09-10T15:00:00'),
      notes: '비수기 진입. 성수기 재접촉 약속.',
    },
    {
      contactId: contacts[25].id,
      type: 'CALL' as const,
      date: new Date('2025-06-30T10:00:00'),
      notes: '구조조정 소식 전달받음.',
    },

    {
      contactId: contacts[26].id,
      type: 'EMAIL' as const,
      date: new Date('2025-08-01T13:00:00'),
      notes: '피봇 진행 중. 방향 확정 후 연락 약속.',
    },
    {
      contactId: contacts[27].id,
      type: 'MEETING' as const,
      date: new Date('2025-05-10T11:00:00'),
      notes: '최종 미팅. 가격 이슈로 경쟁사 선택.',
    },
    {
      contactId: contacts[28].id,
      type: 'EMAIL' as const,
      date: new Date('2025-04-25T09:00:00'),
      notes: '예산 부족으로 도입 취소 통보.',
    },
    {
      contactId: contacts[29].id,
      type: 'EMAIL' as const,
      date: new Date('2025-07-05T15:00:00'),
      notes: '5차 팔로업 이메일. 응답 없음.',
    },
    {
      contactId: contacts[29].id,
      type: 'CALL' as const,
      date: new Date('2025-06-20T10:00:00'),
      notes: '전화 시도. 부재중.',
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

  console.log('✅ Creating tasks...');

  const tasksData = [
    {
      contactId: contacts[27].id,
      title: '이탈 고객 사후 분석',
      description: '경쟁사 선택 이유 분석 및 개선점 도출.',
      status: 'TODO' as const,
      priority: 'LOW' as const,
      dueDate: new Date('2025-11-05'),
    },
    {
      contactId: contacts[22].id,
      title: '2026 Q2 재접촉 준비',
      description: '프로젝트 재개 시 제안할 업데이트 정리.',
      status: 'TODO' as const,
      priority: 'LOW' as const,
      dueDate: new Date('2025-11-08'),
    },
    {
      contactId: contacts[17].id,
      title: '예산 확정 팔로업',
      description: '물류 파트너 관리 예산 확정 여부 확인.',
      status: 'IN_PROGRESS' as const,
      priority: 'MEDIUM' as const,
      dueDate: new Date('2025-11-10'),
    },
    {
      contactId: null,
      title: '경쟁사 분석 리포트 업데이트',
      description: 'Salesforce, HubSpot 최신 기능 비교 분석.',
      status: 'TODO' as const,
      priority: 'MEDIUM' as const,
      dueDate: new Date('2025-11-07'),
    },
    {
      contactId: contacts[18].id,
      title: '스타터 플랜 온보딩 자료 전달',
      description: '소규모 팀용 온보딩 가이드 커스터마이징.',
      status: 'IN_PROGRESS' as const,
      priority: 'LOW' as const,
      dueDate: new Date('2025-11-09'),
    },

    {
      contactId: contacts[5].id,
      title: '보안 감사 리포트 전달',
      description: '보안 감사 체크리스트 및 인증서 패키지 준비.',
      status: 'IN_PROGRESS' as const,
      priority: 'URGENT' as const,
      dueDate: new Date('2025-11-13'),
    },
    {
      contactId: contacts[12].id,
      title: '데모 프레젠테이션 최종 점검',
      description: '다음 주 화요일 데모 자료 최종 리뷰.',
      status: 'IN_PROGRESS' as const,
      priority: 'HIGH' as const,
      dueDate: new Date('2025-11-13'),
    },
    {
      contactId: null,
      title: '주간 파이프라인 리포트 작성',
      description: '이번 주 영업 활동 요약 및 다음 주 계획.',
      status: 'TODO' as const,
      priority: 'MEDIUM' as const,
      dueDate: new Date('2025-11-13'),
    },

    {
      contactId: contacts[0].id,
      title: 'Q1 계약 갱신 제안서 준비',
      description: '분기 미팅 결과 반영한 갱신 제안서 작성.',
      status: 'TODO' as const,
      priority: 'HIGH' as const,
      dueDate: new Date('2025-11-15'),
    },
    {
      contactId: contacts[4].id,
      title: '임원 미팅 프레젠테이션',
      description: '전략적 파트너십 제안 최종 발표 준비.',
      status: 'IN_PROGRESS' as const,
      priority: 'URGENT' as const,
      dueDate: new Date('2025-11-14'),
    },
    {
      contactId: contacts[1].id,
      title: 'API 연동 확대 기술 문서 작성',
      description: '새로운 엔드포인트 3개 연동 가이드.',
      status: 'IN_PROGRESS' as const,
      priority: 'HIGH' as const,
      dueDate: new Date('2025-11-16'),
    },
    {
      contactId: contacts[10].id,
      title: '추가 라이선스 견적서 발송',
      description: '5개 라이선스 견적 및 온보딩 일정 제안.',
      status: 'TODO' as const,
      priority: 'MEDIUM' as const,
      dueDate: new Date('2025-11-14'),
    },
    {
      contactId: contacts[13].id,
      title: '경쟁사 비교 후속 미팅',
      description: '차별화 포인트 강조한 2차 미팅 준비.',
      status: 'TODO' as const,
      priority: 'HIGH' as const,
      dueDate: new Date('2025-11-17'),
    },

    {
      contactId: contacts[14].id,
      title: 'HIPAA 준수 추가 문서 전달',
      description: '보안 인증서 및 규제 대응 가이드.',
      status: 'TODO' as const,
      priority: 'HIGH' as const,
      dueDate: new Date('2025-11-15'),
    },
    {
      contactId: contacts[19].id,
      title: '포트폴리오 3개 기업 소개 미팅',
      description: 'VC 포트폴리오 기업들과 연결 미팅 준비.',
      status: 'TODO' as const,
      priority: 'HIGH' as const,
      dueDate: new Date('2025-11-18'),
    },
    {
      contactId: contacts[3].id,
      title: '캠페인 성과 최종 리포트',
      description: '공동 마케팅 캠페인 ROI 분석 리포트.',
      status: 'IN_PROGRESS' as const,
      priority: 'MEDIUM' as const,
      dueDate: new Date('2025-11-19'),
    },
    {
      contactId: contacts[21].id,
      title: '트라이얼 체크인 미팅',
      description: '트라이얼 사용 경험 청취 및 질문 응답.',
      status: 'TODO' as const,
      priority: 'MEDIUM' as const,
      dueDate: new Date('2025-11-16'),
    },
    {
      contactId: null,
      title: '신규 기능 릴리스 노트 작성',
      description: '11월 업데이트 고객 공지 자료 준비.',
      status: 'TODO' as const,
      priority: 'LOW' as const,
      dueDate: new Date('2025-11-20'),
    },

    {
      contactId: contacts[12].id,
      title: '데모 후속 계약 논의',
      description: '데모 피드백 반영한 맞춤 제안서 작성.',
      status: 'TODO' as const,
      priority: 'URGENT' as const,
      dueDate: new Date('2025-11-22'),
    },
    {
      contactId: contacts[7].id,
      title: 'POC 중간 점검 미팅',
      description: 'DX 프로젝트 진행 상황 및 이슈 점검.',
      status: 'TODO' as const,
      priority: 'HIGH' as const,
      dueDate: new Date('2025-11-25'),
    },
    {
      contactId: contacts[6].id,
      title: 'SI 프로젝트 요구사항 정의서',
      description: 'RFP 기반 상세 요구사항 문서 작성.',
      status: 'IN_PROGRESS' as const,
      priority: 'HIGH' as const,
      dueDate: new Date('2025-11-28'),
    },
    {
      contactId: contacts[2].id,
      title: '협업 프로젝트 제안서 피드백',
      description: '제안서 검토 결과 청취 및 수정안 작성.',
      status: 'TODO' as const,
      priority: 'MEDIUM' as const,
      dueDate: new Date('2025-11-23'),
    },
    {
      contactId: contacts[15].id,
      title: '가격 협상 최종 계약서',
      description: '20% 할인 적용한 연간 계약서 전달.',
      status: 'TODO' as const,
      priority: 'HIGH' as const,
      dueDate: new Date('2025-11-21'),
    },

    {
      contactId: contacts[16].id,
      title: '금융 규제 기능 추가 상담',
      description: '규제 대응 커스터마이징 범위 논의.',
      status: 'TODO' as const,
      priority: 'MEDIUM' as const,
      dueDate: new Date('2025-11-26'),
    },
    {
      contactId: contacts[8].id,
      title: 'ROI 계산서 및 도입 제안',
      description: '운영 효율화 ROI 계산 결과 전달.',
      status: 'TODO' as const,
      priority: 'MEDIUM' as const,
      dueDate: new Date('2025-11-29'),
    },
    {
      contactId: contacts[20].id,
      title: '리텐션 개선 유즈케이스 자료',
      description: '패션 커머스 사례 연구 커스터마이징.',
      status: 'TODO' as const,
      priority: 'MEDIUM' as const,
      dueDate: new Date('2025-11-24'),
    },
    {
      contactId: contacts[11].id,
      title: '데이터 분석 워크샵',
      description: '그로스 해킹을 위한 대시보드 활용법 세션.',
      status: 'TODO' as const,
      priority: 'LOW' as const,
      dueDate: new Date('2025-11-30'),
    },
    {
      contactId: contacts[9].id,
      title: '다국어 지원 로드맵 공유',
      description: '글로벌 팀 협업 기능 개발 일정 전달.',
      status: 'TODO' as const,
      priority: 'LOW' as const,
      dueDate: new Date('2025-12-05'),
    },

    {
      contactId: null,
      title: '연말 고객 만족도 서베이',
      description: '2025 고객 피드백 수집 및 분석.',
      status: 'TODO' as const,
      priority: 'MEDIUM' as const,
      dueDate: new Date('2025-12-10'),
    },
    {
      contactId: null,
      title: 'Q4 영업 성과 리포트',
      description: '4분기 파이프라인 및 전환율 분석.',
      status: 'TODO' as const,
      priority: 'HIGH' as const,
      dueDate: new Date('2025-12-13'),
    },
    {
      contactId: contacts[5].id,
      title: '보안 감사 후속 미팅',
      description: '제출한 리포트 기반 추가 논의.',
      status: 'TODO' as const,
      priority: 'MEDIUM' as const,
      dueDate: new Date('2025-11-27'),
    },
    {
      contactId: contacts[0].id,
      title: '엔터프라이즈 신규 기능 소개',
      description: '12월 릴리스 엔터프라이즈 기능 사전 공유.',
      status: 'TODO' as const,
      priority: 'LOW' as const,
      dueDate: new Date('2025-12-01'),
    },
    {
      contactId: contacts[1].id,
      title: 'API 성능 최적화 검토',
      description: '연동 성능 이슈 해결 방안 논의.',
      status: 'TODO' as const,
      priority: 'MEDIUM' as const,
      dueDate: new Date('2025-12-03'),
    },

    {
      contactId: contacts[24].id,
      title: '성수기 재접촉 준비',
      description: '계절 사업 성수기(3월) 재접촉 캠페인 기획.',
      status: 'TODO' as const,
      priority: 'LOW' as const,
      dueDate: new Date('2026-02-28'),
    },
    {
      contactId: contacts[22].id,
      title: 'Q2 프로젝트 재개 제안',
      description: '2026 Q2 재검토 약속. 신규 기능 중심 제안서.',
      status: 'TODO' as const,
      priority: 'LOW' as const,
      dueDate: new Date('2026-03-31'),
    },
    {
      contactId: contacts[26].id,
      title: '피봇 후 재논의',
      description: '비즈니스 모델 피봇 완료 시 재접촉.',
      status: 'TODO' as const,
      priority: 'LOW' as const,
      dueDate: new Date('2026-01-31'),
    },
    {
      contactId: null,
      title: '2026 영업 전략 수립',
      description: '2025 성과 분석 기반 2026 목표 설정.',
      status: 'TODO' as const,
      priority: 'HIGH' as const,
      dueDate: new Date('2025-12-20'),
    },
    {
      contactId: null,
      title: '신규 산업 타겟 리서치',
      description: '미개척 산업군(제조, 물류) 시장 조사.',
      status: 'TODO' as const,
      priority: 'MEDIUM' as const,
      dueDate: new Date('2025-12-31'),
    },

    {
      contactId: contacts[7].id,
      title: 'POC 최종 결과 보고',
      description: 'DX 프로젝트 POC 완료 후 임원 보고.',
      status: 'TODO' as const,
      priority: 'HIGH' as const,
      dueDate: new Date('2025-12-15'),
    },
    {
      contactId: contacts[6].id,
      title: 'SI 프로젝트 제안 프레젠테이션',
      description: 'RFP 대응 최종 제안 발표.',
      status: 'TODO' as const,
      priority: 'HIGH' as const,
      dueDate: new Date('2025-12-18'),
    },

    {
      contactId: contacts[19].id,
      type: 'DONE' as const,
      title: '파트너십 킥오프 미팅 준비',
      description: 'VC 파트너십 첫 미팅 자료 준비.',
      status: 'DONE' as const,
      priority: 'HIGH' as const,
      dueDate: new Date('2025-11-12'),
    },
    {
      contactId: contacts[21].id,
      title: '트라이얼 계정 발급 완료',
      description: '온보딩 가이드와 함께 계정 전달.',
      status: 'DONE' as const,
      priority: 'MEDIUM' as const,
      dueDate: new Date('2025-10-30'),
    },
    {
      contactId: contacts[3].id,
      title: '공동 마케팅 캠페인 론칭',
      description: '캠페인 시작 및 초기 모니터링 완료.',
      status: 'DONE' as const,
      priority: 'HIGH' as const,
      dueDate: new Date('2025-10-01'),
    },
    {
      contactId: contacts[5].id,
      title: '제품 온보딩 완료',
      description: '토스팀 온보딩 세션 및 초기 설정 완료.',
      status: 'DONE' as const,
      priority: 'HIGH' as const,
      dueDate: new Date('2025-10-25'),
    },
    {
      contactId: contacts[10].id,
      title: '고객성공팀 온보딩',
      description: 'CS팀 CRM 교육 세션 완료.',
      status: 'DONE' as const,
      priority: 'MEDIUM' as const,
      dueDate: new Date('2025-10-05'),
    },

    {
      contactId: contacts[0].id,
      title: 'Q3 분기 리뷰 완료',
      description: '분기별 비즈니스 리뷰 미팅 성공적 완료.',
      status: 'DONE' as const,
      priority: 'MEDIUM' as const,
      dueDate: new Date('2025-09-15'),
    },
    {
      contactId: contacts[1].id,
      title: '계약 체결 완료',
      description: '네이버 연간 계약 서명 완료.',
      status: 'DONE' as const,
      priority: 'HIGH' as const,
      dueDate: new Date('2025-07-15'),
    },
    {
      contactId: null,
      title: '10월 월간 뉴스레터 발송',
      description: '전체 고객 대상 월간 업데이트 발송.',
      status: 'DONE' as const,
      priority: 'LOW' as const,
      dueDate: new Date('2025-10-31'),
    },
    {
      contactId: contacts[13].id,
      title: '에듀테크 특화 자료 전달',
      description: '교육 플랫폼 사례 연구 및 기능 소개.',
      status: 'DONE' as const,
      priority: 'MEDIUM' as const,
      dueDate: new Date('2025-10-21'),
    },
    {
      contactId: contacts[7].id,
      title: 'POC 킥오프 미팅',
      description: 'DX 프로젝트 POC 범위 및 일정 확정.',
      status: 'DONE' as const,
      priority: 'HIGH' as const,
      dueDate: new Date('2025-10-22'),
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

  console.log('\n🎉 Seed data created successfully!\n');
  console.log('📊 Summary:');
  console.log(`   👤 User: ${devUser.email}`);
  console.log(`   📇 Contacts: ${contacts.length}`);
  console.log(
    `      ├─ ACTIVE: ${contacts.filter((c) => c.status === 'ACTIVE').length}`
  );
  console.log(
    `      ├─ LEAD: ${contacts.filter((c) => c.status === 'LEAD').length}`
  );
  console.log(
    `      ├─ INACTIVE: ${contacts.filter((c) => c.status === 'INACTIVE').length}`
  );
  console.log(
    `      └─ LOST: ${contacts.filter((c) => c.status === 'LOST').length}`
  );
  console.log(`   💬 Interactions: ${interactions.length}`);
  console.log(
    `      ├─ EMAIL: ${interactions.filter((i) => i.type === 'EMAIL').length}`
  );
  console.log(
    `      ├─ CALL: ${interactions.filter((i) => i.type === 'CALL').length}`
  );
  console.log(
    `      ├─ MEETING: ${interactions.filter((i) => i.type === 'MEETING').length}`
  );
  console.log(
    `      └─ NOTE: ${interactions.filter((i) => i.type === 'NOTE').length}`
  );
  console.log(`   ✅ Tasks: ${tasks.length}`);
  console.log(
    `      ├─ TODO: ${tasks.filter((t) => t.status === 'TODO').length}`
  );
  console.log(
    `      ├─ IN_PROGRESS: ${tasks.filter((t) => t.status === 'IN_PROGRESS').length}`
  );
  console.log(
    `      └─ DONE: ${tasks.filter((t) => t.status === 'DONE').length}`
  );
  console.log('');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
