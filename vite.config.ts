import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 🧠 স্মার্ট লজিক:
  // GitHub Actions এনভায়রনমেন্ট ডিটেক্ট করা হচ্ছে
  const isGitHubAction = process.env.GITHUB_ACTIONS === 'true';
  
  // ⚠️ তোমার রিপোজিটরির নাম। এটি একদম নির্ভুল হতে হবে।
  const repoName = '/studydashboardfinal/';

  return {
    plugins: [react()],
    // যদি গিটহাব হয় তবে রিপোর নাম ব্যবহার করো, নাহলে রুট '/'
    base: isGitHubAction ? repoName : '/',
    build: {
      outDir: 'dist',
    },
    server: {
      host: true,
      port: 3000
    }
  };
});
