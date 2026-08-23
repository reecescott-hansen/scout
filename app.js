/* =====================================================
   Scout — app.js  v3
   Offline-first · 79 real opportunities · Local match
   ===================================================== */

const KEY_PROFILE   = 'scout_profile';
const KEY_SAVED     = 'scout_saved';
const KEY_ANTHROPIC_KEY = 'scout_anthropic_key';

// ══════════════════════════════════════════════════════
// SUPABASE  (friends, activity feed, in-app sharing)
// ══════════════════════════════════════════════════════

const SUPABASE_URL      = 'https://eboxnccwbatdztdqdgwl.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_g8qIR-WMDBdP0gClGQR_3w_6PA69eQ8';
const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const ADMIN_EMAIL = 'reecemsh@gmail.com';
function isAdmin() {
  return !!(currentUser && currentUser.email === ADMIN_EMAIL);
}

// ══════════════════════════════════════════════════════
// OPPORTUNITY DATABASE  (79 entries)
// ══════════════════════════════════════════════════════

const OPPORTUNITIES = [

  // ────────────── SCHOLARSHIPS ──────────────────────

  { id:'gates-scholarship', name:'Gates Scholarship', organization:'Bill & Melinda Gates Foundation',
    type:'scholarship', awardValue:60000,
    description:'One of the most prestigious college scholarships in the US, providing full cost-of-attendance funding for outstanding minority students who have demonstrated exceptional leadership and community involvement.',
    eligibility:'High school senior entering a US accredited college or university. Must be Pell Grant eligible, have a cumulative GPA of 3.3+, and be African American, American Indian/Alaska Native, Asian & Pacific Islander American, or Hispanic American.',
    award:'Full cost of attendance (all 4 years)', deadline:'Sep 15, 2026', deadlineDate:'2026-09-15',
    tips:'Start your application months early — it requires multiple detailed essays, three recommendation letters, and a community service record. Focus on leadership impact and future goals. Less than 1% of applicants are selected.',
    url:'https://thegatesscholarship.org',
    grades:['12th Grade'], minGPA:3.3,
    interests:['STEM','Arts','Business','Medicine','Engineering','Computer Science','Environment','Social Justice','Writing','Math','Research'], featured:true },

  { id:'coca-cola-scholars', name:'Coca-Cola Scholars Program', organization:'Coca-Cola Scholars Foundation',
    type:'scholarship', awardValue:20000,
    description:'A merit-based scholarship program that identifies and empowers young leaders who are making a significant impact in their school and community, and shows a commitment to service.',
    eligibility:'High school senior attending a US secondary school. US citizen, US national, or US permanent resident. Based on leadership and service, not financial need.',
    award:'$20,000', deadline:'Oct 31, 2026', deadlineDate:'2026-10-31',
    tips:'The application emphasizes character and leadership above grades. Describe specific moments where you influenced others or created change. Be authentic — they can spot generic leadership essays.',
    url:'https://coca-colascholarsfoundation.org/our-program/scholars/',
    grades:['12th Grade'], minGPA:3.0,
    interests:['STEM','Arts','Business','Medicine','Engineering','Social Justice','Writing'], featured:true },

  { id:'questbridge-ncm', name:'QuestBridge National College Match', organization:'QuestBridge',
    type:'scholarship', awardValue:80000,
    description:'Links high-achieving students from low-income backgrounds with top colleges and universities. The College Match provides full four-year scholarships to partner institutions including Yale, Stanford, MIT, and 40+ others.',
    eligibility:'Current high school senior, exceptional academic achievement, household income typically under $65,000. Open to all races and backgrounds.',
    award:'Full 4-year scholarship at partner colleges', deadline:'Sep 26, 2026', deadlineDate:'2026-09-26',
    tips:'Apply as a College Prep Scholar first (open to 9th–11th graders). For the National College Match, be specific about the professors and programs at each college you rank. Financial honesty is important — provide accurate household income info.',
    url:'https://questbridge.org',
    grades:['12th Grade'], minGPA:3.5,
    interests:['STEM','Arts','Business','Medicine','Engineering','Computer Science','Environment','Social Justice','Writing','Math','Research'], featured:false },

  { id:'jack-kent-cooke', name:'Jack Kent Cooke College Scholarship', organization:'Jack Kent Cooke Foundation',
    type:'scholarship', awardValue:55000,
    description:'One of the most generous college scholarships in the US for high-achieving students with financial need. Provides up to $55,000 per year to cover education costs at selective colleges and universities.',
    eligibility:'High school senior, exceptional academic ability, financial need (family income typically under $95,000), strong extracurricular record.',
    award:'Up to $55,000/year', deadline:'Sep 25, 2026', deadlineDate:'2026-09-25',
    tips:'This scholarship weights academic achievement AND financial need equally. Have teachers who know you well write recommendations. Be specific about how you\'ll use this opportunity, not just that you need money.',
    url:'https://jkcf.org',
    grades:['12th Grade'], minGPA:3.5,
    interests:['STEM','Arts','Business','Medicine','Engineering','Computer Science','Environment','Social Justice','Writing','Math','Research'], featured:false },

  { id:'national-merit', name:'National Merit Scholarship Program', organization:'National Merit Scholarship Corporation',
    type:'scholarship', awardValue:2500,
    description:'A highly competitive academic scholarship based on PSAT/NMSQT scores taken in 11th grade. Recognizes academically talented high school students with National Merit recognition and corporate sponsorships.',
    eligibility:'Must take PSAT/NMSQT in 11th grade at a US school. US citizen or intend to become a citizen. Academic rigor in coursework.',
    award:'Up to $2,500 + corporate/college-sponsored awards ($10,000+)', deadline:'Oct 2026 (PSAT)', deadlineDate:null,
    tips:'The PSAT is your entry point — take practice PSATs in 9th and 10th grade. The selection index varies by state; typically need to score in the top 1% in your state. Semifinalists write an essay and get a teacher recommendation.',
    url:'https://nationalmerit.org',
    grades:['11th Grade'], minGPA:0,
    interests:['STEM','Arts','Business','Medicine','Engineering','Computer Science','Social Justice','Writing','Math','Research'], featured:false },

  { id:'davidson-fellows', name:'Davidson Fellows Scholarship', organization:'Davidson Institute',
    type:'scholarship', awardValue:50000,
    description:'Extraordinary scholarships for students who have completed significant work in science, technology, engineering, mathematics, literature, music, or philosophy.',
    eligibility:'Under 18 years old, US citizen or permanent resident. Must submit a significant piece of work — a research paper, piece of music, literary work, etc. that makes a real contribution.',
    award:'$10,000, $25,000, or $50,000', deadline:'Feb 15, 2027', deadlineDate:'2027-02-15',
    tips:'This is for students with genuinely exceptional, original work — not just good grades. Your submission should be publication-worthy. Work with a mentor (professor, professional) to elevate the quality.',
    url:'https://davidsongifted.org',
    grades:['9th Grade','10th Grade','11th Grade','12th Grade'], minGPA:0,
    interests:['STEM','Math','Research','Arts','Writing','Engineering','Computer Science'], featured:false },

  { id:'elks-mvs', name:'Elks Most Valuable Student Award', organization:'Elks National Foundation',
    type:'scholarship', awardValue:50000,
    description:'A highly competitive scholarship for high school seniors who demonstrate leadership skills and financial need, and who excel academically. Awarded based on scholarship, leadership, and financial need.',
    eligibility:'US citizen, high school senior, applying to a 4-year US college. Ranked by leadership, scholarship, and need.',
    award:'Up to $50,000 over 4 years', deadline:'Nov 15, 2026', deadlineDate:'2026-11-15',
    tips:'Apply through your local Elks Lodge — they conduct the initial review. Leadership essays should be specific and vivid. Highlight service to your school and community. The application is among the most detailed.',
    url:'https://elks.org/scholars',
    grades:['12th Grade'], minGPA:3.0,
    interests:['STEM','Arts','Business','Medicine','Engineering','Social Justice','Writing'], featured:false },

  { id:'hispanic-scholarship', name:'Hispanic Scholarship Fund Award', organization:'Hispanic Scholarship Fund',
    type:'scholarship', awardValue:5000,
    description:'Provides college scholarships and support services to Hispanic college students in the US. Partners with major corporations to offer additional awards and mentorship.',
    eligibility:'Must be of Hispanic heritage, US citizen or eligible non-citizen, minimum 3.0 GPA for college students or 3.0 unweighted for HS seniors, enrolled in a US accredited institution.',
    award:'$500 – $5,000', deadline:'Feb 1, 2027', deadlineDate:'2027-02-01',
    tips:'Apply even if you think your GPA is borderline — the scholarship considers many factors. Be specific about your heritage and how it shapes your goals. Corporate partners often increase awards for certain majors.',
    url:'https://hsf.net',
    grades:['12th Grade','College Freshman','College Sophomore','College Junior','College Senior'], minGPA:3.0,
    interests:['STEM','Arts','Business','Medicine','Engineering','Computer Science','Social Justice'], featured:false },

  { id:'ron-brown', name:'Ron Brown Scholar Program', organization:'CAP Charitable Foundation',
    type:'scholarship', awardValue:40000,
    description:'Assists exceptionally accomplished Black high school students who are motivated to make a positive difference in society. Combines a generous financial award with a tight-knit scholar community.',
    eligibility:'African American high school senior applying to a 4-year college. Financial need is a factor. Academic excellence and community leadership required.',
    award:'$40,000 ($10,000/year)', deadline:'Nov 1, 2026', deadlineDate:'2026-11-01',
    tips:'Essays about community impact carry great weight. Finalists attend an interview in Washington, D.C. The program also provides access to mentors and a scholar alumni network, so mention your interest in community.',
    url:'https://ronbrown.org',
    grades:['12th Grade'], minGPA:3.0,
    interests:['Business','Social Justice','Writing','STEM','Medicine'], featured:false },

  { id:'posse-scholarship', name:'Posse Foundation Scholarship', organization:'Posse Foundation',
    type:'scholarship', awardValue:200000, nyc:true,
    description:'Identifies extraordinary young leaders from urban areas and sends them in diverse teams ("posses") to partner universities on full-tuition leadership scholarships. Partners with 60+ top universities.',
    eligibility:'High school senior from select cities (Boston, Chicago, DC, Houston, LA, Miami, New York, New Orleans, San Francisco). Nominated through high school or community orgs. No minimum GPA — leadership focused.',
    award:'Full tuition (4 years)', deadline:'Sep 2026', deadlineDate:'2026-09-30',
    tips:'You must be nominated — talk to your school counselor or a Posse partner school about being referred. The selection process includes group interviews. They look for dynamic team players, not just individual achievers.',
    url:'https://possefoundation.org',
    grades:['12th Grade'], minGPA:0,
    interests:['STEM','Arts','Business','Medicine','Engineering','Computer Science','Social Justice','Writing'], featured:false },

  { id:'goldwater-scholarship', name:'Goldwater Scholarship', organization:'Barry Goldwater Scholarship Foundation',
    type:'scholarship', awardValue:7500,
    description:'The premier undergraduate award for STEM research students. Awarded to US college sophomores and juniors who intend to pursue careers in mathematics, natural sciences, or engineering.',
    eligibility:'Full-time college sophomore or junior, US citizen/resident, 3.0+ GPA, intending to pursue a research career in STEM. Must be nominated by their institution.',
    award:'Up to $7,500/year', deadline:'Jan 25, 2027', deadlineDate:'2027-01-25',
    tips:'Talk to your college\'s Goldwater campus representative — you must be nominated by your institution. Research experience is essential; start in your freshman year. Professors who supervise your research write strong nominations.',
    url:'https://goldwaterscholarship.gov',
    grades:['College Sophomore','College Junior'], minGPA:3.0,
    interests:['STEM','Math','Research','Engineering','Medicine','Computer Science'], featured:false },

  { id:'truman-scholarship', name:'Harry S. Truman Scholarship', organization:'Harry S. Truman Scholarship Foundation',
    type:'scholarship', awardValue:30000,
    description:'The premier scholarship for college students committed to public service careers. Provides up to $30,000 for graduate education plus access to leadership development programs.',
    eligibility:'College junior, US citizen or US national, in the top quarter of their class, committed to public service career (government, nonprofit, education). Institution must nominate.',
    award:'Up to $30,000 for graduate school', deadline:'Feb 2027', deadlineDate:'2027-02-01',
    tips:'Must be nominated by your institution. Demonstrate genuine commitment to public service through concrete actions, not just interest. Propose specific policy changes in your application.',
    url:'https://truman.gov',
    grades:['College Junior'], minGPA:3.0,
    interests:['Law','Social Justice','Business','Medicine'], featured:false },

  { id:'udall-scholarship', name:'Udall Scholarship', organization:'Udall Foundation',
    type:'scholarship', awardValue:7000,
    description:'For college sophomores and juniors who are committed to careers related to the environment, or Native American students committed to any field. Recognizes leadership and commitment to community.',
    eligibility:'College sophomore or junior, US citizen/resident, environmentally focused career OR Native American student with any career goal. Must be nominated by institution.',
    award:'$7,000', deadline:'Mar 2027', deadlineDate:'2027-03-01',
    tips:'Institution-nominated. If your focus is environment, describe specific projects and policy work. Leadership and commitment to your cause are weighted more heavily than GPA alone.',
    url:'https://udall.gov/ourprograms/scholarship',
    grades:['College Sophomore','College Junior'], minGPA:3.0,
    interests:['Environment','Social Justice','STEM','Research'], featured:false },

  { id:'siemens-comp', name:'Regeneron/Siemens Competition', organization:'Siemens Foundation & Society for Science',
    type:'scholarship', awardValue:100000,
    description:'One of the premier science competitions for high school students, recognizing original research in STEM. Students submit individual or team research projects to win scholarships up to $100,000.',
    eligibility:'US high school student (typically 11th or 12th grade). Must submit an original research report in math, science, or technology. Projects are judged by expert panels.',
    award:'Up to $100,000', deadline:'Sep 2026', deadlineDate:'2026-09-30',
    tips:'Start research early in junior year or even sophomore year. Partner with a university researcher — professional mentorship dramatically strengthens projects. Have your paper peer-reviewed before submission.',
    url:'https://societyforscience.org/regeneron-sts/',
    grades:['11th Grade','12th Grade'], minGPA:0,
    interests:['STEM','Math','Research','Engineering','Medicine','Computer Science','Environment'], featured:false },

  { id:'axa-achievement', name:'AXA Achievement Scholarship', organization:'AXA Foundation',
    type:'scholarship', awardValue:10000,
    description:'Merit-based scholarships for exceptional high school seniors who demonstrate ambition and the determination to achieve goals through hard work and perseverance.',
    eligibility:'US citizen or legal resident, high school senior enrolling full-time in a US accredited 2- or 4-year college. No minimum GPA — achievement and leadership focused.',
    award:'Up to $10,000', deadline:'Dec 15, 2026', deadlineDate:'2026-12-15',
    tips:'Focus on your most impressive achievement — one thing you pursued with real dedication. Passion and persistence matter more than having many activities. Quality over quantity.',
    url:'https://equitable.com/foundation/equitable-excellence-scholarship',
    grades:['12th Grade'], minGPA:3.0,
    interests:['STEM','Arts','Business','Medicine','Engineering','Computer Science','Social Justice','Writing'], featured:false },

  // ────────────── INTERNSHIPS ──────────────────────

  { id:'google-step', name:'Google STEP Intern Program', organization:'Google',
    type:'internship', awardValue:7000,
    description:'A 12-week summer internship at Google specifically for first and second-year college students from historically underrepresented groups in tech. Work on real products alongside engineers.',
    eligibility:'Currently enrolled college freshman or sophomore, majoring in Computer Science or related field. Strong coding skills required (data structures, algorithms). Open to students from underrepresented groups.',
    award:'Paid (~$7,000–$8,500/month) + housing stipend', deadline:'Oct 2026', deadlineDate:'2026-10-31',
    tips:'Apply through Google\'s careers site. Practice LeetCode medium problems. The technical interview is rigorous — be comfortable explaining your thinking out loud. Apply as early as applications open.',
    url:'https://buildyourfuture.withgoogle.com/programs/step/',
    grades:['College Freshman','College Sophomore'], minGPA:0,
    interests:['Computer Science','Engineering','Math','STEM'], featured:true },

  { id:'microsoft-explore', name:'Microsoft Explore Internship', organization:'Microsoft',
    type:'internship', awardValue:7500,
    description:'A 12-week summer program at Microsoft for college freshmen and sophomores from underrepresented groups. Interns rotate between software development and program management roles on real product teams.',
    eligibility:'Currently enrolled college freshman or sophomore pursuing CS, CE, or related STEM degree. US and Canada students. From underrepresented groups in tech.',
    award:'Paid ($7,500–$9,000/month) + housing', deadline:'Oct 2026', deadlineDate:'2026-10-31',
    tips:'Submit your application as soon as applications open — positions fill quickly. Demonstrate both technical depth and product thinking. Be prepared to discuss a project you built.',
    url:'https://careers.microsoft.com/v2/global/en/exploremicrosoft',
    grades:['College Freshman','College Sophomore'], minGPA:0,
    interests:['Computer Science','Engineering','STEM','Business'], featured:false },

  { id:'meta-university', name:'Meta University Internship', organization:'Meta',
    type:'internship', awardValue:8000,
    description:'A 12-week internship program at Meta (formerly Facebook) for freshman and sophomore undergraduates from underrepresented backgrounds. Work on real engineering challenges alongside senior engineers.',
    eligibility:'Current freshman or sophomore undergraduate, majoring in CS or similar. Must demonstrate strong technical ability. From underrepresented backgrounds in tech.',
    award:'Paid (~$8,000/month)', deadline:'Sep 2026', deadlineDate:'2026-09-30',
    tips:'Apply through LinkedIn or Meta\'s careers page. Coding interviews focus on arrays, strings, trees, and dynamic programming. Communicate clearly in interviews — Meta values collaborative problem-solving.',
    url:'https://metacareers.com/careerprograms/students',
    grades:['College Freshman','College Sophomore'], minGPA:0,
    interests:['Computer Science','Engineering','STEM'], featured:false },

  { id:'nasa-ossi', name:'NASA Internship Program', organization:'NASA',
    type:'internship', awardValue:9000,
    description:'NASA offers hundreds of paid internship and fellowship opportunities across all its centers for undergraduates and graduate students. Work alongside engineers and scientists on real NASA missions.',
    eligibility:'US citizen, enrolled as full-time student (high school through graduate), minimum 3.0 GPA, studying a NASA-relevant STEM field (aeronautics, space, physics, engineering, CS, etc.).',
    award:'Paid ($7,000–$9,500/session)', deadline:'Mar 2027', deadlineDate:'2027-03-01',
    tips:'Apply to multiple NASA centers and projects — each has different requirements. Include a detailed, specific personal statement about why a particular NASA mission interests you. GPA matters but research experience matters more.',
    url:'https://intern.nasa.gov',
    grades:['11th Grade','12th Grade','College Freshman','College Sophomore','College Junior','College Senior'], minGPA:3.0,
    interests:['STEM','Engineering','Computer Science','Math','Research','Physics'], featured:false },

  { id:'goldman-stem-diversity', name:'Goldman Sachs STEM Diversity Internship', organization:'Goldman Sachs',
    type:'internship', awardValue:8500, nyc:true,
    description:'A competitive summer analyst internship program at Goldman Sachs targeting STEM students from underrepresented groups, placing them in engineering, quantitative, and technology divisions.',
    eligibility:'Freshman or sophomore in college majoring in computer science, engineering, mathematics, or related STEM field. From underrepresented groups. Strong academics and communication skills.',
    award:'Paid ($8,500/month) + housing', deadline:'Nov 2026', deadlineDate:'2026-11-30',
    tips:'Goldman looks for both technical skills and communication ability. Prepare for case-style interviews with a finance angle. Show genuine interest in technology\'s role in financial markets.',
    url:'https://goldmansachs.com/careers/students',
    grades:['College Freshman','College Sophomore'], minGPA:3.0,
    interests:['Business','Finance','Engineering','Computer Science','Math','STEM'], featured:false },

  { id:'nih-undergraduate', name:'NIH Undergraduate Scholarship Program', organization:'National Institutes of Health',
    type:'internship', awardValue:20000,
    description:'Competitive scholarships plus guaranteed summer research training at NIH for students committed to biomedical research careers. One of the most prestigious programs for aspiring scientists.',
    eligibility:'US citizen enrolled in a science or health field, financial need (family income under $3.5x federal poverty line), minimum 3.3 GPA, intent to pursue biomedical research career.',
    award:'$20,000/year scholarship + paid NIH summer research', deadline:'Mar 2027', deadlineDate:'2027-03-15',
    tips:'Financial need is a key criterion — be detailed and accurate. Your research statement should show genuine curiosity about a specific biological question, not just interest in medicine generally.',
    url:'https://training.nih.gov/research-training/pb/ugsp/',
    grades:['College Freshman','College Sophomore','College Junior'], minGPA:3.3,
    interests:['Medicine','Research','STEM','Biology'], featured:false },

  { id:'smithsonian-internship', name:'Smithsonian Institution Internship', organization:'Smithsonian Institution',
    type:'internship', awardValue:4500,
    description:'Internships at the world\'s largest museum and research complex, spanning art, science, history, and culture. Interns work alongside curators, scientists, and educators across 19 museums.',
    eligibility:'High school junior or senior, undergraduate, or graduate student. No minimum GPA. Variety of disciplines accepted — STEM, arts, history, communications, policy.',
    award:'Stipend ($4,500–$7,000/session)', deadline:'Oct 15, 2026', deadlineDate:'2026-10-15',
    tips:'Choose your unit carefully — Smithsonian spans from the Folklife Center to astrophysics labs. Write a project proposal that shows you understand the specific collection or research. Strong writing sample helps.',
    url:'https://internships.si.edu',
    grades:['11th Grade','12th Grade','College Freshman','College Sophomore','College Junior','College Senior'], minGPA:0,
    interests:['Arts','Research','STEM','Writing','Social Justice'], featured:false },

  { id:'white-house-internship', name:'White House Internship Program', organization:'Executive Office of the President',
    type:'internship', awardValue:0,
    description:'A rigorous public service internship working directly in the White House. Interns are placed in offices across the White House complex, engaging with policy, communications, operations, and more.',
    eligibility:'US citizen, at least 18 years old, currently enrolled college student or recent graduate. Demonstrated leadership, academic achievement, and commitment to public service.',
    award:'Unpaid (educational credit)', deadline:'Feb 2027', deadlineDate:'2027-02-01',
    tips:'This is intensely competitive and politically appointed. Write essays with a strong sense of purpose and civic responsibility. Have impeccable character — extensive background check required.',
    url:'https://whitehouse.gov/internships/',
    grades:['College Freshman','College Sophomore','College Junior','College Senior'], minGPA:0,
    interests:['Law','Social Justice','Business','Writing'], featured:false },

  { id:'nsa-hisp', name:'NSA High School Work Study Program', organization:'National Security Agency',
    type:'internship', awardValue:30000,
    description:'The NSA pays for the last two years of high school and college for students interested in computer science, mathematics, and engineering. A unique paid work-study program combining school and work at NSA.',
    eligibility:'US citizen, at least 16 years old applying for your sophomore year of high school. Planning to study CS, math, or engineering at college. Must pass extensive background investigation.',
    award:'$30,000+/year salary + tuition + benefits', deadline:'Oct 31, 2026', deadlineDate:'2026-10-31',
    tips:'Start the application process well before the deadline — the background investigation alone can take months. Demonstrate genuine interest in national security and technical problem-solving.',
    url:'https://intelligencecareers.gov/nsa/students-and-internships',
    grades:['11th Grade','12th Grade'], minGPA:3.0,
    interests:['Math','Computer Science','Engineering','STEM'], featured:false },

  { id:'apple-wwdc', name:'Apple WWDC Swift Student Challenge', organization:'Apple',
    type:'internship', awardValue:0,
    description:'Apple\'s annual challenge for student developers to submit an impressive, interactive experience built in Swift Playgrounds or Xcode Playgrounds. Winners get WWDC attendance and more.',
    eligibility:'Enrolled as a student at any level (high school through graduate). Must submit an original Swift playground demonstrating creativity and technical skill.',
    award:'WWDC attendance, year-round Apple developer access, exclusive gear', deadline:'Apr 2027', deadlineDate:'2027-04-01',
    tips:'Build something that shows both technical skill and creativity — not just a tutorial recreation. Strong visual design and polish matter a lot. Judges love seeing unique ideas that solve real problems.',
    url:'https://developer.apple.com/swift-student-challenge',
    grades:['9th Grade','10th Grade','11th Grade','12th Grade','College Freshman','College Sophomore','College Junior','College Senior'], minGPA:0,
    interests:['Computer Science','Engineering','Arts','STEM'], featured:false },

  { id:'chci-internship', name:'CHCI Congressional Internship Program', organization:'Congressional Hispanic Caucus Institute',
    type:'internship', awardValue:2500,
    description:'Places Latino students in Congressional offices in Washington, D.C. for a semester-long paid internship. Includes leadership development sessions and networking with Latino leaders in policy.',
    eligibility:'US citizen or permanent resident, Latino/Hispanic heritage, currently enrolled in a college or university, strong GPA and commitment to Latino community advancement.',
    award:'$2,500 monthly stipend', deadline:'Jan 2027', deadlineDate:'2027-01-15',
    tips:'Strong essays about your connection to the Latino community and public service goals. Prior civic engagement helps. Knowledge of relevant policy issues affecting Latino communities is an advantage.',
    url:'https://chci.org/programs/congressional-internship-program/',
    grades:['College Freshman','College Sophomore','College Junior','College Senior'], minGPA:3.0,
    interests:['Law','Social Justice','Business','Writing'], featured:false },

  { id:'deloitte-stem-intern', name:'Deloitte Discover Internship Program', organization:'Deloitte',
    type:'internship', awardValue:5000,
    description:'A one-week immersive program for college freshmen and sophomores from underrepresented backgrounds to explore careers in consulting, technology, and strategy at Deloitte offices.',
    eligibility:'College freshman or sophomore, from underrepresented groups, interest in business, technology, or consulting. Minimum 3.0 GPA.',
    award:'Fully paid program ($5,000 total value) + fast-track to internship offer', deadline:'Nov 30, 2026', deadlineDate:'2026-11-30',
    tips:'Research Deloitte\'s service lines before applying. Be ready to discuss a business or tech challenge you\'ve observed. Networking skills matter in consulting — lean into that.',
    url:'https://www.deloitte.com/us/en/careers/students/internships.html',
    grades:['College Freshman','College Sophomore'], minGPA:3.0,
    interests:['Business','Computer Science','Engineering','STEM'], featured:false },

  // ────────────── PROGRAMS ──────────────────────────

  { id:'rsi', name:'Research Science Institute (RSI)', organization:'Center for Excellence in Education / MIT',
    type:'program', awardValue:0,
    description:'One of the most prestigious summer science programs in the world. RSI brings 80 of the most gifted high school students together for six weeks at MIT for intensive research mentored by professors and scientists.',
    eligibility:'Must be completing their junior year of high school (rising senior). US and international students. Admitted based on academic excellence, research potential, and mathematical ability.',
    award:'Fully funded (room, board, and research)', deadline:'Dec 1, 2026', deadlineDate:'2026-12-01',
    tips:'A prior research project or science fair entry significantly strengthens your application. Strong math and science course rigor is essential. Reference letters from teachers who supervised independent work are powerful.',
    url:'https://cee.org/programs/research-science-institute',
    grades:['11th Grade'], minGPA:0,
    interests:['STEM','Math','Research','Engineering','Medicine','Computer Science'], featured:true },

  { id:'girls-who-code', name:'Girls Who Code Summer Immersion Program', organization:'Girls Who Code',
    type:'program', awardValue:0,
    description:'A free 2-week intensive summer program for high school girls to learn coding through projects in web design, robotics, and mobile apps. Hosted at top tech companies across the US.',
    eligibility:'Female or non-binary student who will be in grades 10, 11, or 12 in the upcoming fall. No prior coding experience required. Open to all states.',
    award:'Free (full scholarship)', deadline:'Mar 2027', deadlineDate:'2027-03-01',
    tips:'No experience needed — the program wants curious, creative students more than experienced coders. Write about WHY you want to close the gender gap in tech. Commitment to attending every day is important.',
    url:'https://girlswhocode.com/programs/summer-immersion-program',
    grades:['9th Grade','10th Grade','11th Grade'], minGPA:0,
    interests:['Computer Science','Engineering','STEM','Social Justice'], featured:false },

  { id:'clark-scholars', name:'Clark Scholars Program', organization:'Texas Tech University',
    type:'program', awardValue:3000,
    description:'A highly selective 7-week summer research program for high school juniors and seniors. Students conduct research at Texas Tech under faculty mentors in any field, culminating in a research symposium.',
    eligibility:'Rising 11th or 12th grader, minimum 3.5 GPA. Highly competitive — approximately 12 students selected nationally. Must write a research proposal.',
    award:'$750/week stipend, free housing & meals', deadline:'Feb 1, 2027', deadlineDate:'2027-02-01',
    tips:'Submit a genuine, focused research proposal — not broad. Mentors are matched by research interest, so identify specific faculty at TTU whose work aligns with yours. GPA alone won\'t get you in.',
    url:'https://depts.ttu.edu/clarkscholars/',
    grades:['11th Grade','12th Grade'], minGPA:3.5,
    interests:['STEM','Research','Engineering','Medicine','Math','Computer Science'], featured:false },

  { id:'primes-mit', name:'PRIMES Program at MIT', organization:'MIT Mathematics Department',
    type:'program', awardValue:0,
    description:'A free year-round research program where high school students work on original mathematical research under MIT faculty guidance. One of the most selective math programs for high schoolers in the world.',
    eligibility:'High school students in grades 9–11. Must live in the greater Boston area for in-person meetings (or PRIMES-USA for remote). Exceptional mathematical ability required.',
    award:'Free mentored research + publication opportunities', deadline:'Dec 1, 2026', deadlineDate:'2026-12-01',
    tips:'Submit detailed solutions to the PRIMES admissions problems — these are difficult and should showcase your mathematical maturity. Prior AMC/AIME/olympiad experience is a strong signal.',
    url:'https://math.mit.edu/research/highschool/primes',
    grades:['9th Grade','10th Grade','11th Grade'], minGPA:0,
    interests:['Math','Research','Computer Science','STEM'], featured:false },

  { id:'tasp', name:'Telluride Association Summer Program (TASP)', organization:'Telluride Association',
    type:'program', awardValue:0,
    description:'A free, highly selective six-week academic program where exceptional 11th-graders engage in rigorous seminar-style learning, self-governance, and community life at college campuses.',
    eligibility:'Current 10th-grader (applying for 11th grade summer). US and international students. Selected through PSAT score invitation or independent application.',
    award:'Fully funded (tuition, room, board, and travel)', deadline:'Jan 2027', deadlineDate:'2027-01-15',
    tips:'TASP is uniquely focused on intellectual community and self-governance. Essays should demonstrate genuine intellectual curiosity — ask real questions. Discuss books, ideas, and debates that changed how you think.',
    url:'https://tellurideassociation.org/tass/',
    grades:['10th Grade','11th Grade'], minGPA:0,
    interests:['Writing','Social Justice','Arts','Law','Research'], featured:false },

  { id:'lead-business', name:'LEAD Summer Business Institute', organization:'LEAD Program',
    type:'program', awardValue:0, nyc:true,
    description:'A competitive pre-business program placing talented students from underrepresented backgrounds inside top business schools (Wharton, Harvard, Michigan, Columbia) for an intensive summer experience.',
    eligibility:'Underrepresented minority student in 10th, 11th, or 12th grade. Strong academic record (3.0+ GPA). Genuine interest in business or entrepreneurship.',
    award:'Fully funded program + business school stipends', deadline:'Mar 2027', deadlineDate:'2027-03-01',
    tips:'Show authentic business curiosity — not just "I want to make money." Describe a problem you\'ve observed that a business could solve. The Columbia track is especially competitive for NYC students.',
    url:'https://leadprogram.org',
    grades:['10th Grade','11th Grade','12th Grade'], minGPA:3.0,
    interests:['Business','Finance','Social Justice','Engineering'], featured:false },

  { id:'wharton-lbw', name:'Wharton Leadership in the Business World', organization:'Wharton School, University of Pennsylvania',
    type:'program', awardValue:0,
    description:'A four-week program at the Wharton School for exceptional rising seniors to experience business education at one of the world\'s top business schools. Explore accounting, finance, marketing, and more.',
    eligibility:'Rising 12th-grader with strong academics and genuine interest in business. Competitive — 100 students selected. Financial aid available.',
    award:'Program (scholarships available based on need)', deadline:'Feb 2027', deadlineDate:'2027-02-15',
    tips:'Your business interest must be specific — pick a type of business (fintech, sustainability, etc.) and explain your curiosity. Prior experiences with entrepreneurship or economics coursework help.',
    url:'https://globalyouth.wharton.upenn.edu/programs-courses/leadership-in-the-business-world/',
    grades:['11th Grade'], minGPA:3.5,
    interests:['Business','Finance','Math','Social Justice'], featured:false },

  { id:'yygs', name:'Yale Young Global Scholars (YYGS)', organization:'Yale University',
    type:'program', awardValue:0,
    description:'A selective academic program at Yale for outstanding high school students from around the world. Offers seminars in STEM, politics and global affairs, applied science, and more.',
    eligibility:'High school student in grades 10 or 11. Open to US and international students. Strong academics. 20% scholarships available. Competitive 5–8% acceptance rate.',
    award:'Partial need-based scholarships available', deadline:'Jan 2027', deadlineDate:'2027-01-31',
    tips:'YYGS values diverse perspectives — don\'t just write about grades. Focus on a global issue you care about and show how you\'d engage it at Yale. Short program requires strong essays.',
    url:'https://globalscholars.yale.edu',
    grades:['9th Grade','10th Grade','11th Grade'], minGPA:0,
    interests:['STEM','Arts','Business','Social Justice','Law','Writing','Environment'], featured:false },

  { id:'cosmos', name:'COSMOS UC Summer Program', organization:'University of California System',
    type:'program', awardValue:0,
    description:'California State Summer School for Mathematics & Science (COSMOS) is a 4-week residential program at UC campuses for exceptional students passionate in STEM fields.',
    eligibility:'California resident, entering grades 8–12. Exceptional academic achievement in STEM subjects. Clusters range from bioinformatics to robotics to number theory.',
    award:'Scholarships and fee waivers available', deadline:'Feb 2027', deadlineDate:'2027-02-15',
    tips:'Choose a cluster that matches your genuine interest, not just what sounds impressive. Application essays should show specific STEM projects you\'ve done independently. Recommend applying to multiple campuses.',
    url:'https://cosmos-ucop.ucdavis.edu',
    grades:['9th Grade','10th Grade','11th Grade','12th Grade'], minGPA:0,
    interests:['STEM','Math','Engineering','Research','Computer Science'], featured:false },

  { id:'harvard-precollege', name:'Harvard Pre-College Programs', organization:'Harvard University',
    type:'program', awardValue:0,
    description:'Harvard\'s intensive summer programs for high school students: Secondary School Program for juniors and seniors offers college-level courses for credit; Summer School offers online programs.',
    eligibility:'High school student in 9th–12th grade. No minimum GPA. Must demonstrate academic potential in application. No financial aid for most programs.',
    award:'No aid (standard tuition applies)', deadline:'Mar 2027', deadlineDate:'2027-03-01',
    tips:'Write the application essay with intellectual depth — discuss a course topic you genuinely find fascinating. This isn\'t the most selective program, but it\'s a great way to experience college coursework.',
    url:'https://summer.harvard.edu',
    grades:['9th Grade','10th Grade','11th Grade','12th Grade'], minGPA:0,
    interests:['STEM','Arts','Business','Medicine','Law','Social Justice','Writing','Research'], featured:false },

  { id:'stanford-precollegiate', name:'Stanford Pre-Collegiate Studies', organization:'Stanford University',
    type:'program', awardValue:0,
    description:'Stanford\'s summer programs for high schoolers include the rigorous Stanford Summer Session (2–8 units of college credit), online math and science workshops, and subject-specific academies.',
    eligibility:'High school freshman through senior. Specific programs vary by grade. Strong academic record for competitive courses. Financial aid available for some programs.',
    award:'Limited need-based aid available', deadline:'Mar 2027', deadlineDate:'2027-03-01',
    tips:'Stanford\'s mathematical and scientific programs are particularly strong. Show in your essay that you\'ve done independent work in the subject and aren\'t just seeking the brand name.',
    url:'https://spcs.stanford.edu',
    grades:['9th Grade','10th Grade','11th Grade','12th Grade'], minGPA:0,
    interests:['STEM','Math','Computer Science','Engineering','Arts','Writing','Research'], featured:false },

  { id:'duke-tip', name:'Duke TIP Talent Identification Program', organization:'Duke University',
    type:'program', awardValue:0,
    description:'Duke TIP identifies gifted young learners and provides challenging academic programs. The summer programs offer college-level courses in STEM, humanities, arts, and social sciences on Duke\'s campus.',
    eligibility:'7th–12th graders who score at or above the 95th percentile on the SAT, ACT, or other qualifying test. Wide range of programs across subjects.',
    award:'Merit scholarships available', deadline:'Feb 2027', deadlineDate:'2027-02-28',
    tips:'TIP qualification requires the 7th grade talent search. Once qualified, you have access to programs through high school. Classes are challenging — read syllabi carefully and choose based on genuine interest.',
    url:'https://tip.duke.edu',
    grades:['9th Grade','10th Grade','11th Grade','12th Grade'], minGPA:0,
    interests:['STEM','Math','Arts','Writing','Computer Science','Research','Medicine'], featured:false },

  { id:'nsli-y', name:'National Security Language Initiative for Youth (NSLI-Y)', organization:'U.S. Dept. of State',
    type:'program', awardValue:0,
    description:'Fully funded overseas language immersion programs for American high schoolers to learn critical languages: Arabic, Chinese, Hindi, Indonesian, Korean, Persian, Russian, and Swahili.',
    eligibility:'US citizen, 15–18 years old, strong academic record, no previous formal study of target language (for most programs), commitment to cultural exchange.',
    award:'Fully funded (flights, housing, program)', deadline:'Nov 2026', deadlineDate:'2026-11-15',
    tips:'Demonstrate genuine cultural curiosity, not just academic interest. Essays about why a specific language matters — geopolitically, personally, professionally — are much stronger than generic ones.',
    url:'https://nsliforyouth.org',
    grades:['9th Grade','10th Grade','11th Grade','12th Grade'], minGPA:0,
    interests:['Writing','Social Justice','Law','Arts'], featured:false },

  { id:'nslc', name:'National Student Leadership Conference', organization:'NSLC',
    type:'program', awardValue:0,
    description:'Multi-day leadership development conferences held at top universities, focused on medicine, law, business, STEM, and more. Combines academic workshops with college experience.',
    eligibility:'Students in grades 9–12 who are nominated by their schools. No minimum GPA but academic engagement expected.',
    award:'Tuition-based (financial aid available)', deadline:'Rolling', deadlineDate:null,
    tips:'The value is in the network and hands-on simulations. Use the experience to confirm your career interests. If money is a concern, ask about financial aid — they have substantial scholarship funds.',
    url:'https://nslcleaders.org',
    grades:['9th Grade','10th Grade','11th Grade','12th Grade'], minGPA:0,
    interests:['Medicine','Law','Business','STEM','Computer Science','Engineering','Social Justice'], featured:false },

  { id:'mit-launch', name:'MIT Launch Entrepreneurship Program', organization:'MIT Launch',
    type:'program', awardValue:0,
    description:'A prestigious summer entrepreneurship program at MIT where high school students build and launch a real startup over 4 weeks. Teams pitch to investors at the end of the program.',
    eligibility:'High school students in grades 9–12. Competitive admission. Strong interest in entrepreneurship and innovation. Financial aid available.',
    award:'Program-based (scholarships available)', deadline:'Mar 2027', deadlineDate:'2027-03-15',
    tips:'Come in with a real business idea — even a rough one. Show that you\'ve talked to potential customers. MIT Launch rewards student-driven thinking, not polished presentations.',
    url:'https://launchx.com',
    grades:['9th Grade','10th Grade','11th Grade','12th Grade'], minGPA:0,
    interests:['Business','Computer Science','Engineering','STEM'], featured:false },

  { id:'johns-hopkins-cty', name:'Center for Talented Youth (CTY)', organization:'Johns Hopkins University',
    type:'program', awardValue:0,
    description:'Johns Hopkins CTY is one of the original talent search and academic enrichment programs, offering rigorous residential, online, and international programs in STEM, humanities, and arts for gifted students.',
    eligibility:'Students in grades K–12. Qualification through talent search testing (SAT/ACT score in 7th grade). Programs vary widely by age and subject.',
    award:'Need-based financial aid available', deadline:'Rolling', deadlineDate:null,
    tips:'The level of academic challenge can be intense — choose the right program level. CTY alumni networks are strong and last-long lasting. Summer residentials build deep friendships among intellectually curious students.',
    url:'https://cty.jhu.edu',
    grades:['9th Grade','10th Grade','11th Grade','12th Grade'], minGPA:0,
    interests:['STEM','Math','Arts','Writing','Computer Science','Research'], featured:false },

  // ────────────── COMPETITIONS ──────────────────────

  { id:'amc-aime', name:'AMC 10/12 & AIME Math Competition', organization:'Mathematical Association of America',
    type:'competition', awardValue:0,
    description:'The AMC series is the premier math competition pathway for US high school students, leading to the AIME, USAMO, and potential selection for the US Math Olympiad team. Tests problem-solving ability.',
    eligibility:'US and international high school students. AMC 10 for grades 10 and below; AMC 12 for all high schoolers. No GPA requirement — pure math skill.',
    award:'Prizes, certificates, AIME qualification, potential USAMO selection', deadline:'Nov 2026', deadlineDate:'2026-11-06',
    tips:'Work through past AMC and AIME problems — the style is very specific. Art of Problem Solving (AoPS) is the best preparation resource. Start in middle school if you want a realistic shot at AIME.',
    url:'https://maa.org/student-programs/amc/',
    grades:['9th Grade','10th Grade','11th Grade','12th Grade'], minGPA:0,
    interests:['Math','STEM','Research'], featured:false },

  { id:'regeneron-isef', name:'Regeneron International Science & Engineering Fair', organization:'Society for Science',
    type:'competition', awardValue:75000,
    description:'The world\'s largest pre-college science competition, with over 1,800 finalists from 50+ countries. Students present original research projects across all STEM disciplines to panels of expert judges.',
    eligibility:'Students in grades 9–12. Must first win at a local or regional affiliated fair to qualify for ISEF. Projects must be original research.',
    award:'Up to $75,000 + special awards from agencies like NASA, NOAA, and DoD', deadline:'Jan 2027', deadlineDate:'2027-01-15',
    tips:'Strong ISEF projects start 12+ months before the fair. Find a mentor — a university professor or professional scientist. The research question must be original and testable. Judges prioritize methodology and impact.',
    url:'https://societyforscience.org/isef',
    grades:['9th Grade','10th Grade','11th Grade','12th Grade'], minGPA:0,
    interests:['STEM','Research','Engineering','Medicine','Environment','Computer Science','Math'], featured:false },

  { id:'scholastic-art-writing', name:'Scholastic Art & Writing Awards', organization:'Alliance for Young Artists & Writers',
    type:'competition', awardValue:10000,
    description:'The largest creative recognition program for US students in grades 7–12. Awards are given in 29 categories of art and writing, with top winners receiving Gold Portfolio scholarships up to $10,000.',
    eligibility:'Students in grades 7–12 at US schools. Art categories: painting, drawing, photography, digital art, and more. Writing categories: poetry, short story, essays, journalism, and more.',
    award:'Gold Medal scholarships up to $10,000', deadline:'Dec 2026', deadlineDate:'2026-12-10',
    tips:'Submit your most original work — not your most polished "school" piece. Judges look for risk-taking and authentic voice. Enter multiple categories if you create in different forms.',
    url:'https://artandwriting.org',
    grades:['9th Grade','10th Grade','11th Grade','12th Grade'], minGPA:0,
    interests:['Arts','Writing'], featured:false },

  { id:'first-robotics', name:'FIRST Robotics Competition', organization:'FIRST',
    type:'competition', awardValue:5000,
    description:'Students build robots to compete in a new challenge each year. More than $80 million in college scholarships are available to FIRST participants. The "Sport for the Mind" teaches engineering, teamwork, and leadership.',
    eligibility:'High school students in grades 9–12. Join or start a team at your school. Teams need mentors (professionals) and funding.',
    award:'$80 million+ in scholarships available to participants', deadline:'Jan 2027', deadlineDate:'2027-01-15',
    tips:'Starting your own team is impressive. Mentors from local engineering firms or universities can be found through FIRST. Pursue the Dean\'s List Award — it recognizes individual impact beyond robot performance.',
    url:'https://firstinspires.org',
    grades:['9th Grade','10th Grade','11th Grade','12th Grade'], minGPA:0,
    interests:['Engineering','Computer Science','STEM','Math'], featured:false },

  { id:'science-olympiad', name:'Science Olympiad', organization:'Science Olympiad Inc.',
    type:'competition', awardValue:0,
    description:'A team science competition where teams of 15 students compete in 23 events spanning biology, chemistry, physics, engineering, and earth science. Builds deep STEM knowledge and teamwork.',
    eligibility:'High school students. Must compete as a team of 15. National finals held at major universities. Open to all skill levels at invitational level.',
    award:'Medals, trophies, scholarships at invitational events', deadline:'Mar 2027', deadlineDate:'2027-03-01',
    tips:'Build a consistent team with assigned specializations — don\'t try to compete in all 23 events cold. Invitationals are great practice. Study the official rules for each event carefully.',
    url:'https://soinc.org',
    grades:['9th Grade','10th Grade','11th Grade','12th Grade'], minGPA:0,
    interests:['STEM','Engineering','Math','Research'], featured:false },

  { id:'deca', name:'DECA International Career Development Conference', organization:'DECA Inc.',
    type:'competition', awardValue:5000,
    description:'DECA is a business competition and leadership organization for high school students. Competitors role-play business situations, complete written projects, and present to business professionals.',
    eligibility:'High school students. Must be a member of a school-based DECA chapter. Competition ranges from local to state to international levels.',
    award:'Scholarships up to $5,000 + recognition + internship connections', deadline:'Mar 2027', deadlineDate:'2027-03-01',
    tips:'Choose an event that aligns with your career interests. Practice role-plays with a partner and a stopwatch. Strong presentations are memorized, not read from notes. Win states to reach ICDC.',
    url:'https://deca.org',
    grades:['9th Grade','10th Grade','11th Grade','12th Grade'], minGPA:0,
    interests:['Business','Finance','Social Justice'], featured:false },

  { id:'national-history-day', name:'National History Day', organization:'National History Day',
    type:'competition', awardValue:5000,
    description:'Students research a historical topic related to the annual theme, creating a documentary, exhibit, paper, performance, or website. The program culminates at the national contest at the University of Maryland.',
    eligibility:'Students in grades 6–12. Projects can be individual or group. All forms of research and presentation are welcome — from primary sources to oral histories.',
    award:'Prizes up to $5,000 + research trips + recognition', deadline:'Mar 2027', deadlineDate:'2027-03-15',
    tips:'Primary sources win competitions. Visit archives, interview historical figures, and go beyond your textbook. The annual theme gives you latitude — choose a topic you\'re genuinely passionate about.',
    url:'https://nhd.org',
    grades:['9th Grade','10th Grade','11th Grade','12th Grade'], minGPA:0,
    interests:['Writing','Social Justice','Arts'], featured:false },

  { id:'con-challenge', name:'Conrad Challenge', organization:'Conrad Foundation',
    type:'competition', awardValue:10000,
    description:'An innovation challenge where student teams create technology-based solutions to real-world problems in categories like cyber technology, energy, health/nutrition, and aerospace/aviation.',
    eligibility:'Students ages 13–18 worldwide. Teams of 2–5 students. Must propose a viable product or service that addresses a real-world challenge.',
    award:'$10,000 Innovation Award + mentorship opportunities', deadline:'Nov 1, 2026', deadlineDate:'2026-11-01',
    tips:'The product must be more than an idea — prototype something. Judges want to see market validation (did you talk to potential users?). Teams with adult mentors from industry perform strongest.',
    url:'https://conradchallenge.org/apply/',
    grades:['9th Grade','10th Grade','11th Grade','12th Grade'], minGPA:0,
    interests:['Business','Engineering','STEM','Environment','Computer Science','Medicine'], featured:false },

  { id:'presidential-scholars', name:'Presidential Scholars Program', organization:'U.S. Dept. of Education',
    type:'competition', awardValue:0,
    description:'One of the nation\'s highest honors for high school seniors, recognizing students for outstanding scholarship, leadership, service, and artistic achievement. Candidates are identified from SAT/ACT score data.',
    eligibility:'US citizen or permanent resident graduating high school. Initially identified from SAT/ACT score data. Also includes arts and career & technical education students.',
    award:'Recognition + Presidential Medallion + ceremony at White House', deadline:'Feb 2027', deadlineDate:'2027-02-01',
    tips:'You are identified automatically if your SAT/ACT scores are exceptional. If selected as a candidate, the essay and evaluation materials must show well-rounded achievement and service — not just academics.',
    url:'https://ed.gov/grants-and-programs/recognition-programs/us-presidential-scholars-program',
    grades:['12th Grade'], minGPA:0,
    interests:['STEM','Arts','Business','Medicine','Engineering','Computer Science','Social Justice','Writing','Math','Research'], featured:false },

  { id:'academic-decathlon', name:'Academic Decathlon', organization:'United States Academic Decathlon',
    type:'competition', awardValue:3000,
    description:'Academic Decathlon is a 10-subject academic competition where teams of 9 students compete in math, science, social science, economics, literature, art, music, interview, speech, and essay. Open to all GPAs.',
    eligibility:'High school students. Teams must include a mix of GPA levels (A, B, and C students). A true team competition — every member\'s score counts.',
    award:'Scholarships up to $3,000 for top individuals', deadline:'Oct 2026', deadlineDate:'2026-10-31',
    tips:'Study the annual study guide deeply. AcaDec rewards students who know details, not just general topics. The interview and speech events require different preparation than written tests. The team dynamic matters.',
    url:'https://usad.org',
    grades:['9th Grade','10th Grade','11th Grade','12th Grade'], minGPA:0,
    interests:['STEM','Arts','Writing','Math','Social Justice'], featured:false },

  { id:'regeneron-sts', name:'Regeneron Science Talent Search', organization:'Society for Science',
    type:'competition', awardValue:250000,
    description:'The oldest and most prestigious pre-college science competition in the US. The top award is $250,000. Finalists are invited to Washington D.C. to present research to scientists and government officials.',
    eligibility:'US high school senior. Must submit a completed research report of original work in any field of science, math, or engineering.',
    award:'Top award: $250,000. 40 finalists each receive $25,000+', deadline:'Nov 2026', deadlineDate:'2026-11-12',
    tips:'STS judges look for true scientific novelty. A project supervised by a university researcher is much stronger. The written report must be publication quality. Finalists should be able to defend their methodology to PhD scientists.',
    url:'https://societyforscience.org/regeneron-sts',
    grades:['12th Grade'], minGPA:0,
    interests:['STEM','Research','Engineering','Medicine','Math','Computer Science','Environment'], featured:true },

  // ────────────── BUSINESS & FINANCE ───────────────────

  { id:'fbla', name:'FBLA National Leadership Conference', organization:'Future Business Leaders of America',
    type:'competition', awardValue:5000,
    description:'The world\'s largest career and technical student organization. FBLA members compete at local, state, and national levels in 70+ events spanning every area of business — from entrepreneurship and finance to marketing and public speaking.',
    eligibility:'Any high school student enrolled in a business or related course, or who is a member of a school FBLA chapter. No minimum GPA. Events range from individual to team.',
    award:'Scholarships up to $5,000 + national recognition + resume credential', deadline:'Mar 2027', deadlineDate:'2027-03-15',
    tips:'FBLA is one of the highest-ROI activities for a business-focused student. Pick 2–3 events you can genuinely master rather than entering many. Finance events (Securities & Investments, Economics) are highly regarded.',
    url:'https://fbla.org',
    grades:['9th Grade','10th Grade','11th Grade','12th Grade'], minGPA:0,
    interests:['Business','Finance','Computer Science'], featured:true },

  { id:'wharton-gyp', name:'Wharton Global Youth Program', organization:'Wharton School, University of Pennsylvania',
    type:'program', awardValue:0,
    description:'Free and paid online courses on business, finance, and entrepreneurship taught by Wharton faculty — the professors who teach MBA students. Offerings include "Business Fundamentals for High School Students" and investing courses.',
    eligibility:'Any high school student worldwide. Online courses are free via Coursera; immersion programs are paid (financial aid available). No minimum GPA.',
    award:'Free courses + paid immersion programs (financial aid available)', deadline:'Rolling', deadlineDate:null,
    tips:'Completing the Wharton free courses and earning certificates signals genuine business interest. The paid Summer Immersion Program at Wharton is a selective 3-week program and a strong college app differentiator.',
    url:'https://globalyouth.wharton.upenn.edu',
    grades:['9th Grade','10th Grade','11th Grade','12th Grade'], minGPA:0,
    interests:['Business','Finance','Math'], featured:true },

  { id:'bofa-student-leaders', name:'Bank of America Student Leaders Program', organization:'Bank of America',
    type:'internship', awardValue:5500,
    description:'A paid 8-week internship at a local nonprofit for exceptional high school seniors, combined with a week-long leadership summit in Washington D.C. to meet student leaders from across the country.',
    eligibility:'Current high school junior or senior (graduating spring/summer), 17 or older, planning to enroll in college, strong record of service and leadership, US citizen or authorized to work in the US.',
    award:'Paid internship (~$5,500 total) + all-expenses DC Leadership Summit', deadline:'Jan 31, 2027', deadlineDate:'2027-01-31',
    tips:'The internship is at a nonprofit, not a bank — but Bank of America\'s brand makes it a strong resume item. Focus your application essay on a specific community problem you want to solve. Very competitive — ~400 out of thousands selected.',
    url:'https://about.bankofamerica.com/en/making-an-impact/student-leaders',
    grades:['11th Grade','12th Grade'], minGPA:0,
    interests:['Business','Finance','Social Justice'], featured:false },

  { id:'michigan-ross-bsa', name:'Michigan Ross Summer Business Academy', organization:'University of Michigan Ross School of Business',
    type:'program', awardValue:0,
    description:'A one-week immersive business program at the University of Michigan for rising high school juniors and seniors. Students experience a real business school curriculum with case studies, team projects, and networking with Ross faculty.',
    eligibility:'Rising 11th or 12th grader interested in business. Strong academics. Financial aid available. No specific GPA requirement.',
    award:'Program experience (financial aid available)', deadline:'Apr 2027', deadlineDate:'2027-04-01',
    tips:'Michigan Ross is one of the top 5 US undergraduate business programs. If you\'re considering applying there, attending this program is a meaningful signal of fit — and gives you specific details to write about in your application.',
    url:'https://michiganross.umich.edu/undergraduate/summer-business-academy',
    grades:['10th Grade','11th Grade'], minGPA:0,
    interests:['Business','Finance','Math'], featured:false },

  { id:'columbia-bschool-summer', name:'Columbia Business School Summer Programs', organization:'Columbia University',
    type:'program', awardValue:0, nyc:true,
    description:'Columbia Business School offers high school programs through Columbia\'s precollege division, giving NYC and national students access to business school faculty, Wall Street proximity, and the Columbia network in the heart of Manhattan.',
    eligibility:'High school students in grades 9–12. Various programs run from 1–6 weeks. Financial aid and scholarships available. New York location is a significant advantage for local students.',
    award:'Program-based (scholarships available)', deadline:'Mar 2027', deadlineDate:'2027-03-15',
    tips:'As a NYC student, you can attend without travel costs — a major advantage. Focus your application on why Columbia\'s New York City location matters for your specific business interests (finance, media, tech, etc.).',
    url:'https://precollege.sps.columbia.edu/programs',
    grades:['9th Grade','10th Grade','11th Grade','12th Grade'], minGPA:0,
    interests:['Business','Finance','Computer Science'], featured:false },

  { id:'nyu-stern-summer', name:'NYU Stern Future Business Leaders', organization:'NYU Stern School of Business',
    type:'program', awardValue:0, nyc:true,
    description:'NYU Stern\'s precollege business programs immerse high school students in business education in New York City — the global capital of finance, media, and entrepreneurship. Programs include finance, entrepreneurship, and global business tracks.',
    eligibility:'High school students in grades 9–12. Located in downtown Manhattan. Priority consideration often given to NYC-area students. Financial aid available.',
    award:'Program experience + NYU campus access', deadline:'Apr 2027', deadlineDate:'2027-04-15',
    tips:'Being a NYC student applying to a NYC program is actually a talking point — explain how you\'ve engaged with the city\'s business ecosystem. Visit NYU Stern\'s campus on Washington Square Park beforehand.',
    url:'https://www.stern.nyu.edu/programs-admissions/undergraduate/admitted-students/pre-college-programs',
    grades:['9th Grade','10th Grade','11th Grade','12th Grade'], minGPA:0,
    interests:['Business','Finance','Computer Science','Social Justice'], featured:false },

  { id:'national-econ-challenge', name:'National Economics Challenge', organization:'Council for Economic Education',
    type:'competition', awardValue:3000,
    description:'The nation\'s only economics competition for high school students, testing knowledge in micro and macroeconomics, international economics, and current events. Winning teams earn scholarships and recognition from top economists.',
    eligibility:'High school students in any grade. Teams of 2–4 students. Competition moves from school to state to national championships. No prior economics course required.',
    award:'Cash prizes up to $3,000 + scholarships + national recognition', deadline:'Feb 2027', deadlineDate:'2027-02-15',
    tips:'The test combines AP-level economics with real-world current events. Read The Wall Street Journal and The Economist regularly. Form a team with people who have different economic interests — macro vs. micro specialists win.',
    url:'https://councilforeconed.org/programs/for-students/national-economic-challenge/',
    grades:['9th Grade','10th Grade','11th Grade','12th Grade'], minGPA:0,
    interests:['Business','Finance','Math','Social Justice'], featured:false },

  { id:'sifma-stock-market', name:'SIFMA Foundation Stock Market Game', organization:'SIFMA Foundation',
    type:'competition', awardValue:1000,
    description:'The Stock Market Game gives students a virtual $100,000 portfolio to invest in real market conditions over 10 weeks. Teams compete to generate the best returns while learning fundamental investing and financial literacy.',
    eligibility:'Students in grades 4–12. School-based teams. Competitions held in spring and fall. Free to participate through teacher registration.',
    award:'Cash prizes up to $1,000 per team + certificates', deadline:'Rolling', deadlineDate:null,
    tips:'Fundamental analysis beats speculation in this game — research actual companies. Track earnings reports and sector news. Winning teams typically use a mixed strategy: growth stocks plus a sector hedge.',
    url:'https://www.stockmarketgame.org',
    grades:['9th Grade','10th Grade','11th Grade','12th Grade'], minGPA:0,
    interests:['Business','Finance','Math'], featured:false },

  { id:'girls-who-invest', name:'Girls Who Invest Summer Intensive', organization:'Girls Who Invest',
    type:'program', awardValue:0,
    description:'A competitive 10-week program that trains underrepresented women in investment management and finance. Combines intensive coursework with a paid internship at a top asset management firm (Blackrock, Vanguard, etc.).',
    eligibility:'Women who are college freshmen or sophomores majoring in any field with genuine interest in investment management. GPA of 3.0+. Open to underrepresented groups in finance.',
    award:'Free program + paid internship placement at partner firms', deadline:'Dec 2026', deadlineDate:'2026-12-01',
    tips:'This program is highly selective and very prestigious in the finance world. Essays should show specific curiosity about investment management — not just "finance generally." Prior exposure through clubs or competitions matters.',
    url:'https://girlswhoinvest.org',
    grades:['College Freshman','College Sophomore'], minGPA:3.0,
    interests:['Business','Finance','Math'], featured:false },

  { id:'tuck-bridge', name:'Tuck Business Bridge Program', organization:'Dartmouth Tuck School of Business',
    type:'program', awardValue:0,
    description:'An intensive two-week summer business program at Dartmouth\'s Tuck School for college students from non-business majors. One of the best ways to experience MBA-style education before applying to business school.',
    eligibility:'Current college sophomore, junior, or senior not majoring in business. Strong academic record. Competitive acceptance rate — 30%.',
    award:'Program (partial scholarships for underrepresented students)', deadline:'Mar 2027', deadlineDate:'2027-03-01',
    tips:'Tuck Bridge is especially useful if you\'re a STEM major or humanities major considering an MBA path. Essays should explain why you want business skills alongside your primary field.',
    url:'https://bridge.tuck.dartmouth.edu/',
    grades:['College Sophomore','College Junior','College Senior'], minGPA:3.0,
    interests:['Business','Finance','Engineering','Computer Science'], featured:false },

  { id:'nyc-urban-fellows', name:'NYC Urban Fellows Program', organization:'New York City Mayor\'s Office',
    type:'internship', awardValue:6000, nyc:true,
    description:'A highly selective fellowship placing outstanding college seniors and recent graduates in New York City government agencies for 9 months. Fellows work on real policy challenges across housing, economic development, and more.',
    eligibility:'College senior or recent graduate, strong academic achievement, commitment to public service and New York City. Stipend provided. Extremely competitive.',
    award:'$6,000 monthly stipend for 9 months', deadline:'Dec 2026', deadlineDate:'2026-12-15',
    tips:'This is the most competitive NYC government fellowship. Essays must show deep knowledge of specific NYC policy issues and a compelling vision for the city. Past NYC internship experience is a major advantage.',
    url:'https://www.nyc.gov/site/dcas/employment/internship-and-fellowships-nyc-urban-fellows.page',
    grades:['College Senior'], minGPA:0,
    interests:['Business','Social Justice','Law','Finance'], featured:false },

  { id:'nyc-economic-innovation', name:'New York City Entrepreneurship Awards', organization:'NFTE (Network for Teaching Entrepreneurship)',
    type:'competition', awardValue:10000, nyc:true,
    description:'NFTE\'s annual NYC entrepreneurship competition where student-entrepreneurs pitch their business concepts to panels of investors and business leaders. NYC-area students compete for seed funding and mentorship.',
    eligibility:'High school students in NYC, any grade. Must submit a business plan and present to judges. Open to all income levels. Schools with NFTE programs get automatic entry.',
    award:'Up to $10,000 seed funding + year-long mentorship', deadline:'Apr 2027', deadlineDate:'2027-04-01',
    tips:'Judges are actual NYC investors and entrepreneurs — treat the pitch like a real investment pitch. Have a specific, testable business model. NYC students have a real home-field advantage in this competition.',
    url:'https://nfte.com',
    grades:['9th Grade','10th Grade','11th Grade','12th Grade'], minGPA:0,
    interests:['Business','Finance','Computer Science','Engineering'], featured:false },

  { id:'jpmorgan-force-for-good', name:'JPMorgan Chase Force for Good Fellowship', organization:'JPMorgan Chase',
    type:'internship', awardValue:5000, nyc:true,
    description:'JPMorgan Chase\'s Force for Good program supports high school and college students from underserved communities in gaining exposure to financial services careers through workshops, mentorship, and paid internship opportunities.',
    eligibility:'High school juniors and seniors or college students, from underrepresented backgrounds, interest in finance or business, strong work ethic and leadership qualities.',
    award:'Paid experience ($5,000+) + mentorship + career network', deadline:'Nov 30, 2026', deadlineDate:'2026-11-30',
    tips:'JPMorgan specifically targets NYC and other major cities. Emphasize your commitment to using finance for social good — the program is aligned with economic equity. Prior financial literacy (even self-taught) is a differentiator.',
    url:'https://careers.jpmorgan.com/us/en/students',
    grades:['11th Grade','12th Grade','College Freshman','College Sophomore'], minGPA:0,
    interests:['Business','Finance','Social Justice'], featured:false },

  // ────────────── NEW ADDITIONS ──────────────────────

  { id:'burger-king-scholars', name:'Burger King Scholars Program', organization:'Burger King McLamore Foundation',
    type:'scholarship', awardValue:50000,
    description:'One of the largest fast-food industry scholarship programs in the US, awarding substantial scholarships to high school seniors who demonstrate academic achievement, community involvement, and a strong work ethic.',
    eligibility:'High school senior, US or Canadian citizen/permanent resident, planning to attend an accredited 2- or 4-year college. Open to Burger King restaurant employees, their children, and all qualifying high school seniors.',
    award:'$1,000 – $50,000', deadline:'Dec 1, 2026', deadlineDate:'2026-12-01',
    tips:'The high school senior track focuses equally on community involvement and academic performance. Be specific about leadership roles and the impact you created. The program awards multiple tiers — even non-top awards are meaningful.',
    url:'https://scholarships.bkmclamorefoundation.org',
    grades:['12th Grade'], minGPA:3.0,
    interests:['Business','Social Justice','STEM','Arts'], featured:false },

  { id:'horatio-alger-scholarship', name:'Horatio Alger National Scholars Program', organization:'Horatio Alger Association',
    type:'scholarship', awardValue:25000,
    description:'Awarded to students who have demonstrated integrity, perseverance, and determination to overcome significant adversity. One of the few major national scholarships that explicitly prioritizes character over grades.',
    eligibility:'High school student entering senior year, US citizen, demonstrated critical financial need, minimum 2.0 GPA, active community involvement. Must have faced and overcome serious adversity in their lives.',
    award:'$25,000', deadline:'Oct 25, 2026', deadlineDate:'2026-10-25',
    tips:'This scholarship is specifically designed for students who have overcome hardship — poverty, family instability, serious illness, or other obstacles. Be honest and specific about the challenges you have faced. Academic transcripts are not the deciding factor here.',
    url:'https://scholars.horatioalger.org',
    grades:['11th Grade','12th Grade'], minGPA:2.0,
    interests:['STEM','Arts','Business','Medicine','Social Justice'], featured:false },

  { id:'swe-scholarships', name:'Society of Women Engineers Scholarships', organization:'Society of Women Engineers',
    type:'scholarship', awardValue:15000,
    description:'SWE awards over $1.5 million in scholarships annually to women pursuing engineering and computer science degrees. Dozens of individual scholarships are available through a single application, sponsored by major engineering companies.',
    eligibility:'Women planning to study or currently enrolled in an ABET-accredited engineering or CS program. Most awards require 3.0+ GPA. US and international students. Multiple award tiers for incoming freshmen through senior year.',
    award:'$1,000 – $15,000 per award (multiple awards possible)', deadline:'Feb 15, 2027', deadlineDate:'2027-02-15',
    tips:'Apply through SWE\'s single scholarship portal to automatically be considered for dozens of awards. Tailor essays to the sponsoring company\'s industry. Engineering-specific community involvement (robotics teams, math clubs) strengthens applications significantly.',
    url:'https://swe.org/scholarships/',
    grades:['12th Grade','College Freshman','College Sophomore','College Junior','College Senior'], minGPA:3.0,
    interests:['Engineering','Computer Science','STEM','Math'], featured:false },

  { id:'jane-street-insight', name:'Jane Street INSIGHT Program', organization:'Jane Street',
    type:'internship', awardValue:0,
    description:'A four-day immersive educational program at Jane Street\'s New York City headquarters for college students interested in quantitative trading, software engineering, and research. Includes trading simulations, math workshops, and direct access to full-time traders and engineers.',
    eligibility:'College sophomore or junior with strong interest in math, CS, statistics, or economics. No prior trading or finance experience required. Competitive application — admits ~100 students per cohort.',
    award:'Fully funded (flights, hotel, meals) + direct pipeline to summer internship offers',
    deadline:'Oct 15, 2026', deadlineDate:'2026-10-15',
    tips:'Jane Street values mathematical and logical reasoning over finance knowledge. The application typically includes a short-form questionnaire and a logic/probability problem set. Practice quantitative puzzles. Top participants routinely receive full-time internship offers.',
    url:'https://www.janestreet.com/insight/',
    grades:['College Sophomore','College Junior'], minGPA:0,
    interests:['Math','Computer Science','Finance','STEM','Research'], featured:false },

  { id:'capital-one-summit', name:'Capital One Summit for Developing Leaders', organization:'Capital One',
    type:'internship', awardValue:0,
    description:'A three-day immersive program at Capital One\'s McLean, Virginia headquarters for college freshmen and sophomores from underrepresented groups. Students experience Capital One\'s engineering and business culture through workshops, case challenges, and networking with senior employees.',
    eligibility:'College freshman or sophomore from underrepresented groups, interest in technology or business, minimum 3.0 GPA. Any major considered — the program places students in both technical and business tracks.',
    award:'Fully funded (travel, hotel, meals) + fast-track to summer internship offer',
    deadline:'Nov 15, 2026', deadlineDate:'2026-11-15',
    tips:'This is one of the most direct pipelines to a Capital One summer internship. Prepare to discuss how technology is changing financial services. Bring specific examples of problems you\'ve solved — class projects, side projects, or extracurriculars all count.',
    url:'https://campus.capitalone.com/summit',
    grades:['College Freshman','College Sophomore'], minGPA:3.0,
    interests:['Computer Science','Business','Finance','Engineering','STEM'], featured:false },

  { id:'blackrock-summer-analyst', name:'BlackRock Summer Analyst Program', organization:'BlackRock',
    type:'internship', awardValue:8000,
    description:'A 10-week paid summer analyst internship at the world\'s largest asset management firm. Analysts are placed across technology, portfolio management, risk analytics, and business strategy, working on real projects with tangible business impact.',
    eligibility:'Penultimate-year college student (rising junior for most tracks). Strong academic record and genuine interest in finance, technology, or data analytics. Competitive — accepts several hundred analysts globally.',
    award:'Paid (~$8,000+/month)', deadline:'Oct 31, 2026', deadlineDate:'2026-10-31',
    tips:'BlackRock values both analytical precision and communication ability. Research the Aladdin platform and its role in institutional investing before your interview — it demonstrates you understand the business. Behavioral interviews are as important as technical ones.',
    url:'https://careers.blackrock.com/early-careers',
    grades:['College Junior','College Senior'], minGPA:3.3,
    interests:['Finance','Business','Computer Science','Math','STEM'], featured:false },

  { id:'summer-science-program', name:'Summer Science Program (SSP)', organization:'Summer Science Program Inc.',
    type:'program', awardValue:0,
    description:'One of the most academically demanding residential summer programs in the world. Rising seniors spend 39 days at a major university working in research teams to solve a real astrophysics or biochemistry problem — tracking a near-Earth asteroid\'s orbit or determining a protein\'s molecular structure using spectroscopy.',
    eligibility:'Rising 12th grader with exceptional ability in math and science. US and international students. Competitive ~10% acceptance rate. Generous need-based financial aid; fully funded for low-income students.',
    award:'Full financial aid available (free for families with income under $75,000)',
    deadline:'Feb 1, 2027', deadlineDate:'2027-02-01',
    tips:'SSP is looking for genuine scientific passion and raw mathematical ability — not just good grades. The application includes a challenging problem set. Describe a specific scientific question that genuinely fascinates you. Prior science fair or olympiad experience helps significantly.',
    url:'https://summerscience.org',
    grades:['11th Grade'], minGPA:0,
    interests:['STEM','Math','Research','Engineering','Computer Science'], featured:true },

  { id:'promys', name:'PROMYS — Program in Mathematics for Young Scientists', organization:'Boston University',
    type:'program', awardValue:0,
    description:'A rigorous six-week residential mathematics program at Boston University for high school students with exceptional mathematical talent. Students explore deep mathematical ideas — primarily number theory and algebra — far beyond the standard curriculum, with a focus on independent discovery rather than instruction.',
    eligibility:'High school students in grades 9–11. Admitted based entirely on performance on a challenging problem set. No calculus required — only curiosity and determination. Need-based aid available.',
    award:'Need-based financial aid available (full scholarships for low-income students)',
    deadline:'Mar 1, 2027', deadlineDate:'2027-03-01',
    tips:'The admissions problem set is the only criterion. Your ability to reason rigorously and write clear mathematical proofs matters more than getting every answer right. Partial work that shows genuine thinking is valued. Past participants describe PROMYS as one of the most intellectually formative experiences of their lives.',
    url:'https://promys.org',
    grades:['9th Grade','10th Grade','11th Grade'], minGPA:0,
    interests:['Math','Research','STEM','Computer Science'], featured:false },

  { id:'canada-usa-mathcamp', name:'Canada/USA Mathcamp', organization:'Mathcamp Inc.',
    type:'program', awardValue:0,
    description:'A five-week intensive residential summer program for mathematically talented students ages 13–18. Students explore advanced topics ranging from algebraic geometry to combinatorics to theoretical computer science alongside world-class faculty and a vibrant community of mathematical peers.',
    eligibility:'Students aged 13–18 with strong mathematical ability. US and Canadian residents and international students. Admitted based on performance on the Qualifying Quiz. Significant need-based aid available.',
    award:'Need-based financial aid available (full aid for low-income families)',
    deadline:'Mar 15, 2027', deadlineDate:'2027-03-15',
    tips:'The Qualifying Quiz tests creative problem-solving, not curriculum coverage. Don\'t worry if you haven\'t taken calculus — the questions reward novel thinking about patterns and proofs. Mathcamp alumni consistently place into top universities and STEM careers.',
    url:'https://www.mathcamp.org',
    grades:['9th Grade','10th Grade','11th Grade','12th Grade'], minGPA:0,
    interests:['Math','Research','STEM','Computer Science'], featured:false },

  { id:'iowa-young-writers', name:"Iowa Young Writers' Studio", organization:'University of Iowa',
    type:'program', awardValue:0,
    description:'One of the most prestigious creative writing programs for high school students in the world, run by the University of Iowa Writers\' Workshop — the top-ranked MFA program in the US. Students work directly with published authors in fiction, nonfiction, and poetry workshops.',
    eligibility:'High school students completing grades 9–12. US and international students. Admitted based on a portfolio of original creative writing. No specific GPA required — writing quality is the sole criterion.',
    award:'Need-based financial aid available',
    deadline:'Mar 1, 2027', deadlineDate:'2027-03-01',
    tips:'Your writing portfolio is everything. Submit work that reveals your authentic voice, not what you think admissions wants to read. The Studio values risk-taking and originality over polished imitation. Submit your most personal and specific work — not your most "impressive" essay.',
    url:'https://iywstudio.org',
    grades:['9th Grade','10th Grade','11th Grade','12th Grade'], minGPA:0,
    interests:['Writing','Arts','Social Justice'], featured:false },

  { id:'poetry-out-loud', name:'Poetry Out Loud National Recitation Contest', organization:'National Endowment for the Arts',
    type:'competition', awardValue:20000,
    description:'A national arts education program and competition that challenges students to learn about great poetry through memorization and performance. The competition advances from classroom to school to regional to state championships, with state winners competing at the national finals in Washington D.C.',
    eligibility:'High school students in grades 9–12 at a school enrolled in the program. Schools can register for free. Open to all US states and territories. No prior performance experience needed.',
    award:'National champion: $20,000. State champions: $200 cash + $500 for school poetry materials',
    deadline:'Jan 15, 2027', deadlineDate:'2027-01-15',
    tips:'Choose poems you genuinely connect with — judges notice authentic emotional resonance. Memorization must be flawless. Practice performing in front of live audiences as much as possible. Pacing, voice projection, and physical presence count as much as accuracy.',
    url:'https://www.poetryoutloud.org',
    grades:['9th Grade','10th Grade','11th Grade','12th Grade'], minGPA:0,
    interests:['Writing','Arts','Social Justice'], featured:false },

  { id:'zero-robotics', name:'Zero Robotics High School Tournament', organization:'MIT / NASA / ESA',
    type:'competition', awardValue:0,
    description:'Students write software that programs SPHERES (Synchronized Position Hold, Engage, Reorient, Experimental Satellites) robots aboard the International Space Station. Teams compete through virtual simulation rounds, with finalists having their actual code executed on the ISS by NASA astronauts.',
    eligibility:'High school students worldwide. Teams of 2–10 students with a teacher or mentor. Requires basic programming ability (C-based). Free to participate. No prior robotics experience necessary.',
    award:'Finalist code runs live on the ISS + NASA/ESA recognition + MIT certificates',
    deadline:'Oct 1, 2026', deadlineDate:'2026-10-01',
    tips:'The game challenge changes every year based on a new NASA mission objective. Study the year\'s game rules carefully before writing code. Teams that simulate their code extensively before the virtual competition rounds perform significantly better. The ISS test run for finalists is a genuinely once-in-a-lifetime experience.',
    url:'https://zerorobotics.mit.edu',
    grades:['9th Grade','10th Grade','11th Grade','12th Grade'], minGPA:0,
    interests:['Computer Science','Engineering','STEM','Math','Research'], featured:false },

];

