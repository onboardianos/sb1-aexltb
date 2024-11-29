import { useState, useEffect } from 'react';
import { connectUser } from '../services/amityService';

export const useAmityAuth = (userId: string, displayName: string) => {
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const connect = async () => {
      try {
        setIsLoading(true);
        await connectUser(userId, displayName);
        setIsConnected(true);
        setError(null);
      } catch (err) {
        setError(err as Error);
        setIsConnected(false);
      } finally {
        setIsLoading(false);
      }
    };

    connect();
  }, [userId, displayName]);

  return { isConnected, error, isLoading };
};