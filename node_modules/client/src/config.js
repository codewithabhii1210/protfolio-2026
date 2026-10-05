const e=import.meta.env;
export const CONFIG={github:e.VITE_GITHUB_URL||'#',linkedin:e.VITE_LINKEDIN_URL||'https://www.linkedin.com/in/abhishek-singh-20a9ab2b1',email:e.VITE_EMAIL||'abhisingh12102007@gmail.com',photo:e.VITE_PHOTO||'/profile.jpg',
clones:[['BMW Clone',e.VITE_BMW_URL],['Apple Clone',e.VITE_APPLE_URL],['Netflix Clone',e.VITE_NETFLIX_URL],['Clothing Brand Website',e.VITE_CLOTHING_URL]],
projectGithub:e.VITE_SEHATSAARTHI_GITHUB||'#',projectLive:e.VITE_SEHATSAARTHI_LIVE||'#',
certImage:e.VITE_CERT_IMAGE||'',problemsSolved:400,streakDays:100};