// ══════════════════════════════════════════════════════
// MATCH ALGORITHM
// ══════════════════════════════════════════════════════

function calculateMatch(opp, profile) {
  if (!profile || Object.keys(profile).length === 0) return 72;

  const grade = profile.grade || '';
  const gpa   = parseFloat(profile.gpa) || 0;
  const interests = profile.interests || [];

  // Grade eligibility (40 pts)
  const gradeOK = !opp.grades.length || !grade || opp.grades.includes(grade);
  let score = gradeOK ? 50 : 20;

  // GPA (15 pts)
  if (opp.minGPA === 0) {
    score += 12; // no req = good
  } else if (gpa > 0) {
    if (gpa >= opp.minGPA + 0.3) score += 15;
    else if (gpa >= opp.minGPA)   score += 10;
    else score -= 15;
  } else {
    score += 6; // unknown gpa
  }

  // Interest overlap (35 pts)
  if (opp.interests.length > 0) {
    if (interests.length > 0) {
      const overlap = opp.interests.filter(i => interests.includes(i)).length;
      const ratio   = overlap / opp.interests.length;
      score += Math.round(35 * Math.min(ratio * 1.5, 1));
    } else {
      score += 12; // neutral
    }
  } else {
    score += 12;
  }

  return Math.max(38, Math.min(99, score));
}

