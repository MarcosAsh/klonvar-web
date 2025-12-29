import { ClientAuthProvider } from '@/lib/auth/client-auth';

export const dynamic = 'force-dynamic';

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientAuthProvider>
      {children}
    </ClientAuthProvider>
  );
}
