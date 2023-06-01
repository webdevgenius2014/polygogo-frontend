'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
export function useAuth() {
  const router = useRouter();
  useEffect(() => {
    var token = sessionStorage.getItem("access_token");

    if (!token) {
      router.push('/login'); // Redirect to login page if token is not available
    }
  }, [router]);

  // You can return the token or any other authentication-related information here if needed
}