// ══════════════════════════════════════════════════════
// DEADLINE HELPERS
// ══════════════════════════════════════════════════════

function getDeadlineUrgency(opp) {
  if (!opp.deadlineDate) {
    return { label: opp.deadline || 'Rolling', cls: 'deadline-rolling', days: null };
  }
  const today    = new Date();
  today.setHours(0, 0, 0, 0);
  const deadline = new Date(opp.deadlineDate + 'T00:00:00');
  const days = Math.ceil((deadline - today) / 86400000);

  if (days < 0)   return { label: 'Closed',         cls: 'deadline-closed',  days };
  if (days <= 30) return { label: `${days}d left`,  cls: 'deadline-red',     days };
  if (days <= 60) return { label: `${days}d left`,  cls: 'deadline-yellow',  days };
  return              { label: opp.deadline,         cls: 'deadline-green',   days };
}

function getDeadlineColor(type) {
  return { scholarship:'var(--c-scholarship)', internship:'var(--c-internship)',
           program:'var(--c-program)', competition:'var(--c-competition)' }[type] || '#666';
}

function getDifficulty(opp) {
  if (opp.minGPA >= 3.5) return { label: 'Selective',    cls: 'diff-high' };
  if (opp.minGPA >= 3.0) return { label: 'Competitive',  cls: 'diff-mid' };
  return                        { label: 'Open',          cls: 'diff-open' };
}

