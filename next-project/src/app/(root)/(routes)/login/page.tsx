"use client"
import { loginSchema} from '@/schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import LoginForm from '@/components/root/auth/LoginForm';
import { useAuthStore } from '@/store/useAuthStore';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoginDTO } from '@/types/auth';



function Login() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const loginUser = useAuthStore((store) => store.login);

  const form = useForm<LoginDTO>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (body: LoginDTO) => {
    setIsLoading(true);
    try {
      const isAuthenticated = await loginUser(body);
      if (isAuthenticated) {
        router.push('/admin');
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }
  return (
    <>
      <LoginForm
        form={form}
        isLoading={isLoading}
        onSubmit={onSubmit}
      />
    </>
  )
}

export default Login