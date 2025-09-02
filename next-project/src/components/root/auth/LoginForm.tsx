import type { UseFormReturn } from 'react-hook-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LoginDTO } from '@/types/auth';
import Logo from '@/components/shared/Logo';
import { FiLogIn } from 'react-icons/fi';

// Types
type Props = {
  form: UseFormReturn<LoginDTO>;
  isLoading: boolean;
  onSubmit: (body: LoginDTO) => void;
  authStatus:
    | 'idle'
    | 'loading'
    | 'authenticated'
    | 'unauthenticated'
    | 'error';
};

function LoginForm({ form, isLoading, onSubmit, authStatus }: Props) {
  return (
    <Card className="w-full max-w-sm shadow-2xl shadow-blue-300 p-7">
      <CardHeader className="p-0 mb-6">
        <h1 className="font-extrabold flex flex-col gap-2">
          Bienvenido a{' '}
          <Logo
            href="#"
            iconSize="text-4xl"
            textSize="text-xl"
            spanSize="text-sm"
          />
        </h1>
        <CardTitle className="font-normal">
          Inicia sesión con tu cuenta
        </CardTitle>
        <CardDescription>Ingresa tus credenciales</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
          autoComplete="off"
        >
          <CardContent className="space-y-8">
            {/* Email Input */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Email
                    <span className="text-red-500 dark:text-red-400">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ej. leonardofuentesclaros@gmail.com"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password Input */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Contraseña{' '}
                    <span className="text-red-500 dark:text-red-400">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="***********"
                      type="password"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button
              type="submit"
              className="w-full hover:cursor-pointer bg-slate-950 hover:bg-slate-900 active:bg-slate-800"
              disabled={isLoading}
            >
              {isLoading ? (
                <>Espere un momento por favor...</>
              ) : (
                <>
                  Iniciar Sesión <FiLogIn />
                </>
              )}
            </Button>
            {authStatus === 'error' && (
              <span className="text-sm text-red-600">
                Credenciales inválidas. Intenta nuevamente.
              </span>
            )}
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}

export default LoginForm;