function getLocationTag(opp) {
  return opp.nyc ? 'NYC' : 'Nationwide';
}

function gradeShort(opp) {
  const g = opp.grades;
  if (!g || g.length === 0) return 'All Grades';
  const hsMap = { '9th Grade':9, '10th Grade':10, '11th Grade':11, '12th Grade':12 };
  const hs = g.filter(x => hsMap[x]).map(x => hsMap[x]).sort((a,b) => a-b);
  const col = g.some(x => x.startsWith('College'));
  if (hs.length === 0) return col ? 'College' : 'All Grades';
  if (hs.length === 4 && col) return 'All';
  if (hs.length === 4) return 'HS';
  if (hs.length === 1) return `${hs[0]}th`;
  return `${hs[0]}th–${hs[hs.length-1]}th`;
}

// ══════════════════════════════════════════════════════
// AUTH  (Supabase-backed accounts — real, cross-device)
// ══════════════════════════════════════════════════════

let currentUser    = null; // Supabase auth user { id, email }
let currentProfile = null; // profiles row { id, username, name, ... }

function getCurrentUser() {
  return currentProfile;
}

async function fetchProfile(userId) {
  const { data, error } = await sb.from('profiles').select('*').eq('id', userId).single();
  if (error) return null;
  return data;
}

async function refreshAuthState() {
  const { data: { session } } = await sb.auth.getSession();
  if (session && session.user) {
    currentUser = session.user;
    currentProfile = await fetchProfile(session.user.id);
    if (currentProfile) {
      currentProfile.email = session.user.email;
      // Keep the local (per-browser) profile name in sync with whichever
      // Scout account is currently signed in, so the greeting/match engine
      // never shows a stale name left over from a previous account.
      const localProfile = getProfile();
      if (currentProfile.name && localProfile.name !== currentProfile.name) {
        localProfile.name = currentProfile.name;
        localStorage.setItem(KEY_PROFILE, JSON.stringify(localProfile));
      }
    }
  } else {
    currentUser = null;
    currentProfile = null;
  }
}

