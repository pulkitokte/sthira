export default function PageContainer({ children, className = '' }) {
  return <main className={`flex-1 px-6 py-8 ${className}`}>{children}</main>
}