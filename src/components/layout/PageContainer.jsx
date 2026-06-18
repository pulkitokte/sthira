export default function PageContainer({ children, className = "" }) {
  return <main className={`flex-1 px-5 py-6 ${className}`}>{children}</main>;
}