async function signUp(name, username, email, password) {
  const uname = username.trim().toLowerCase();
  if (!/^[a-z0-9_]{3,20}$/.test(uname)) {
    return { error: 'Username must be 3-20 characters: letters, numbers, underscores only.' };
  }

  const { data, error } = await sb.auth.signUp({ email: email.trim(), password });
  if (error) return { error: error.message };
  if (!data.session) return { needsConfirmation: true };

  const { error: profileError } = await sb.from('profiles').insert({
    id: data.user.id,
    username: uname,
    name: name.trim(),
  });
  if (profileError) {
    const taken = profileError.code === '23505' || /duplicate/i.test(profileError.message);
    return { error: taken ? 'That username is taken — try another.' : profileError.message };
  }

  await refreshAuthState(); // also syncs the local profile name
  return { user: currentProfile };
}

async function logIn(email, password) {
  const { error } = await sb.auth.signInWithPassword({ email: email.trim(), password });
  if (error) return { error: error.message };
  await refreshAuthState();
  return { user: currentProfile };
}

async function logOut() {
  await sb.auth.signOut();
  currentUser = null;
  currentProfile = null;
  // Reset auth UI then show overlay
  document.getElementById('signupName').value     = '';
  document.getElementById('signupUsername').value = '';
  document.getElementById('signupEmail').value    = '';
  document.getElementById('signupPassword').value = '';
  document.getElementById('loginEmail').value     = '';
  document.getElementById('loginPassword').value  = '';
  document.getElementById('signupError').classList.add('hidden');
  document.getElementById('loginError').classList.add('hidden');
  // Switch back to signup tab
  document.getElementById('authTabSignup').classList.add('active');
  document.getElementById('authTabLogin').classList.remove('active');
  document.getElementById('signupForm').classList.remove('hidden');
  document.getElementById('loginForm').classList.add('hidden');
  const overlay = document.getElementById('authOverlay');
  overlay.classList.remove('dismissed', 'hidden');
  syncNavUserAvatar();
}

function dismissAuthOverlay() {
  const overlay = document.getElementById('authOverlay');
  overlay.classList.add('dismissed');
  overlay.addEventListener('transitionend', () => overlay.classList.add('hidden'), { once: true });
}

function syncNavUserAvatar() {
  const user  = getCurrentUser();
  const btn   = document.getElementById('navUserAvatar');
  const group = document.getElementById('navRightGroup');
  if (!btn) return;
  if (user) {
    btn.textContent = (user.name || user.username || '?').charAt(0).toUpperCase();
    group?.classList.remove('hidden');
  } else {
    group?.classList.add('hidden');
  }
}

function syncLogoutSection() {
  const user = getCurrentUser();
  const sec  = document.getElementById('logoutSection');
  if (!sec || !user) return;
  const label = user.name || user.username;
  document.getElementById('logoutAvatarCircle').textContent = label.charAt(0).toUpperCase();
  document.getElementById('logoutUserName').textContent     = label;
  document.getElementById('logoutUserEmail').textContent    = '@' + user.username;
}

function showAuthError(el, msg) {
  el.textContent = msg;
  el.classList.remove('hidden');
}

function onAuthReady() {
  syncNavUserAvatar();
  syncLogoutSection();
  syncProfileCompletion();
  setGreeting();
  renderHome();
  renderExplore();
  renderKanban();
  refreshFriendsBadge();
  document.getElementById('navAdminBtn')?.classList.toggle('hidden', !isAdmin());
}

async function initAuth() {
  // Tab switching
  document.getElementById('authTabSignup').addEventListener('click', () => {
    document.getElementById('authTabSignup').classList.add('active');
    document.getElementById('authTabLogin').classList.remove('active');
    document.getElementById('signupForm').classList.remove('hidden');
    document.getElementById('loginForm').classList.add('hidden');
  });
  document.getElementById('authTabLogin').addEventListener('click', () => {
    document.getElementById('authTabLogin').classList.add('active');
    document.getElementById('authTabSignup').classList.remove('active');
    document.getElementById('loginForm').classList.remove('hidden');
    document.getElementById('signupForm').classList.add('hidden');
  });

  // Sign up
  document.getElementById('signupForm').addEventListener('submit', async e => {
    e.preventDefault();
    const name     = document.getElementById('signupName').value.trim();
    const username = document.getElementById('signupUsername').value.trim();
    const email    = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value;
    const errEl    = document.getElementById('signupError');
    const submitBtn = e.target.querySelector('.auth-submit');
    errEl.classList.add('hidden');
    if (!name)                     { showAuthError(errEl, 'Please enter your name.'); return; }
    if (!username)                 { showAuthError(errEl, 'Please choose a username.'); return; }
    if (!email || !email.includes('@')) { showAuthError(errEl, 'Please enter a valid email.'); return; }
    if (password.length < 6)       { showAuthError(errEl, 'Password must be at least 6 characters.'); return; }

    submitBtn.disabled = true;
    const result = await signUp(name, username, email, password);
    submitBtn.disabled = false;

    if (result.error) { showAuthError(errEl, result.error); return; }
    if (result.needsConfirmation) {
      showAuthError(errEl, 'Check your email to confirm your account, then log in.');
      return;
    }
    dismissAuthOverlay();
    onAuthReady();
  });

  // Log in
  document.getElementById('loginForm').addEventListener('submit', async e => {
    e.preventDefault();
    const email    = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    const errEl    = document.getElementById('loginError');
    const submitBtn = e.target.querySelector('.auth-submit');
    errEl.classList.add('hidden');
    if (!email)    { showAuthError(errEl, 'Please enter your email.'); return; }
    if (!password) { showAuthError(errEl, 'Please enter your password.'); return; }

    submitBtn.disabled = true;
    const result = await logIn(email, password);
    submitBtn.disabled = false;

    if (result.error) { showAuthError(errEl, result.error); return; }
    dismissAuthOverlay();
    onAuthReady();
  });

  // Log out
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) logoutBtn.addEventListener('click', () => { logOut(); });

  // Check existing session — skip auth wall if already logged in
  await refreshAuthState();
  if (currentUser) {
    document.getElementById('authOverlay').classList.add('hidden');
    onAuthReady();
  }
}

// ══════════════════════════════════════════════════════
// STATE
// ══════════════════════════════════════════════════════

let currentCat     = 'all';
let currentSort    = 'match';
let searchQuery    = '';
let nycFilter      = false;
let financeFilter  = false;
let gradeFilter    = '';
let deadlineFilter = '';
let openOppId      = null;
let dragId         = null;

// ══════════════════════════════════════════════════════
// BOOTSTRAP
// ══════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
  initDefaultProfile();
  initAuth();
  initTabs();
  initProfileForm();
  initExplore();
  renderHome();
  renderExplore();
  renderKanban();
  initDetailPanel();
  syncSavedBadge();
  syncProfileCompletion();
  setGreeting();
  initSavedSubTabs();
  initModals();
  initCalendar();
  initEssayHelperSettings();
  initFriendsPanel();
  initSharedInnerTabs();
  initAdminPanel();
});

function initDefaultProfile() {
  if (localStorage.getItem(KEY_PROFILE)) return;
  const defaults = {
    name: '',
    grade: '10th Grade',
    gpa: '',
    major: 'Business',
    location: 'New York, NY',
    bio: '',
    interests: ['Business', 'Finance', 'Computer Science', 'Math'],
  };
  localStorage.setItem(KEY_PROFILE, JSON.stringify(defaults));
}

// ══════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════

function initTabs() {
  document.querySelectorAll('[data-tab]').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });
}

function switchTab(name) {
  document.querySelectorAll('[data-tab]').forEach(btn => {
    const isActive = btn.dataset.tab === name;
    btn.classList.toggle('active', isActive);
  });
  document.querySelectorAll('.view').forEach(v => {
    v.classList.toggle('active', v.id === `view-${name}`);
  });

  if (name === 'home')    renderHome();
  if (name === 'explore') renderExplore();
  if (name === 'saved')   renderKanban();
}

// ══════════════════════════════════════════════════════
// HOME
// ══════════════════════════════════════════════════════

function setGreeting() {
  const h = new Date().getHours();
  const g = h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening';
  const p = getProfile();
  const name = p.name ? `, ${p.name.split(' ')[0]}` : '';
  const el = document.getElementById('heroGreeting');
  if (el) el.textContent = g + name;
}

function renderHome() {
  setGreeting();
  const profile = getProfile();
  const saved   = getSaved();

  // Nav count
  document.getElementById('navOppText').textContent = `${OPPORTUNITIES.length} opps`;

  // Platform stats count
  const pstatEl = document.getElementById('pstatOpps');
  if (pstatEl) pstatEl.textContent = `${OPPORTUNITIES.length}+`;

  // Stats
  const scores = OPPORTUNITIES.map(o => calculateMatch(o, profile));
  const avgMatch = Math.round(scores.reduce((a,b) => a+b, 0) / scores.length);

  document.getElementById('statMatch').textContent   = profile.name ? `${avgMatch}%` : '—';
  document.getElementById('statSaved').textContent   = saved.length;

  // Next deadline
  const withDeadlines = OPPORTUNITIES
    .filter(o => o.deadlineDate)
    .map(o => ({ ...o, days: getDeadlineUrgency(o).days }))
    .filter(o => o.days > 0)
    .sort((a,b) => a.days - b.days);

  const nextDl = withDeadlines[0];
  const dlEl = document.getElementById('statDeadline');
  if (nextDl) {
    const u = getDeadlineUrgency(nextDl);
    dlEl.textContent = u.label;
    dlEl.style.color = u.cls === 'deadline-red' ? '#FF5252' :
                       u.cls === 'deadline-yellow' ? '#FFC107' : 'var(--text)';
  } else {
    dlEl.textContent = '—';
  }

  // Hero sub
  const heroSub = document.getElementById('heroSub');
  if (heroSub) {
    heroSub.textContent = profile.name
      ? `${OPPORTUNITIES.length} opportunities · avg ${avgMatch}% match`
      : `${OPPORTUNITIES.length} curated opportunities waiting`;
  }

  // Deadline list (next 3)
  const dlList = document.getElementById('deadlineList');
  dlList.innerHTML = '';
  withDeadlines.slice(0, 3).forEach(opp => {
    const u = getDeadlineUrgency(opp);
    const color = getDeadlineColor(opp.type);
    const item = document.createElement('div');
    item.className = 'deadline-item';
    item.innerHTML = `
      <span class="deadline-type-dot" style="background:${color}"></span>
      <div class="deadline-info">
        <div class="deadline-name">${esc(opp.name)}</div>
        <div class="deadline-org">${esc(opp.organization)}</div>
      </div>
      <span class="deadline-badge ${u.cls}">${esc(u.label)}</span>`;
    item.addEventListener('click', () => openDetail(opp.id));
    dlList.appendChild(item);
  });

  // Top picks: top 6 by match
  const sorted = [...OPPORTUNITIES]
    .map(o => ({ ...o, match: calculateMatch(o, profile) }))
    .sort((a, b) => b.match - a.match)
    .slice(0, 6);

  const homeList = document.getElementById('homeCardsList');
  homeList.innerHTML = '';
  sorted.forEach((opp, i) => {
    const card = buildOppCard(opp, opp.match, i);
    homeList.appendChild(card);
  });

  renderPopular();
  renderFriendFeed();
}

// ══════════════════════════════════════════════════════
// EXPLORE
// ══════════════════════════════════════════════════════

function initExplore() {
  const searchInput  = document.getElementById('searchInput');
  const searchClear  = document.getElementById('searchClear');
  const sortToggle   = document.getElementById('sortToggleBtn');
  const catTabs      = document.getElementById('catTabs');
  const nycBtn       = document.getElementById('nycFilterBtn');
  const financeBtn   = document.getElementById('financeFilterBtn');

  const gradeSelect    = document.getElementById('gradeFilterSelect');
  const deadlineSelect = document.getElementById('deadlineFilterSelect');
  const suggestBtn     = document.getElementById('suggestBtn');

  gradeSelect.addEventListener('change', () => {
    gradeFilter = gradeSelect.value;
    renderExplore();
  });

  deadlineSelect.addEventListener('change', () => {
    deadlineFilter = deadlineSelect.value;
    renderExplore();
  });

  if (suggestBtn) {
    suggestBtn.addEventListener('click', () => {
      window.location.href = 'mailto:reecemsh@gmail.com?subject=Scout%20Opportunity%20Suggestion&body=Name%3A%0AOrganization%3A%0AURL%3A%0ADeadline%3A%0ADescription%3A';
    });
  }

  nycBtn.addEventListener('click', () => {
    nycFilter = !nycFilter;
    nycBtn.classList.toggle('active', nycFilter);
    nycBtn.setAttribute('aria-pressed', nycFilter ? 'true' : 'false');
    renderExplore();
  });

  financeBtn.addEventListener('click', () => {
    financeFilter = !financeFilter;
    financeBtn.classList.toggle('active', financeFilter);
    financeBtn.setAttribute('aria-pressed', financeFilter ? 'true' : 'false');
    renderExplore();
  });

  searchInput.addEventListener('input', () => {
    searchQuery = searchInput.value.trim();
    searchClear.classList.toggle('hidden', !searchQuery);
    renderExplore();
  });

  searchClear.addEventListener('click', () => {
    searchInput.value = '';
    searchQuery = '';
    searchClear.classList.add('hidden');
    renderExplore();
    searchInput.focus();
  });

  sortToggle.addEventListener('click', () => {
    const dd = document.getElementById('sortDropdown');
    const open = !dd.classList.contains('hidden');
    dd.classList.toggle('hidden', open);
    sortToggle.setAttribute('aria-expanded', open ? 'false' : 'true');
  });

  document.getElementById('sortDropdown').addEventListener('click', e => {
    const opt = e.target.closest('.sort-opt');
    if (!opt) return;
    currentSort = opt.dataset.sort;
    document.querySelectorAll('.sort-opt').forEach(o => o.classList.remove('active'));
    opt.classList.add('active');
    document.getElementById('sortLabel').textContent =
      currentSort === 'match' ? 'Match' : currentSort === 'deadline' ? 'Deadline' : 'Award';
    document.getElementById('sortDropdown').classList.add('hidden');
    document.getElementById('sortToggleBtn').setAttribute('aria-expanded', 'false');
    renderExplore();
  });

  catTabs.addEventListener('click', e => {
    const tab = e.target.closest('.cat-tab');
    if (!tab) return;
    currentCat = tab.dataset.cat;
    document.querySelectorAll('.cat-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    renderExplore();
  });
}

function renderExplore() {
  const profile  = getProfile();
  let filtered = OPPORTUNITIES.map(o => ({ ...o, match: calculateMatch(o, profile) }));

  if (currentCat !== 'all')  filtered = filtered.filter(o => o.type === currentCat);
  if (nycFilter)             filtered = filtered.filter(o => o.nyc === true);
  if (financeFilter)         filtered = filtered.filter(o =>
    o.interests.includes('Finance') || o.interests.includes('Business'));

  if (gradeFilter) {
    if (gradeFilter === 'College') {
      filtered = filtered.filter(o => o.grades.some(g => g.startsWith('College')));
    } else {
      filtered = filtered.filter(o => o.grades.includes(gradeFilter));
    }
  }

  if (deadlineFilter) {
    if (deadlineFilter === 'rolling') {
      filtered = filtered.filter(o => !o.deadlineDate);
    } else {
      const days = parseInt(deadlineFilter);
      const today = new Date(); today.setHours(0,0,0,0);
      const cutoff = new Date(today.getTime() + days * 86400000);
      filtered = filtered.filter(o => {
        if (!o.deadlineDate) return false;
        const d = new Date(o.deadlineDate);
        return d >= today && d <= cutoff;
      });
    }
  }

  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(o =>
      o.name.toLowerCase().includes(q) ||
      o.organization.toLowerCase().includes(q) ||
      o.description.toLowerCase().includes(q) ||
      o.interests.some(i => i.toLowerCase().includes(q))
    );
  }

  // Sort
  if (currentSort === 'match') {
    filtered.sort((a,b) => b.match - a.match);
  } else if (currentSort === 'deadline') {
    filtered.sort((a,b) => {
      const da = a.deadlineDate ? new Date(a.deadlineDate).getTime() : Infinity;
      const db = b.deadlineDate ? new Date(b.deadlineDate).getTime() : Infinity;
      return da - db;
    });
  } else if (currentSort === 'award') {
    filtered.sort((a,b) => (b.awardValue || 0) - (a.awardValue || 0));
  }

  const countEl = document.getElementById('resultsCount');
  const catName = currentCat === 'all' ? 'opportunities' : `${currentCat}s`;
  const filterTags = [];
  if (nycFilter)      filterTags.push('NYC');
  if (financeFilter)  filterTags.push('Finance');
  if (gradeFilter)    filterTags.push(gradeFilter);
  if (deadlineFilter) filterTags.push(deadlineFilter === 'rolling' ? 'Rolling' : `${deadlineFilter}d`);
  if (searchQuery)    filterTags.push(`"${searchQuery}"`);
  const suffix = filterTags.length ? ` · ${filterTags.join(' · ')}` : '';
  countEl.textContent = `${filtered.length} ${catName}${suffix}`;

  const list = document.getElementById('exploreList');
  list.innerHTML = '';
  filtered.forEach((opp, i) => {
    const card = buildOppCard(opp, opp.match, i);
    list.appendChild(card);
  });
}

// ══════════════════════════════════════════════════════
// CARD BUILDER
// ══════════════════════════════════════════════════════

function buildOppCard(opp, matchPct, index) {
  const saved  = getSaved();
  const isSaved = saved.some(s => s.id === opp.id);
  const type   = opp.type || 'program';
  const urgency = getDeadlineUrgency(opp);

  const matchCls   = matchPct >= 85 ? 'match-high' :
                     matchPct >= 70 ? 'match-mid' :
                     matchPct >= 55 ? 'match-low-mid' : 'match-low';
  const matchLabel = getMatchLabel(matchPct);

  const diff     = getDifficulty(opp);
  const locTag   = getLocationTag(opp);
  const gradeStr = gradeShort(opp);
  const catIconSvg = getCatIcon(type);

  const card = document.createElement('div');
  card.className = 'opp-card';
  card.style.animationDelay = `${Math.min(index, 8) * 60}ms`;
  card.dataset.id = opp.id;

  card.innerHTML = `
    <div class="opp-card-accent ${type}"></div>
    <div class="opp-card-body">
      <div class="opp-card-top">
        <span class="opp-cat-icon ${type}">${catIconSvg}</span>
        <span class="type-badge ${type}">${capitalise(type)}</span>
        <span class="match-badge ${matchCls}">${matchLabel}</span>
      </div>
      <div class="opp-card-title">${esc(opp.name)}</div>
      <div class="opp-card-org">${esc(opp.organization)}</div>
      <div class="opp-card-meta">
        <span class="deadline-badge ${urgency.cls}">
          ${urgency.cls === 'deadline-red' || urgency.cls === 'deadline-yellow'
            ? '<svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>'
            : ''
          }
          ${esc(urgency.label)}
        </span>
        <span class="award-pill">${esc(opp.award)}</span>
      </div>
      <div class="opp-card-tags">
        <span class="diff-badge ${diff.cls}">${diff.label}</span>
        <span class="loc-tag">${locTag}</span>
        <span class="grade-tag">${gradeStr}</span>
      </div>
      <div class="opp-card-footer">
        <span class="opp-card-detail-hint">Tap for details</span>
        <div class="card-action-row">
          <button class="btn-card-icon btn-share-card" data-id="${esc(opp.id)}" title="Share" aria-label="Share">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
          </button>
          <button class="btn-card-icon btn-remind-card" data-id="${esc(opp.id)}" title="Remind Me" aria-label="Set reminder">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          </button>
          <button class="btn-save ${isSaved ? 'saved' : ''}" data-id="${esc(opp.id)}">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="${isSaved ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
            ${isSaved ? 'Saved' : 'Save'}
          </button>
        </div>
      </div>
    </div>`;

  // Open detail on card click (but not action buttons)
  card.addEventListener('click', e => {
    if (e.target.closest('.btn-save') || e.target.closest('.btn-card-icon')) return;
    openDetail(opp.id);
  });

  // Save button
  const saveBtn = card.querySelector('.btn-save');
  saveBtn.addEventListener('click', e => {
    e.stopPropagation();
    if (!isSaved) {
      saveOpportunity(opp.id);
      saveBtn.classList.add('saved');
      saveBtn.innerHTML = `
        <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
        Saved`;
      syncSavedBadge();
    }
  });

  // Share button
  card.querySelector('.btn-share-card').addEventListener('click', e => {
    e.stopPropagation();
    openShareModal(opp.id);
  });

  // Remind button
  card.querySelector('.btn-remind-card').addEventListener('click', e => {
    e.stopPropagation();
    openRemindModal(opp.id);
  });

  return card;
}

function getCatIcon(type) {
  const icons = {
    scholarship: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`,
    internship:  `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>`,
    program:     `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
    competition: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 21h8M12 17v4M7 4H4l3 7a5 5 0 0 0 10 0l3-7h-3"/><path d="M5 4h14"/></svg>`,
  };
  return icons[type] || icons.program;
}

// ══════════════════════════════════════════════════════
// SAVED / KANBAN
// ══════════════════════════════════════════════════════

function renderKanban() {
  const saved   = getSaved();
  const profile = getProfile();
  const cols    = ['Interested','Applied','Interview','Accepted','Rejected'];

  // Show/hide empty state
  const isEmpty = saved.length === 0;
  document.getElementById('kanbanBoard').classList.toggle('hidden', isEmpty);
  document.getElementById('savedEmpty').classList.toggle('hidden', !isEmpty);

  // Update header meta
  const applied  = saved.filter(s => s._status === 'Applied').length;
  const accepted = saved.filter(s => s._status === 'Accepted').length;
  document.getElementById('savedMeta').innerHTML =
    saved.length ? `<strong>${saved.length}</strong> saved · <strong>${applied}</strong> applied · <strong>${accepted}</strong> accepted` : '';

  // Clear columns
  cols.forEach(col => {
    const body  = document.getElementById(`col-${col}`);
    const cards = body.querySelectorAll('.kanban-card');
    cards.forEach(c => c.remove());
    document.getElementById(`count-${col}`).textContent = 0;
  });

  // Populate
  cols.forEach(status => {
    const colOpps = saved.filter(s => s._status === status);
    document.getElementById(`count-${status}`).textContent = colOpps.length;
    const body = document.getElementById(`col-${status}`);
    colOpps.forEach(s => {
      const opp = OPPORTUNITIES.find(o => o.id === s.id);
      if (!opp) return;
      const match = calculateMatch(opp, profile);
      const card  = buildKanbanCard(opp, match, s._status);
      body.appendChild(card);
    });
  });

  syncSavedBadge();
}

function buildKanbanCard(opp, match, currentStatus) {
  const urgency = getDeadlineUrgency(opp);
  const card    = document.createElement('div');
  card.className = 'kanban-card';
  card.draggable  = true;
  card.dataset.id = opp.id;

  const existingNote = getNote(opp.id);

  card.innerHTML = `
    <div class="kanban-card-accent ${opp.type}"></div>
    <div class="kanban-card-name">${esc(opp.name)}</div>
    <div class="kanban-card-org">${esc(opp.organization)}</div>
    <div class="kanban-card-footer">
      <span class="kanban-card-deadline deadline-badge ${urgency.cls}">${esc(urgency.label)}</span>
      <button class="kanban-card-remove" title="Remove" data-id="${esc(opp.id)}">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
    <div class="kanban-note-wrap">
      <textarea class="kanban-note-input" placeholder="Add a note…" rows="2">${esc(existingNote)}</textarea>
    </div>`;

  // Desktop drag
  card.addEventListener('dragstart', e => {
    dragId = opp.id;
    card.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
  });
  card.addEventListener('dragend', () => {
    card.classList.remove('dragging');
    document.querySelectorAll('.kanban-col-body').forEach(b => b.classList.remove('drag-over'));
  });

  // Click to open detail
  card.addEventListener('click', e => {
    if (e.target.closest('.kanban-card-remove')) return;
    openDetail(opp.id);
  });

  // Remove
  card.querySelector('.kanban-card-remove').addEventListener('click', e => {
    e.stopPropagation();
    removeSaved(opp.id);
    renderKanban();
  });

  // Note — auto-save on blur, stop propagation so clicks don't open detail
  const noteInput = card.querySelector('.kanban-note-input');
  noteInput.addEventListener('click', e => e.stopPropagation());
  noteInput.addEventListener('touchstart', e => e.stopPropagation(), { passive: true });
  noteInput.addEventListener('blur', () => saveNote(opp.id, noteInput.value));

  // Touch drag
  setupTouchDrag(card, opp.id);

  return card;
}

// Drag-over highlight
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.kanban-col-body').forEach(body => {
    body.addEventListener('dragover', () => body.classList.add('drag-over'));
    body.addEventListener('dragleave', () => body.classList.remove('drag-over'));
  });
});

function handleDrop(event, status) {
  event.preventDefault();
  document.querySelectorAll('.kanban-col-body').forEach(b => b.classList.remove('drag-over'));
  if (!dragId) return;

  const prevStatus = getSaved().find(s => s.id === dragId)?._status;
  updateSavedStatus(dragId, status);
  renderKanban();

  if (status === 'Accepted' && prevStatus !== 'Accepted') {
    launchConfetti();
  }
  dragId = null;
}

// Touch drag implementation
function setupTouchDrag(card, id) {
  let ghost = null;
  let dragging = false;
  let longPressTimer = null;
  let startX, startY;

  card.addEventListener('touchstart', e => {
    const touch = e.touches[0];
    startX = touch.clientX;
    startY = touch.clientY;

    longPressTimer = setTimeout(() => {
      dragging = true;
      ghost = card.cloneNode(true);
      ghost.style.cssText = `
        position:fixed; z-index:500; opacity:0.9; pointer-events:none;
        width:${card.offsetWidth}px; transform:scale(1.04) rotate(2deg);
        left:${touch.clientX - card.offsetWidth/2}px;
        top:${touch.clientY - 40}px;
        transition: none; box-shadow: 0 16px 40px rgba(0,0,0,0.5);`;
      document.body.appendChild(ghost);
      card.style.opacity = '0.4';
      if (navigator.vibrate) navigator.vibrate(50);
    }, 300);
  }, { passive: true });

  card.addEventListener('touchmove', e => {
    const touch = e.touches[0];
    const dx = Math.abs(touch.clientX - startX);
    const dy = Math.abs(touch.clientY - startY);

    if (!dragging && (dx > 8 || dy > 8)) {
      clearTimeout(longPressTimer);
      return;
    }

    if (!dragging || !ghost) return;
    e.preventDefault();
    ghost.style.left = `${touch.clientX - ghost.offsetWidth/2}px`;
    ghost.style.top  = `${touch.clientY - 50}px`;

    // Highlight target column
    document.querySelectorAll('.kanban-col-body').forEach(b => b.classList.remove('drag-over'));
    const el = document.elementFromPoint(touch.clientX, touch.clientY);
    el?.closest('.kanban-col-body')?.classList.add('drag-over');
  }, { passive: false });

  card.addEventListener('touchend', e => {
    clearTimeout(longPressTimer);
    if (!dragging || !ghost) { dragging = false; return; }

    const touch = e.changedTouches[0];
    ghost.remove();
    ghost = null;
    card.style.opacity = '';
    dragging = false;

    document.querySelectorAll('.kanban-col-body').forEach(b => b.classList.remove('drag-over'));
    const el = document.elementFromPoint(touch.clientX, touch.clientY);
    const col = el?.closest('[data-status]');

    if (col) {
      const newStatus = col.dataset.status;
      const prevStatus = getSaved().find(s => s.id === id)?._status;
      updateSavedStatus(id, newStatus);
      renderKanban();
      if (newStatus === 'Accepted' && prevStatus !== 'Accepted') launchConfetti();
    }
  }, { passive: true });

  card.addEventListener('touchcancel', () => {
    clearTimeout(longPressTimer);
    if (ghost) { ghost.remove(); ghost = null; }
    card.style.opacity = '';
    dragging = false;
    document.querySelectorAll('.kanban-col-body').forEach(b => b.classList.remove('drag-over'));
  }, { passive: true });
}

// ══════════════════════════════════════════════════════
// DETAIL PANEL
// ══════════════════════════════════════════════════════

function initDetailPanel() {
  document.getElementById('detailClose').addEventListener('click', closeDetail);
  document.getElementById('detailOverlay').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeDetail();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && openOppId) closeDetail();
  });
}

function openDetail(id) {
  const opp = OPPORTUNITIES.find(o => o.id === id);
  if (!opp) return;
  openOppId = id;

  const profile = getProfile();
  const match   = calculateMatch(opp, profile);
  const urgency = getDeadlineUrgency(opp);
  const matchCls = match >= 85 ? 'match-high' : match >= 70 ? 'match-mid' :
                   match >= 55 ? 'match-low-mid' : 'match-low';

  // Badges
  document.getElementById('detailBadges').innerHTML = `
    <span class="type-badge ${opp.type}">${capitalise(opp.type)}</span>
    <span class="match-badge ${matchCls}">${match}% match</span>`;

  // Content
  document.getElementById('detailTitle').textContent = opp.name;
  document.getElementById('detailOrg').textContent   = opp.organization;

  document.getElementById('detailMetaRow').innerHTML = `
    <span class="deadline-badge ${urgency.cls}">${esc(urgency.label)}</span>
    <span class="award-pill">${esc(opp.award)}</span>`;

  document.getElementById('detailDesc').textContent        = opp.description;
  document.getElementById('detailEligibility').textContent = opp.eligibility;
  document.getElementById('detailTips').textContent        = opp.tips;

  // Apply link
  const applyBtn = document.getElementById('detailApplyBtn');
  applyBtn.href = opp.url;

  // Save button
  const saveBtn    = document.getElementById('detailSaveBtn');
  const saveBtnTxt = document.getElementById('detailSaveBtnText');
  const isSaved    = getSaved().some(s => s.id === id);

  saveBtn.className = 'detail-save-btn' + (isSaved ? ' saved' : '');
  saveBtnTxt.textContent = isSaved ? 'Saved' : 'Save';

  saveBtn.onclick = () => {
    const nowSaved = getSaved().some(s => s.id === id);
    if (!nowSaved) {
      saveOpportunity(id);
      saveBtn.className = 'detail-save-btn saved';
      saveBtnTxt.textContent = 'Saved';
      syncSavedBadge();
      showToast('Saved to tracker');
    }
  };

  // Share button
  document.getElementById('detailShareBtn').onclick = () => openShareModal(id);

  // Remind Me button
  document.getElementById('detailRemindBtn').onclick = () => openRemindModal(id);

  // AI Essay Helper
  const aiResultEl = document.getElementById('aiTipsResult');
  aiResultEl.classList.add('hidden');
  aiResultEl.innerHTML = '';
  document.getElementById('aiTipsBtn').onclick = () => getEssayTips(opp);

  // Notes
  const notesInput = document.getElementById('detailNotesInput');
  notesInput.value = getNote(id);
  notesInput.onblur = () => saveNote(id, notesInput.value);

  // Show panel
  document.getElementById('detailOverlay').classList.remove('hidden');
  document.getElementById('detailScroll')?.scrollTo(0, 0);
  document.querySelector('.detail-scroll')?.scrollTo(0, 0);
  document.body.style.overflow = 'hidden';
}

function closeDetail() {
  document.getElementById('detailOverlay').classList.add('hidden');
  document.body.style.overflow = '';
  openOppId = null;
}

// ══════════════════════════════════════════════════════
// PROFILE
// ══════════════════════════════════════════════════════

function initProfileForm() {
  loadProfileIntoForm();

  document.getElementById('profileForm').addEventListener('submit', e => {
    e.preventDefault();
    saveProfile();
  });

  // Profile pills
  document.querySelectorAll('#profilePills .pill').forEach(p => {
    p.addEventListener('click', () => {
      p.classList.toggle('active');
      syncProfileCompletion();
    });
  });

  // Live completion on input
  ['profileName','profileGrade','profileGpa','profileMajor','profileLocation','profileBio'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', syncProfileCompletion);
    if (el) el.addEventListener('change', syncProfileCompletion);
  });
}

function loadProfileIntoForm() {
  const p = getProfile();
  if (p.name)     document.getElementById('profileName').value     = p.name;
  if (p.grade)    document.getElementById('profileGrade').value    = p.grade;
  if (p.gpa)      document.getElementById('profileGpa').value      = p.gpa;
  if (p.major)    document.getElementById('profileMajor').value    = p.major;
  if (p.location) document.getElementById('profileLocation').value = p.location;
  if (p.bio)      document.getElementById('profileBio').value      = p.bio;
  if (p.interests) {
    document.querySelectorAll('#profilePills .pill').forEach(pill => {
      pill.classList.toggle('active', p.interests.includes(pill.dataset.interest));
    });
  }
  syncProfileCompletion();
}

function saveProfile() {
  const profile = {
    name:      document.getElementById('profileName').value.trim(),
    grade:     document.getElementById('profileGrade').value,
    gpa:       document.getElementById('profileGpa').value,
    major:     document.getElementById('profileMajor').value.trim(),
    location:  document.getElementById('profileLocation').value.trim(),
    bio:       document.getElementById('profileBio').value.trim(),
    interests: [...document.querySelectorAll('#profilePills .pill.active')].map(p => p.dataset.interest),
  };
  localStorage.setItem(KEY_PROFILE, JSON.stringify(profile));
  syncProfileCompletion();

  const toast = document.getElementById('saveConfirm');
  toast.classList.remove('hidden');
  setTimeout(() => toast.classList.add('hidden'), 2800);
}

function syncProfileCompletion() {
  const profile = {
    name:      document.getElementById('profileName')?.value.trim() || '',
    grade:     document.getElementById('profileGrade')?.value || '',
    gpa:       document.getElementById('profileGpa')?.value || '',
    major:     document.getElementById('profileMajor')?.value.trim() || '',
    location:  document.getElementById('profileLocation')?.value.trim() || '',
    bio:       document.getElementById('profileBio')?.value.trim() || '',
    interests: [...(document.querySelectorAll('#profilePills .pill.active') || [])].map(p => p.dataset.interest),
  };

  let pct = 0;
  if (profile.name)                           pct += 20;
  if (profile.grade)                          pct += 15;
  if (profile.gpa)                            pct += 10;
  if (profile.major)                          pct += 15;
  if (profile.location)                       pct += 10;
  if (profile.bio)                            pct += 10;
  if (profile.interests.length >= 2)          pct += 20;
  else if (profile.interests.length === 1)    pct += 10;

  const pctEl   = document.getElementById('completionPct');
  const barFill = document.getElementById('completionBarFill');
  const ringFill= document.getElementById('completionRingFill');
  const avatar  = document.getElementById('completionAvatar');
  const name    = document.getElementById('completionName');
  const sub     = document.getElementById('completionSub');

  if (pctEl)    pctEl.textContent = `${pct}%`;
  if (barFill)  barFill.style.width = `${pct}%`;

  // SVG ring: circumference = 2π×22 ≈ 138.2
  if (ringFill) {
    const offset = 138.2 - (138.2 * pct / 100);
    ringFill.style.strokeDashoffset = offset;
  }

  if (avatar) avatar.textContent = profile.name ? profile.name[0].toUpperCase() : '?';
  if (name)   name.textContent   = profile.name || 'Set up your profile';
  if (sub) {
    sub.textContent = pct >= 100 ? 'Profile complete — best matches unlocked!' :
                      pct >= 60  ? `${pct}% done — add more for better matches` :
                      'Complete your profile for personalised matches';
  }
}

// ══════════════════════════════════════════════════════
// SAVED OPP STORAGE
// ══════════════════════════════════════════════════════

function getSaved() {
  try { return JSON.parse(localStorage.getItem(KEY_SAVED) || '[]'); }
  catch { return []; }
}

function getProfile() {
  try { return JSON.parse(localStorage.getItem(KEY_PROFILE) || '{}'); }
  catch { return {}; }
}

function saveOpportunity(id) {
  const list = getSaved();
  if (list.some(s => s.id === id)) return;
  list.unshift({ id, _status: 'Interested', _savedAt: Date.now() });
  localStorage.setItem(KEY_SAVED, JSON.stringify(list));
  incrementSaveCount(id);
  logActivity(id, 'saved');
}

function removeSaved(id) {
  localStorage.setItem(KEY_SAVED, JSON.stringify(getSaved().filter(s => s.id !== id)));
}

const ACTIVITY_STATUS_MAP = { Applied: 'applied', Interview: 'interview', Accepted: 'accepted' };

function updateSavedStatus(id, status) {
  localStorage.setItem(KEY_SAVED, JSON.stringify(
    getSaved().map(s => s.id === id ? { ...s, _status: status } : s)
  ));
  if (ACTIVITY_STATUS_MAP[status]) logActivity(id, ACTIVITY_STATUS_MAP[status]);
}

function syncSavedBadge() {
  const count  = getSaved().length;
  const badge  = document.getElementById('savedBadge');
  if (!badge) return;
  badge.textContent = count;
  badge.classList.toggle('hidden', count === 0);
}

// ══════════════════════════════════════════════════════
// CONFETTI
// ══════════════════════════════════════════════════════

function launchConfetti() {
  const canvas = document.getElementById('confettiCanvas');
  const ctx    = canvas.getContext('2d');
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = ['#00C853','#2979FF','#FF9800','#E040FB','#FF4081','#FFEB3B','#00BCD4'];
  const particles = Array.from({ length: 160 }, () => ({
    x:    canvas.width / 2 + (Math.random() - 0.5) * 200,
    y:    canvas.height * 0.6,
    vx:   (Math.random() - 0.5) * 14,
    vy:   -(Math.random() * 18 + 8),
    color: colors[Math.floor(Math.random() * colors.length)],
    size: Math.random() * 7 + 4,
    rotation: Math.random() * 360,
    rotV: (Math.random() - 0.5) * 12,
    shape: Math.random() > 0.5 ? 'rect' : 'circle',
    opacity: 1,
  }));

  let frame;
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = 0;
    particles.forEach(p => {
      p.x  += p.vx;
      p.y  += p.vy;
      p.vy += 0.5;
      p.vx *= 0.99;
      p.rotation += p.rotV;
      if (p.y > canvas.height * 0.8) p.opacity -= 0.025;
      if (p.opacity <= 0) return;
      alive++;

      ctx.save();
      ctx.globalAlpha = Math.max(0, p.opacity);
      ctx.fillStyle   = p.color;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation * Math.PI / 180);

      if (p.shape === 'rect') {
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    });

    if (alive > 0) frame = requestAnimationFrame(animate);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  cancelAnimationFrame(frame);
  animate();
}

// ══════════════════════════════════════════════════════
// HELPERS
// ══════════════════════════════════════════════════════

function capitalise(s) { return String(s).charAt(0).toUpperCase() + String(s).slice(1); }

function esc(s) {
  return String(s ?? '')
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}

// Expose handleDrop globally for inline ondrop handlers
window.handleDrop = handleDrop;

// ══════════════════════════════════════════════════════
// STORAGE KEYS — new features
// ══════════════════════════════════════════════════════

const KEY_SHARED      = 'scout_shared';
const KEY_REMINDERS   = 'scout_reminders';
const KEY_NOTES       = 'scout_notes';
const KEY_SAVE_COUNTS = 'scout_save_counts';

// ══════════════════════════════════════════════════════
// TOAST
// ══════════════════════════════════════════════════════

let _toastTimer = null;
function showToast(msg) {
  const el = document.getElementById('appToast');
  const txt = document.getElementById('toastMsg');
  if (!el) return;
  txt.textContent = msg;
  el.classList.remove('hidden', 'toast-out');
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => {
    el.classList.add('toast-out');
    setTimeout(() => el.classList.add('hidden'), 300);
  }, 2500);
}

// ══════════════════════════════════════════════════════
// MATCH LABELS
// ══════════════════════════════════════════════════════

function getMatchLabel(pct) {
  if (pct >= 85) return 'Strong Match';
  if (pct >= 70) return 'Good Match';
  if (pct >= 55) return 'Possible Match';
  return `${pct}% match`;
}

// ══════════════════════════════════════════════════════
// SAVE COUNTS  (tracks how many times each opp is saved)
// ══════════════════════════════════════════════════════

function getSaveCounts() {
  try { return JSON.parse(localStorage.getItem(KEY_SAVE_COUNTS) || '{}'); }
  catch { return {}; }
}

function incrementSaveCount(id) {
  const counts = getSaveCounts();
  counts[id] = (counts[id] || 0) + 1;
  localStorage.setItem(KEY_SAVE_COUNTS, JSON.stringify(counts));
}

function renderPopular() {
  const list = document.getElementById('popularList');
  if (!list) return;

  const counts  = getSaveCounts();
  const profile = getProfile();

  // Score: save count weighted heavily, plus featured bonus
  const scored = OPPORTUNITIES.map(o => ({
    ...o,
    match:  calculateMatch(o, profile),
    _score: (counts[o.id] || 0) * 10 + (o.featured ? 4 : 0),
  })).sort((a, b) => b._score - a._score || b.match - a.match);

  list.innerHTML = '';
  scored.slice(0, 5).forEach((opp, i) => {
    const card = buildOppCard(opp, opp.match, i);
    list.appendChild(card);
  });
}

// ══════════════════════════════════════════════════════
// NOTES
// ══════════════════════════════════════════════════════

function getNotes() {
  try { return JSON.parse(localStorage.getItem(KEY_NOTES) || '{}'); }
  catch { return {}; }
}

function getNote(oppId) {
  return getNotes()[oppId] || '';
}

function saveNote(oppId, text) {
  const notes = getNotes();
  if (text.trim()) {
    notes[oppId] = text.trim();
  } else {
    delete notes[oppId];
  }
  localStorage.setItem(KEY_NOTES, JSON.stringify(notes));
}

// ══════════════════════════════════════════════════════
// REMINDERS
// ══════════════════════════════════════════════════════

function getReminders() {
  try { return JSON.parse(localStorage.getItem(KEY_REMINDERS) || '[]'); }
  catch { return []; }
}

function addReminder(oppId, daysBefore) {
  const reminders = getReminders();
  // Replace existing reminder for this opp
  const filtered = reminders.filter(r => r.oppId !== oppId);
  filtered.push({
    id: 'rem_' + Date.now(),
    oppId,
    daysBefore,
    createdAt: Date.now(),
  });
  localStorage.setItem(KEY_REMINDERS, JSON.stringify(filtered));
  syncRemindersCount();
}

function removeReminder(id) {
  localStorage.setItem(KEY_REMINDERS, JSON.stringify(getReminders().filter(r => r.id !== id)));
  syncRemindersCount();
}

function syncRemindersCount() {
  const count = getReminders().length;
  const badge = document.getElementById('remindersCount');
  if (!badge) return;
  badge.textContent = count;
  badge.classList.toggle('hidden', count === 0);
}

function getReminderBadge(opp, reminder) {
  if (!opp.deadlineDate) return { label: 'Reminder Set', cls: 'rem-badge-upcoming' };
  const today    = new Date(); today.setHours(0,0,0,0);
  const deadline = new Date(opp.deadlineDate + 'T00:00:00');
  const daysLeft = Math.ceil((deadline - today) / 86400000);

  if (daysLeft < 0)                          return { label: 'Deadline Passed', cls: 'rem-badge-passed' };
  if (daysLeft <= reminder.daysBefore)       return { label: 'Due Soon',        cls: 'rem-badge-soon' };
  return                                            { label: 'Upcoming',         cls: 'rem-badge-upcoming' };
}

function formatReminderDate(opp, reminder) {
  if (!opp.deadlineDate) return 'No fixed deadline';
  const deadline = new Date(opp.deadlineDate + 'T00:00:00');
  const remDate  = new Date(deadline.getTime() - reminder.daysBefore * 86400000);
  return remDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function renderReminders() {
  const reminders  = getReminders();
  const listEl     = document.getElementById('remindersList');
  const emptyEl    = document.getElementById('remindersEmpty');
  if (!listEl) return;

  listEl.innerHTML = '';
  if (reminders.length === 0) {
    emptyEl?.classList.remove('hidden');
    return;
  }
  emptyEl?.classList.add('hidden');

  // Sort by deadline proximity
  const sorted = reminders.map(r => {
    const opp = OPPORTUNITIES.find(o => o.id === r.oppId);
    return { r, opp };
  }).filter(x => x.opp).sort((a, b) => {
    const da = a.opp.deadlineDate ? new Date(a.opp.deadlineDate).getTime() : Infinity;
    const db = b.opp.deadlineDate ? new Date(b.opp.deadlineDate).getTime() : Infinity;
    return da - db;
  });

  sorted.forEach(({ r, opp }) => {
    const badge    = getReminderBadge(opp, r);
    const remDate  = formatReminderDate(opp, r);
    const urgency  = getDeadlineUrgency(opp);
    const color    = getDeadlineColor(opp.type);

    const item = document.createElement('div');
    item.className = 'reminder-item';
    item.innerHTML = `
      <div class="reminder-item-accent" style="background:${color}"></div>
      <div class="reminder-item-body">
        <div class="reminder-item-top">
          <span class="rem-badge ${badge.cls}">${esc(badge.label)}</span>
          <button class="reminder-remove" data-id="${esc(r.id)}" title="Remove reminder">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div class="reminder-item-name">${esc(opp.name)}</div>
        <div class="reminder-item-org">${esc(opp.organization)}</div>
        <div class="reminder-item-meta">
          <span class="reminder-meta-row">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            Deadline: <strong>${esc(urgency.label)}</strong>
          </span>
          <span class="reminder-meta-row">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
            Remind: ${r.daysBefore === 1 ? '1 day' : r.daysBefore === 7 ? '1 week' : `${r.daysBefore} days`} before · ${remDate}
          </span>
        </div>
      </div>`;

    item.querySelector('.reminder-remove').addEventListener('click', e => {
      e.stopPropagation();
      removeReminder(r.id);
      renderReminders();
    });

    item.addEventListener('click', e => {
      if (e.target.closest('.reminder-remove')) return;
      openDetail(opp.id);
    });

    listEl.appendChild(item);
  });
}

// ══════════════════════════════════════════════════════
// SHARE
// ══════════════════════════════════════════════════════

function getShared() {
  try { return JSON.parse(localStorage.getItem(KEY_SHARED) || '[]'); }
  catch { return []; }
}

function addShared(oppId, friendName, friendContact, message) {
  const list = getShared();
  list.unshift({
    id: 'shr_' + Date.now(),
    oppId,
    friendName: friendName.trim(),
    friendContact: friendContact.trim(),
    message: message.trim(),
    sharedAt: Date.now(),
  });
  localStorage.setItem(KEY_SHARED, JSON.stringify(list));
}

function removeShared(id) {
  localStorage.setItem(KEY_SHARED, JSON.stringify(getShared().filter(s => s.id !== id)));
}

function renderShared() {
  const shares  = getShared();
  const listEl  = document.getElementById('sharedList');
  const emptyEl = document.getElementById('sharedEmpty');
  if (!listEl) return;

  listEl.innerHTML = '';
  if (shares.length === 0) {
    emptyEl?.classList.remove('hidden');
    return;
  }
  emptyEl?.classList.add('hidden');

  shares.forEach(s => {
    const opp = OPPORTUNITIES.find(o => o.id === s.oppId);
    if (!opp) return;

    const color = getDeadlineColor(opp.type);
    const date  = new Date(s.sharedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    const item = document.createElement('div');
    item.className = 'shared-item';
    item.innerHTML = `
      <div class="shared-item-accent" style="background:${color}"></div>
      <div class="shared-item-body">
        <div class="shared-item-top">
          <span class="shared-to-badge">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            ${esc(s.friendName || 'Someone')}${s.friendContact ? ` · ${esc(s.friendContact)}` : ''}
          </span>
          <button class="shared-remove" data-id="${esc(s.id)}" title="Remove">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div class="shared-item-name">${esc(opp.name)}</div>
        <div class="shared-item-org">${esc(opp.organization)}</div>
        ${s.message ? `<div class="shared-item-msg">"${esc(s.message)}"</div>` : ''}
        <div class="shared-item-date">Shared ${date}</div>
      </div>`;

    item.querySelector('.shared-remove').addEventListener('click', e => {
      e.stopPropagation();
      removeShared(s.id);
      renderShared();
    });

    item.addEventListener('click', e => {
      if (e.target.closest('.shared-remove')) return;
      openDetail(opp.id);
    });

    listEl.appendChild(item);
  });
}

// ══════════════════════════════════════════════════════
// SAVED SUB-TABS
// ══════════════════════════════════════════════════════

let savedSubTab = 'tracker';

function initSavedSubTabs() {
  document.querySelectorAll('.saved-subtab').forEach(btn => {
    btn.addEventListener('click', () => switchSavedTab(btn.dataset.subtab));
  });
  syncRemindersCount();
}

function switchSavedTab(tab) {
  savedSubTab = tab;

  document.querySelectorAll('.saved-subtab').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.subtab === tab);
  });

  document.getElementById('savedTrackerView').classList.toggle('hidden', tab !== 'tracker');
  document.getElementById('savedRemindersView').classList.toggle('hidden', tab !== 'reminders');
  document.getElementById('savedSharedView').classList.toggle('hidden', tab !== 'shared');
  document.getElementById('savedCalendarView').classList.toggle('hidden', tab !== 'calendar');

  if (tab === 'reminders') renderReminders();
  if (tab === 'calendar')  renderCalendar();
  if (tab === 'shared') {
    renderShared();
    if (sharedInnerTab === 'received') renderReceivedShares();
  }
}

// ══════════════════════════════════════════════════════
// MODAL SYSTEM  (share + remind)
// ══════════════════════════════════════════════════════

let _shareTargetId = null;
let _remindTargetId = null;

async function openShareModal(oppId) {
  _shareTargetId = oppId;
  const opp = OPPORTUNITIES.find(o => o.id === oppId);
  if (!opp) return;

  document.getElementById('shareModalOppName').textContent = opp.name;
  document.getElementById('shareFriendName').value    = '';
  document.getElementById('shareFriendContact').value = '';
  document.getElementById('shareMessage').value       = '';

  const pickerWrap = document.getElementById('shareFriendPickerWrap');
  const divider    = document.getElementById('shareFriendDivider');
  const picker     = document.getElementById('shareFriendPicker');

  pickerWrap.classList.add('hidden');
  divider.classList.add('hidden');

  document.getElementById('shareModal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  setTimeout(() => document.getElementById('shareFriendName').focus(), 80);

  if (currentUser) {
    const friends = await getFriendsWithProfiles();
    if (friends.length > 0 && _shareTargetId === oppId) {
      picker.innerHTML = friends.map(f =>
        `<option value="${esc(f.id)}">${esc(f.name || f.username)} (@${esc(f.username)})</option>`).join('');
      pickerWrap.classList.remove('hidden');
      divider.classList.remove('hidden');
    }
  }
}

function closeShareModal() {
  document.getElementById('shareModal').classList.add('hidden');
  if (!openOppId) document.body.style.overflow = '';
}

function openRemindModal(oppId) {
  _remindTargetId = oppId;
  const opp = OPPORTUNITIES.find(o => o.id === oppId);
  if (!opp) return;

  document.getElementById('remindModalOppName').textContent = opp.name;

  const urgency = getDeadlineUrgency(opp);
  const dlEl    = document.getElementById('remindModalDeadline');
  dlEl.innerHTML = `<span class="deadline-badge ${urgency.cls}">${esc(urgency.label)}</span>`;

  // Highlight if reminder already set
  const existing = getReminders().find(r => r.oppId === oppId);
  document.querySelectorAll('.remind-option').forEach(btn => {
    btn.classList.toggle('active', existing && parseInt(btn.dataset.days) === existing.daysBefore);
  });

  document.getElementById('remindModal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeRemindModal() {
  document.getElementById('remindModal').classList.add('hidden');
  if (!openOppId) document.body.style.overflow = '';
}

function initModals() {
  // Share modal
  document.getElementById('shareModalClose').addEventListener('click', closeShareModal);
  document.getElementById('shareModal').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeShareModal();
  });

  document.getElementById('shareFriendSendBtn').addEventListener('click', async () => {
    const toId = document.getElementById('shareFriendPicker').value;
    const msg  = document.getElementById('shareMessage').value.trim();
    if (!toId) return;
    const res = await sendShareToFriend(toId, _shareTargetId, msg);
    if (res.error) { showToast(res.error); return; }
    closeShareModal();
    showToast('Shared with your friend');
  });

  document.getElementById('shareCopyLink').addEventListener('click', () => {
    const opp = OPPORTUNITIES.find(o => o.id === _shareTargetId);
    if (!opp) return;
    navigator.clipboard?.writeText(opp.url).then(() => {
      showToast('Link copied to clipboard');
    }).catch(() => {
      showToast('Link: ' + opp.url);
    });
  });

  document.getElementById('shareCopyDetails').addEventListener('click', () => {
    const opp = OPPORTUNITIES.find(o => o.id === _shareTargetId);
    if (!opp) return;
    const text = `${opp.name}\n${opp.organization}\nDeadline: ${opp.deadline}\nAward: ${opp.award}\n${opp.url}`;
    navigator.clipboard?.writeText(text).then(() => {
      showToast('Details copied to clipboard');
    }).catch(() => showToast('Copied!'));
  });

  document.getElementById('shareSubmit').addEventListener('click', () => {
    const name    = document.getElementById('shareFriendName').value.trim();
    const contact = document.getElementById('shareFriendContact').value.trim();
    const msg     = document.getElementById('shareMessage').value.trim();

    if (!name) {
      document.getElementById('shareFriendName').focus();
      return;
    }

    addShared(_shareTargetId, name, contact, msg);
    closeShareModal();
    showToast(`Shared with ${name}`);
  });

  // Remind modal
  document.getElementById('remindModalClose').addEventListener('click', closeRemindModal);
  document.getElementById('remindModal').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeRemindModal();
  });

  document.querySelectorAll('.remind-option').forEach(btn => {
    btn.addEventListener('click', () => {
      const days = parseInt(btn.dataset.days);
      addReminder(_remindTargetId, days);
      closeRemindModal();
      const label = days === 1 ? '1 day' : days === 7 ? '1 week' : `${days} days`;
      showToast(`Reminder set — ${label} before deadline`);
      // Refresh reminder sub-tab if open
      if (savedSubTab === 'reminders') renderReminders();
    });
  });

  // Escape closes modals
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (!document.getElementById('shareModal').classList.contains('hidden'))  closeShareModal();
      if (!document.getElementById('remindModal').classList.contains('hidden')) closeRemindModal();
    }
  });
}

// ══════════════════════════════════════════════════════
// CALENDAR
// ══════════════════════════════════════════════════════

let calMonth = new Date().getMonth();
let calYear  = new Date().getFullYear();
let calSelectedDate = null;

const CAL_MONTH_NAMES = ['January','February','March','April','May','June',
                          'July','August','September','October','November','December'];

function initCalendar() {
  document.getElementById('calPrevBtn').addEventListener('click', () => {
    calMonth--;
    if (calMonth < 0) { calMonth = 11; calYear--; }
    calSelectedDate = null;
    renderCalendar();
  });
  document.getElementById('calNextBtn').addEventListener('click', () => {
    calMonth++;
    if (calMonth > 11) { calMonth = 0; calYear++; }
    calSelectedDate = null;
    renderCalendar();
  });
}

function getSavedWithDeadlines() {
  return getSaved()
    .map(s => OPPORTUNITIES.find(o => o.id === s.id))
    .filter(Boolean);
}

function buildCalDayItem(opp, withBadge) {
  const item = document.createElement('div');
  item.className = 'cal-day-item';
  item.innerHTML = `
    <span class="cal-day-item-dot" style="background:${getDeadlineColor(opp.type)}"></span>
    <div class="cal-day-item-body">
      <div class="cal-day-item-name">${esc(opp.name)}</div>
      <div class="cal-day-item-org">${esc(opp.organization)}</div>
    </div>
    ${withBadge ? `<span class="deadline-badge deadline-rolling">${esc(opp.deadline || 'Rolling')}</span>` : ''}`;
  item.addEventListener('click', () => openDetail(opp.id));
  return item;
}

function renderCalendar() {
  const savedOpps = getSavedWithDeadlines();
  const withDate  = savedOpps.filter(o => o.deadlineDate);
  const rolling   = savedOpps.filter(o => !o.deadlineDate);
  const isEmpty   = savedOpps.length === 0;

  document.getElementById('calEmpty').classList.toggle('hidden', !isEmpty);
  document.querySelector('.cal-nav').classList.toggle('hidden', isEmpty);
  document.querySelector('.cal-weekdays').classList.toggle('hidden', isEmpty);
  document.getElementById('calGrid').classList.toggle('hidden', isEmpty);
  document.getElementById('calSelectedDay').classList.toggle('hidden', true);
  document.getElementById('calRollingSection').classList.toggle('hidden', isEmpty || rolling.length === 0);
  if (isEmpty) return;

  document.getElementById('calNavLabel').textContent = `${CAL_MONTH_NAMES[calMonth]} ${calYear}`;

  const byDate = {};
  withDate.forEach(o => { (byDate[o.deadlineDate] = byDate[o.deadlineDate] || []).push(o); });

  const firstOfMonth  = new Date(calYear, calMonth, 1);
  const startWeekday  = firstOfMonth.getDay();
  const daysInMonth   = new Date(calYear, calMonth + 1, 0).getDate();

  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;

  const grid = document.getElementById('calGrid');
  grid.innerHTML = '';

  for (let i = 0; i < startWeekday; i++) {
    const pad = document.createElement('div');
    pad.className = 'cal-cell cal-cell-pad';
    grid.appendChild(pad);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${calYear}-${String(calMonth+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const opps = byDate[dateStr] || [];
    const cell = document.createElement('div');
    cell.className = 'cal-cell';
    if (dateStr === todayStr)        cell.classList.add('cal-cell-today');
    if (dateStr === calSelectedDate) cell.classList.add('cal-cell-selected');
    if (opps.length)                 cell.classList.add('cal-cell-has-opps');

    const dots = opps.slice(0, 3).map(o =>
      `<span class="cal-dot" style="background:${getDeadlineColor(o.type)}"></span>`).join('');
    cell.innerHTML = `<span class="cal-cell-num">${d}</span><span class="cal-cell-dots">${dots}</span>`;

    if (opps.length) {
      cell.addEventListener('click', () => { calSelectedDate = dateStr; renderCalendar(); });
    }
    grid.appendChild(cell);
  }

  const selEl = document.getElementById('calSelectedDay');
  if (calSelectedDate && byDate[calSelectedDate]) {
    selEl.classList.remove('hidden');
    const d = new Date(calSelectedDate + 'T00:00:00');
    document.getElementById('calSelectedDayLabel').textContent =
      d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    const listEl = document.getElementById('calSelectedDayList');
    listEl.innerHTML = '';
    byDate[calSelectedDate].forEach(o => listEl.appendChild(buildCalDayItem(o, false)));
  }

  if (rolling.length) {
    const rollList = document.getElementById('calRollingList');
    rollList.innerHTML = '';
    rolling.forEach(o => rollList.appendChild(buildCalDayItem(o, true)));
  }
}

// ══════════════════════════════════════════════════════
// AI ESSAY HELPER
// ══════════════════════════════════════════════════════

function getAnthropicKey() {
  return localStorage.getItem(KEY_ANTHROPIC_KEY) || '';
}

function initEssayHelperSettings() {
  const input   = document.getElementById('anthropicKeyInput');
  const saveBtn = document.getElementById('saveApiKeyBtn');
  if (!input || !saveBtn) return;
  input.value = getAnthropicKey();
  saveBtn.addEventListener('click', () => {
    localStorage.setItem(KEY_ANTHROPIC_KEY, input.value.trim());
    const toast = document.getElementById('apiKeyConfirm');
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 2400);
  });
}

async function getEssayTips(opp) {
  const key      = getAnthropicKey();
  const resultEl = document.getElementById('aiTipsResult');
  const btn      = document.getElementById('aiTipsBtn');

  if (!key) {
    resultEl.classList.remove('hidden');
    resultEl.innerHTML = `<p class="ai-tips-msg">Add your Anthropic API key in <strong>Profile → AI Essay Helper</strong> to use this feature.</p>`;
    return;
  }

  const profile = getProfile();
  btn.disabled = true;
  btn.classList.add('loading');
  resultEl.classList.remove('hidden');
  resultEl.innerHTML = `<p class="ai-tips-msg">Thinking through your application…</p>`;

  const prompt = `You are helping a high school student prepare their application for this specific opportunity:

Name: ${opp.name}
Organization: ${opp.organization}
Type: ${opp.type}
Description: ${opp.description}
Eligibility: ${opp.eligibility}

Here is the student's profile:
Grade: ${profile.grade || 'unknown'}
GPA: ${profile.gpa || 'unknown'}
Intended major: ${profile.major || 'unknown'}
Interests: ${(profile.interests || []).join(', ') || 'unknown'}
Bio: ${profile.bio || 'not provided'}

Give this student 4-6 short, specific, actionable tips for their application/essay for THIS opportunity. Reference their actual background where relevant. Be concrete, not generic. Return each tip as a separate short paragraph with no headers, no markdown bullets, no numbering — just plain sentences separated by newlines.`;

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': key,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-5',
        max_tokens: 700,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!res.ok) {
      const errBody = await res.json().catch(() => ({}));
      throw new Error(errBody?.error?.message || `Request failed (${res.status})`);
    }

    const data = await res.json();
    const text = (data.content || []).map(b => b.text || '').join('\n').trim();
    const tips = text.split('\n').map(t => t.trim()).filter(Boolean);

    resultEl.innerHTML = tips.map(t => `<p class="ai-tips-item">${esc(t)}</p>`).join('');
  } catch (err) {
    resultEl.innerHTML = `<p class="ai-tips-msg ai-tips-error">Couldn't generate tips — ${esc(err.message || 'check your API key and try again.')}</p>`;
  } finally {
    btn.disabled = false;
    btn.classList.remove('loading');
  }
}

// ══════════════════════════════════════════════════════
// FRIENDS
// ══════════════════════════════════════════════════════

async function searchProfilesByUsername(query) {
  if (!currentUser) return [];
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const { data, error } = await sb
    .from('profiles')
    .select('id, username, name')
    .ilike('username', `%${q}%`)
    .neq('id', currentUser.id)
    .limit(10);
  if (error) return [];
  return data || [];
}

async function getFriendships() {
  if (!currentUser) return [];
  const { data, error } = await sb
    .from('friendships')
    .select('*')
    .or(`requester_id.eq.${currentUser.id},addressee_id.eq.${currentUser.id}`);
  if (error) return [];
  return data || [];
}

async function getFriendsWithProfiles() {
  if (!currentUser) return [];
  const friendships = await getFriendships();
  const accepted = friendships.filter(f => f.status === 'accepted');
  const friendIds = accepted.map(f => f.requester_id === currentUser.id ? f.addressee_id : f.requester_id);
  if (friendIds.length === 0) return [];
  const { data, error } = await sb.from('profiles').select('id, username, name').in('id', friendIds);
  if (error) return [];
  return data || [];
}

async function getPendingRequests() {
  if (!currentUser) return [];
  const friendships = await getFriendships();
  const incoming = friendships.filter(f => f.status === 'pending' && f.addressee_id === currentUser.id);
  if (incoming.length === 0) return [];
  const ids = incoming.map(f => f.requester_id);
  const { data, error } = await sb.from('profiles').select('id, username, name').in('id', ids);
  if (error) return [];
  return incoming
    .map(f => ({ friendshipId: f.id, profile: (data || []).find(p => p.id === f.requester_id) }))
    .filter(x => x.profile);
}

async function getOutgoingPendingIds() {
  if (!currentUser) return [];
  const friendships = await getFriendships();
  return friendships
    .filter(f => f.status === 'pending' && f.requester_id === currentUser.id)
    .map(f => f.addressee_id);
}

async function sendFriendRequest(addresseeId) {
  if (!currentUser) return { error: 'Not logged in.' };
  const { error } = await sb.from('friendships').insert({
    requester_id: currentUser.id,
    addressee_id: addresseeId,
  });
  if (error) {
    if (error.code === '23505') return { error: 'Request already sent.' };
    return { error: error.message };
  }
  return { ok: true };
}

async function acceptFriendRequest(friendshipId) {
  const { error } = await sb.from('friendships').update({ status: 'accepted' }).eq('id', friendshipId);
  return error ? { error: error.message } : { ok: true };
}

async function refreshFriendsBadge() {
  const badge = document.getElementById('navFriendsBadge');
  if (!badge) return;
  if (!currentUser) { badge.classList.add('hidden'); return; }
  const pending = await getPendingRequests();
  if (pending.length > 0) {
    badge.textContent = pending.length;
    badge.classList.remove('hidden');
  } else {
    badge.classList.add('hidden');
  }
}

async function renderFriendsPanel() {
  const listEl    = document.getElementById('friendsListEl');
  const emptyEl   = document.getElementById('friendsEmpty');
  const reqSection = document.getElementById('friendRequestsSection');
  const reqList   = document.getElementById('friendRequestsList');
  if (!listEl) return;

  if (!currentUser) {
    listEl.innerHTML = '';
    emptyEl.querySelector('.empty-sub').textContent = 'Log in to add friends.';
    emptyEl.classList.remove('hidden');
    reqSection.classList.add('hidden');
    return;
  }

  const [friends, pending] = await Promise.all([getFriendsWithProfiles(), getPendingRequests()]);

  reqSection.classList.toggle('hidden', pending.length === 0);
  reqList.innerHTML = '';
  pending.forEach(p => {
    const row = document.createElement('div');
    row.className = 'friend-row';
    row.innerHTML = `
      <div class="friend-row-avatar">${esc((p.profile.name || p.profile.username).charAt(0).toUpperCase())}</div>
      <div class="friend-row-body">
        <div class="friend-row-name">${esc(p.profile.name || p.profile.username)}</div>
        <div class="friend-row-username">@${esc(p.profile.username)}</div>
      </div>
      <div class="friend-row-actions">
        <button class="friend-btn friend-btn-accept">Accept</button>
      </div>`;
    row.querySelector('.friend-btn-accept').addEventListener('click', async () => {
      await acceptFriendRequest(p.friendshipId);
      showToast(`You're now friends with ${p.profile.name || p.profile.username}`);
      renderFriendsPanel();
      refreshFriendsBadge();
    });
    reqList.appendChild(row);
  });

  listEl.innerHTML = '';
  emptyEl.querySelector('.empty-sub').textContent = 'Search for a friend by their Scout username to send a request.';
  emptyEl.classList.toggle('hidden', friends.length > 0);
  friends.forEach(f => {
    const row = document.createElement('div');
    row.className = 'friend-row';
    row.innerHTML = `
      <div class="friend-row-avatar">${esc((f.name || f.username).charAt(0).toUpperCase())}</div>
      <div class="friend-row-body">
        <div class="friend-row-name">${esc(f.name || f.username)}</div>
        <div class="friend-row-username">@${esc(f.username)}</div>
      </div>`;
    listEl.appendChild(row);
  });
}

async function renderFriendSearchResults(query) {
  const resultsEl = document.getElementById('friendSearchResults');
  if (!resultsEl) return;

  if (!currentUser) {
    resultsEl.innerHTML = `<p class="ai-tips-msg" style="margin-top:12px">Log in to search for friends.</p>`;
    return;
  }
  if (!query.trim()) { resultsEl.innerHTML = ''; return; }

  const results = await searchProfilesByUsername(query);
  const [friends, outgoingPending] = await Promise.all([getFriendsWithProfiles(), getOutgoingPendingIds()]);
  const friendIds = new Set(friends.map(f => f.id));

  resultsEl.innerHTML = '';
  if (results.length === 0) {
    resultsEl.innerHTML = `<p class="ai-tips-msg" style="margin-top:12px">No students found with that username.</p>`;
    return;
  }
  results.forEach(p => {
    const isFriend  = friendIds.has(p.id);
    const isPending = outgoingPending.includes(p.id);
    const row = document.createElement('div');
    row.className = 'friend-row';
    row.innerHTML = `
      <div class="friend-row-avatar">${esc((p.name || p.username).charAt(0).toUpperCase())}</div>
      <div class="friend-row-body">
        <div class="friend-row-name">${esc(p.name || p.username)}</div>
        <div class="friend-row-username">@${esc(p.username)}</div>
      </div>
      <div class="friend-row-actions">
        ${isFriend  ? `<span class="friend-btn friend-btn-pending">Friends</span>`
        : isPending ? `<span class="friend-btn friend-btn-pending">Pending</span>`
        : `<button class="friend-btn friend-btn-add">Add</button>`}
      </div>`;
    const addBtn = row.querySelector('.friend-btn-add');
    if (addBtn) {
      addBtn.addEventListener('click', async () => {
        const res = await sendFriendRequest(p.id);
        if (res.error) { showToast(res.error); return; }
        showToast(`Friend request sent to @${p.username}`);
        renderFriendSearchResults(query);
      });
    }
    resultsEl.appendChild(row);
  });
}

function initFriendsPanel() {
  const overlay = document.getElementById('friendsOverlay');
  if (!overlay) return;

  const openPanel = () => {
    overlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    document.getElementById('friendSearchInput').value = '';
    document.getElementById('friendSearchResults').innerHTML = '';
    renderFriendsPanel();
  };
  const closePanel = () => {
    overlay.classList.add('hidden');
    if (!openOppId) document.body.style.overflow = '';
  };

  document.getElementById('navFriendsBtn').addEventListener('click', openPanel);
  document.getElementById('friendFeedSeeAll')?.addEventListener('click', openPanel);
  document.getElementById('friendsClose').addEventListener('click', closePanel);
  overlay.addEventListener('click', e => { if (e.target === e.currentTarget) closePanel(); });

  document.getElementById('friendSearchBtn').addEventListener('click', () => {
    renderFriendSearchResults(document.getElementById('friendSearchInput').value);
  });
  document.getElementById('friendSearchInput').addEventListener('keydown', e => {
    if (e.key === 'Enter') { e.preventDefault(); renderFriendSearchResults(e.target.value); }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !overlay.classList.contains('hidden')) closePanel();
  });
}

// ══════════════════════════════════════════════════════
// ACTIVITY FEED  ("friends are applying to…")
// ══════════════════════════════════════════════════════

async function logActivity(oppId, action) {
  if (!currentUser) return;
  const opp = OPPORTUNITIES.find(o => o.id === oppId);
  if (!opp) return;
  await sb.from('activity').insert({
    user_id: currentUser.id,
    opp_id: opp.id,
    opp_name: opp.name,
    opp_org: opp.organization,
    opp_type: opp.type,
    action,
  });
}

function timeAgo(dateStr) {
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1)  return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24)  return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

const ACTIVITY_VERBS = {
  saved:     'saved',
  applied:   'applied to',
  interview: 'is interviewing for',
  accepted:  'got accepted to',
};

async function renderFriendFeed() {
  const header = document.getElementById('friendFeedHeader');
  const listEl = document.getElementById('friendFeedList');
  if (!header || !listEl) return;

  if (!currentUser) {
    header.classList.add('hidden');
    listEl.innerHTML = '';
    return;
  }

  const friends = await getFriendsWithProfiles();
  if (friends.length === 0) {
    header.classList.add('hidden');
    listEl.innerHTML = '';
    return;
  }

  const friendIds = friends.map(f => f.id);
  const { data, error } = await sb
    .from('activity')
    .select('*')
    .in('user_id', friendIds)
    .order('created_at', { ascending: false })
    .limit(8);

  if (error || !data || data.length === 0) {
    header.classList.add('hidden');
    listEl.innerHTML = '';
    return;
  }

  header.classList.remove('hidden');
  const friendMap = {};
  friends.forEach(f => { friendMap[f.id] = f; });

  listEl.innerHTML = '';
  data.forEach(item => {
    const friend = friendMap[item.user_id];
    if (!friend) return;
    const verb = ACTIVITY_VERBS[item.action] || item.action;
    const row = document.createElement('div');
    row.className = 'friend-feed-item';
    row.innerHTML = `
      <div class="friend-feed-avatar">${esc((friend.name || friend.username).charAt(0).toUpperCase())}</div>
      <div class="friend-feed-body">
        <div class="friend-feed-text"><strong>${esc(friend.name || friend.username)}</strong> ${esc(verb)} ${esc(item.opp_name)}</div>
        <div class="friend-feed-time">${esc(timeAgo(item.created_at))}</div>
      </div>`;
    const localOpp = OPPORTUNITIES.find(o => o.id === item.opp_id);
    if (localOpp) row.addEventListener('click', () => openDetail(localOpp.id));
    listEl.appendChild(row);
  });
}

// ══════════════════════════════════════════════════════
// IN-APP SHARES  (Supabase — share directly with a Scout friend)
// ══════════════════════════════════════════════════════

async function sendShareToFriend(toUserId, oppId, message) {
  if (!currentUser) return { error: 'Not logged in.' };
  const opp = OPPORTUNITIES.find(o => o.id === oppId);
  if (!opp) return { error: 'Opportunity not found.' };
  const { error } = await sb.from('shares').insert({
    from_user: currentUser.id,
    to_user: toUserId,
    opp_id: opp.id,
    opp_name: opp.name,
    message: message || null,
  });
  return error ? { error: error.message } : { ok: true };
}

async function getIncomingShares() {
  if (!currentUser) return [];
  const { data, error } = await sb
    .from('shares')
    .select('*')
    .eq('to_user', currentUser.id)
    .order('created_at', { ascending: false });
  if (error || !data || data.length === 0) return [];

  const fromIds = [...new Set(data.map(s => s.from_user))];
  const { data: profs } = await sb.from('profiles').select('id, username, name').in('id', fromIds);
  const profMap = {};
  (profs || []).forEach(p => { profMap[p.id] = p; });
  return data.map(s => ({ ...s, fromProfile: profMap[s.from_user] }));
}

async function renderReceivedShares() {
  const listEl  = document.getElementById('receivedSharesList');
  const emptyEl = document.getElementById('receivedSharesEmpty');
  const countEl = document.getElementById('receivedSharesCount');
  if (!listEl) return;

  if (!currentUser) {
    listEl.innerHTML = '';
    emptyEl.querySelector('.empty-sub').textContent = 'Log in to see opportunities friends have shared with you.';
    emptyEl.classList.remove('hidden');
    countEl?.classList.add('hidden');
    return;
  }

  const shares = await getIncomingShares();
  countEl?.classList.toggle('hidden', shares.length === 0);
  if (countEl) countEl.textContent = shares.length;

  listEl.innerHTML = '';
  if (shares.length === 0) {
    emptyEl.querySelector('.empty-sub').textContent = "When a Scout friend shares an opportunity with you, it'll show up here.";
    emptyEl.classList.remove('hidden');
    return;
  }
  emptyEl.classList.add('hidden');

  shares.forEach(s => {
    const opp = OPPORTUNITIES.find(o => o.id === s.opp_id);
    if (!opp) return;
    const color    = getDeadlineColor(opp.type);
    const date     = new Date(s.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const fromName = s.fromProfile ? (s.fromProfile.name || s.fromProfile.username) : 'A friend';

    const item = document.createElement('div');
    item.className = 'shared-item';
    item.innerHTML = `
      <div class="shared-item-accent" style="background:${color}"></div>
      <div class="shared-item-body">
        <div class="shared-item-top">
          <span class="shared-to-badge">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            From ${esc(fromName)}
          </span>
        </div>
        <div class="shared-item-name">${esc(opp.name)}</div>
        <div class="shared-item-org">${esc(opp.organization)}</div>
        ${s.message ? `<div class="shared-item-msg">"${esc(s.message)}"</div>` : ''}
        <div class="shared-item-date">Shared ${date}</div>
      </div>`;
    item.addEventListener('click', () => openDetail(opp.id));
    listEl.appendChild(item);
  });
}

let sharedInnerTab = 'sent';

function initSharedInnerTabs() {
  document.querySelectorAll('.shared-inner-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      sharedInnerTab = btn.dataset.sharedtab;
      document.querySelectorAll('.shared-inner-tab').forEach(b => b.classList.toggle('active', b === btn));
      document.getElementById('sharedSentView').classList.toggle('hidden', sharedInnerTab !== 'sent');
      document.getElementById('sharedReceivedView').classList.toggle('hidden', sharedInnerTab !== 'received');
      if (sharedInnerTab === 'received') renderReceivedShares();
    });
  });
}

// ══════════════════════════════════════════════════════
// ADMIN PANEL  (visible only to ADMIN_EMAIL)
// ══════════════════════════════════════════════════════

async function renderAdminPanel() {
  if (!isAdmin()) return;

  const [{ data: users, error: usersErr }, { data: activity }, { data: friendships }] = await Promise.all([
    sb.from('profiles').select('*').order('created_at', { ascending: false }),
    sb.from('activity').select('id'),
    sb.from('friendships').select('id').eq('status', 'accepted'),
  ]);

  document.getElementById('adminStatUsers').textContent      = usersErr ? '—' : (users?.length ?? 0);
  document.getElementById('adminStatActivity').textContent   = activity?.length ?? 0;
  document.getElementById('adminStatFriendships').textContent = friendships?.length ?? 0;

  const listEl  = document.getElementById('adminUsersList');
  const emptyEl = document.getElementById('adminUsersEmpty');
  listEl.innerHTML = '';

  if (usersErr || !users || users.length === 0) {
    emptyEl.classList.remove('hidden');
    return;
  }
  emptyEl.classList.add('hidden');

  users.forEach(u => {
    const joined = new Date(u.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const row = document.createElement('div');
    row.className = 'admin-user-row';
    row.innerHTML = `
      <div class="friend-row-avatar">${esc((u.name || u.username).charAt(0).toUpperCase())}</div>
      <div class="admin-user-meta">
        <div class="friend-row-name">${esc(u.name || u.username)}</div>
        <div class="friend-row-username">@${esc(u.username)}${u.grade ? ' · ' + esc(u.grade) : ''}</div>
      </div>
      <div class="admin-user-date">Joined<br>${joined}</div>`;
    listEl.appendChild(row);
  });
}

function initAdminPanel() {
  const overlay = document.getElementById('adminOverlay');
  const btn = document.getElementById('navAdminBtn');
  if (!overlay || !btn) return;

  btn.addEventListener('click', () => {
    overlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    renderAdminPanel();
  });
  document.getElementById('adminClose').addEventListener('click', () => {
    overlay.classList.add('hidden');
    if (!openOppId) document.body.style.overflow = '';
  });
  overlay.addEventListener('click', e => {
    if (e.target === e.currentTarget) {
      overlay.classList.add('hidden');
      if (!openOppId) document.body.style.overflow = '';
    }
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !overlay.classList.contains('hidden')) {
      overlay.classList.add('hidden');
      if (!openOppId) document.body.style.overflow = '';
    }
  });
}
